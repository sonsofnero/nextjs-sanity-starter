import { theme } from '@/config/theme'
import { VerticalPadding } from '@/config/types'

/**
 * Get module padding classes based on padding top/bottom values
 * Handles stega encoding from Sanity Presentation Mode
 * 
 * @param padding_top - Padding top value from Sanity
 * @param padding_bottom - Padding bottom value from Sanity
 * @returns Object with paddingTop and paddingBottom Tailwind classes
 */
export function getModulePadding(
  padding_top?: keyof typeof VerticalPadding | string,
  padding_bottom?: keyof typeof VerticalPadding | string
) {
  const normalizePadding = (
    value?: keyof typeof VerticalPadding | string
  ): keyof typeof VerticalPadding | undefined => {
    if (!value) return undefined
    if (value in VerticalPadding) return value as keyof typeof VerticalPadding
    return undefined
  }

  const cleanPaddingTop = normalizePadding(padding_top)
  const cleanPaddingBottom = normalizePadding(padding_bottom)
  
  return {
    paddingTop: cleanPaddingTop 
      ? theme.paddingTop[VerticalPadding[cleanPaddingTop]] 
      : '',
    paddingBottom: cleanPaddingBottom 
      ? theme.paddingBottom[VerticalPadding[cleanPaddingBottom]] 
      : '',
  }
}

/**
 * Default padding values for modules
 */
export const initialPadding = {
  padding_top: '80' as const,
  padding_bottom: '80' as const,
}
