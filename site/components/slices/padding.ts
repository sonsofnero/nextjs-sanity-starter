import {stegaClean} from '@sanity/client/stega'

// Keys match the Studio's stored padding values. CSS owns the responsive sizes.
const paddingClasses = {
  '240': {
    paddingTop: 'section-padding-top-240',
    paddingBottom: 'section-padding-bottom-240',
  },
  '200': {
    paddingTop: 'section-padding-top-200',
    paddingBottom: 'section-padding-bottom-200',
  },
  '160': {
    paddingTop: 'section-padding-top-160',
    paddingBottom: 'section-padding-bottom-160',
  },
  '128': {
    paddingTop: 'section-padding-top-128',
    paddingBottom: 'section-padding-bottom-128',
  },
  '104': {
    paddingTop: 'section-padding-top-104',
    paddingBottom: 'section-padding-bottom-104',
  },
  '80': {
    paddingTop: 'section-padding-top-80',
    paddingBottom: 'section-padding-bottom-80',
  },
  '64': {
    paddingTop: 'section-padding-top-64',
    paddingBottom: 'section-padding-bottom-64',
  },
  '40': {
    paddingTop: 'section-padding-top-40',
    paddingBottom: 'section-padding-bottom-40',
  },
  none: {paddingTop: '', paddingBottom: ''},
} as const

type PaddingValue = keyof typeof paddingClasses

function normalizePadding(value: string | null | undefined): PaddingValue {
  if (value == null) return '80'
  const clean = stegaClean(value)
  return Object.hasOwn(paddingClasses, clean) ? (clean as PaddingValue) : 'none'
}

export function getModulePadding(top?: string | null, bottom?: string | null) {
  return {
    paddingTop: paddingClasses[normalizePadding(top)].paddingTop,
    paddingBottom: paddingClasses[normalizePadding(bottom)].paddingBottom,
  }
}
