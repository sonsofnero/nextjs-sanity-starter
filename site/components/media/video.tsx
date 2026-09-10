import type {ComponentPropsWithRef} from 'react'

export type VideoProps = ComponentPropsWithRef<'video'>

export function Video({controls = true, ...props}: VideoProps) {
  return <video controls={controls} {...props} />
}
