import Image from 'next/image'

export default function SanityHeroImageComponent({
  src,
  alt,
}: {
  src: string
  alt?: string
}) {
  return <Image src={src} alt={alt || ''} width={1600} height={900} className="h-auto w-full object-cover" />
}
