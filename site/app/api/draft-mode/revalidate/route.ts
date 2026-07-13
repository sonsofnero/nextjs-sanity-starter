import {revalidateTag} from 'next/cache'
import {type NextRequest, NextResponse} from 'next/server'
import {parseBody} from 'next-sanity/webhook'

type WebhookPayload = {
  _id?: string
  _type?: string
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    route: '/api/draft-mode/revalidate',
  })
}

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATION_SECRET

    if (!secret) {
      return new Response('Missing environment variable SANITY_REVALIDATION_SECRET', {
        status: 500,
      })
    }

    const {isValidSignature, body} = await parseBody<WebhookPayload>(req, secret)

    if (!isValidSignature) {
      return NextResponse.json(
        {
          body,
          isValidSignature,
          message: 'Invalid signature',
        },
        {status: 401},
      )
    }

    revalidateTag('sanity', {expire: 0})

    return NextResponse.json({
      body,
      message: `Revalidated Sanity content${body?._type ? ` for ${body._type}` : ''}`,
      revalidated: true,
      tag: 'sanity',
    })
  } catch (error) {
    console.error('Sanity revalidation webhook failed', error)

    return new Response(
      error instanceof Error ? error.message : 'Unexpected revalidation error',
      {status: 500},
    )
  }
}
