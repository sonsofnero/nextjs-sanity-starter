/**
 * Mux video slice. The player is a client leaf; this wrapper stays server-rendered.
 */
import clsx from 'clsx'
import {stegaClean} from '@sanity/client/stega'

import {MuxVideo} from '@/components/media/muxVideo'
import {Container} from '@/components/ui/container'
import {getModulePadding} from '../padding'
import type {SliceProps} from '../sliceTypes'

export function VideoSlice({
  title,
  video,
  padding_top,
  padding_bottom,
}: SliceProps<'videoSlice'>) {
  const playbackId = stegaClean(video?.playbackId)
  if (!playbackId) return null

  const {paddingTop, paddingBottom} = getModulePadding(
    padding_top,
    padding_bottom,
  )

  return (
    <section className={clsx(paddingTop, paddingBottom)}>
      <Container size="wide" gutter>
        <MuxVideo
          playbackId={playbackId}
          title={stegaClean(title) || 'Video'}
          aspectRatio={video?.aspectRatio}
          className="overflow-hidden rounded-2xl"
        />
      </Container>
    </section>
  )
}
