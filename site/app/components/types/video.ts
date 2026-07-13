export interface VideoSource {
  src: string
  type?: string
}

export interface VideoComponentProps {
  sources: VideoSource[]
  poster?: string
  autoPlay?: boolean
  controls?: boolean
  loop?: boolean
  muted?: boolean
  className?: string
}
