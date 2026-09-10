export const token = process.env.SANITY_API_READ_TOKEN

if (!token && process.env.NODE_ENV === 'development') {
  console.warn('Missing SANITY_API_READ_TOKEN - draft mode and live preview will not work')
}
