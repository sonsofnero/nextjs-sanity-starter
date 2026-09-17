import {revalidateTag} from 'next/cache'
import {type NextRequest, NextResponse} from 'next/server'
import {parseBody} from 'next-sanity/webhook'

import {SANITY_TAG} from '@/sanity/tags'

type WebhookPayload = {
  _id?: string
  _type?: string
}

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATION_SECRET
  if (!secret) {
    return new Response('Revalidation is not configured', {status: 500})
  }

  try {
    // `true` waits for the Content Lake CDN to catch up before pages refetch.
    const {isValidSignature, body} = await parseBody<WebhookPayload>(
      req,
      secret,
      true,
    )
    if (!isValidSignature) {
      return new Response('Invalid signature', {status: 401})
    }

    revalidateTag(SANITY_TAG, {expire: 0})
    return NextResponse.json({revalidated: true, type: body?._type ?? null})
  } catch (error) {
    console.error('Sanity revalidation webhook failed', error)
    return new Response('Revalidation failed', {status: 500})
  }
}
