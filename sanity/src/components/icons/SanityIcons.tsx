import {Icon, type IconProps} from '@sanity/icons'

type SanityIconProps = Omit<IconProps, 'symbol'>

export function ComposeIcon(props: SanityIconProps) {
  return <Icon symbol="compose" {...props} />
}

export function DocumentIcon(props: SanityIconProps) {
  return <Icon symbol="document" {...props} />
}

export function HomeIcon(props: SanityIconProps) {
  return <Icon symbol="home" {...props} />
}

export function ImageIcon(props: SanityIconProps) {
  return <Icon symbol="image" {...props} />
}

export function SearchIcon(props: SanityIconProps) {
  return <Icon symbol="search" {...props} />
}
