import {PADDING_FRAGMENT} from '../../fragments'

export const VIDEO_SLICE_QUERY = `
  _type == 'videoSlice' => {
    _type,
    _key,
    title,
    "video": video.asset->{playbackId, "aspectRatio": data.aspect_ratio},
    ${PADDING_FRAGMENT}
  }
` as const
