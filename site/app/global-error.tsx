'use client'

export default function GlobalError({reset}: {reset: () => void}) {
  return (
    <html lang="en">
      <body
        style={{fontFamily: 'system-ui, sans-serif', padding: '4rem 1.5rem'}}
      >
        <h1>Something went wrong</h1>
        <button type="button" onClick={reset}>
          Try again
        </button>
      </body>
    </html>
  )
}
