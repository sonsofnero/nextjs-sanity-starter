export const VerticalPadding = {
  '240': '240',
  '200': '200',
  '160': '160',
  '128': '128',
  '104': '104',
  '80': '80',
  '64': '64',
  '40': '40',
  none: 'none',
} as const

export type VerticalPaddingValue = keyof typeof VerticalPadding

export type BaseModuleProps = {
  _key: string
  _type: string
}

export type PaddingModuleProps = BaseModuleProps & {
  padding_top?: VerticalPaddingValue
  padding_bottom?: VerticalPaddingValue
}

type InternalPageType = 'homePage' | 'page'

type ProjectedInternalReference = {
  _type?: InternalPageType | null
  _id?: string
  slug?: {current: string} | string | null
  parent?: {slug: {current: string}} | null
}

export type ModuleButton = {
  text?: string | null
  url?: string | null
  linkType?: 'url' | 'internal' | null
  variant?: 'primary' | 'secondary' | 'outline' | null
  href?: string | null
  internalType?: InternalPageType | null
  internalReference?: ProjectedInternalReference | null
}

type CommonButtonProps = {
  className?: string
  onClick?: () => void
  type?: 'submit' | 'button'
}

type ButtonLinkProps = CommonButtonProps & {
  text: string
  href: string
}

type ButtonElementProps = CommonButtonProps & {
  text: string
  href?: never
}

export type ThemeButtonProps = ButtonLinkProps | ButtonElementProps
