'use client'

import MuxPlayer from '@mux/mux-player-react'

import {toCssAspectRatio} from './aspectRatio'

export type MuxVideoProps = {
  playbackId: string
  title: string
  aspectRatio?: string | null
  className?: string
}

/** Client leaf: keeps the Mux player bundle out of pages that do not render video. */
export function MuxVideo({playbackId, title, aspectRatio, className}: MuxVideoProps) {
  return (
    <MuxPlayer
      playbackId={playbackId}
      metadata={{video_title: title}}
      title={title}
      streamType="on-demand"
      className={className}
      style={{aspectRatio: toCssAspectRatio(aspectRatio), width: '100%'}}
    />
  )
}
