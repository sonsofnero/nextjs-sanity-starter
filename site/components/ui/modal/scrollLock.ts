let lockCount = 0
let restore: (() => void) | undefined

/** Each modal owns one release; the last release restores the original inline declaration. */
export function acquireScrollLock(): () => void {
  if (lockCount === 0) {
    const style = document.body.style
    const properties = ['overflow', 'overflow-x', 'overflow-y']
    const declarations = Array.from(style)
      .filter((property) => properties.includes(property))
      .map((property) => ({
        property,
        value: style.getPropertyValue(property),
        priority: style.getPropertyPriority(property),
      }))
    style.setProperty('overflow', 'hidden', 'important')
    restore = () => {
      for (const property of properties) style.removeProperty(property)
      for (const {property, value, priority} of declarations)
        style.setProperty(property, value, priority)
    }
  }
  lockCount++
  let released = false
  return () => {
    if (released) return
    released = true
    lockCount--
    if (lockCount === 0) {
      restore?.()
      restore = undefined
    }
  }
}
