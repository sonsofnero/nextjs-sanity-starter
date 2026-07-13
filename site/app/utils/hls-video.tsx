export function isHlsSource(src?: string | null) {
  return Boolean(src && src.endsWith('.m3u8'))
}
