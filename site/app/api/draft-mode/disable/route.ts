import {draftMode} from 'next/headers'
import {type NextRequest, NextResponse} from 'next/server'

export async function GET(request: NextRequest) {
  ;(await draftMode()).disable()
  const target = request.nextUrl.searchParams.get('redirect') ?? '/'
  // Same-origin relative paths only; anything else goes home.
  const safe =
    target.startsWith('/') && !target.startsWith('//') && !target.includes('\\')
  return NextResponse.redirect(new URL(safe ? target : '/', request.url))
}
