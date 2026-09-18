import {stegaClean} from '@sanity/client/stega'

/** Mux stores "16:9"; CSS wants "16 / 9". Anything unexpected becomes 16 / 9. */
export function toCssAspectRatio(value?: string | null): string {
  const match = /^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?)$/.exec(
    stegaClean(value ?? ''),
  )
  if (!match || Number(match[1]) <= 0 || Number(match[2]) <= 0) return '16 / 9'
  return `${match[1]} / ${match[2]}`
}
