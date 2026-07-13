import Image from 'next/image'

export default function SanityImageComponent({
  src,
  alt,
}: {
  src: string
  alt?: string
}) {
  return <Image src={src} alt={alt || ''} width={1200} height={800} className="h-auto w-full object-cover" />
}
