import * as React from 'react'

const MOBILE_BREAKPOINT = 768

/**
 * A hook that returns true if the viewport width is less than the specified breakpoint.
 * @defaults to 768px (mobile devices)
 * @param breakpoint - The breakpoint in pixels
 */
export function useBreakpoint(breakpoint = MOBILE_BREAKPOINT) {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }
    mql.addEventListener('change', onChange)
    setIsMobile(window.innerWidth < breakpoint)
    return () => mql.removeEventListener('change', onChange)
  }, [breakpoint])

  return !!isMobile
}
