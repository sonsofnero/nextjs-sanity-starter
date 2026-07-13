export default function VideoComponent({
  src,
  poster,
  className,
}: {
  src: string
  poster?: string
  className?: string
}) {
  return <video src={src} poster={poster} controls className={className} />
}
