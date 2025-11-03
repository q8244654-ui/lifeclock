import { useRef, useState, useEffect } from 'react'
import { TIMING } from '@/lib/constants'

interface UseAutoScrollDeps {
  messages?: unknown[]
  isTyping?: boolean
}

export function useAutoScroll(deps?: UseAutoScrollDeps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isAtBottom, setIsAtBottom] = useState(true)
  const autoScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Track whether user is near bottom
  useEffect(() => {
    const el = scrollContainerRef.current
    if (!el) return

    const handleScroll = () => {
      const threshold = TIMING.SCROLL_THRESHOLD
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - threshold
      setIsAtBottom(atBottom)
    }

    handleScroll()
    el.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      el.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  // Auto-scroll system: waits to sync with animations, scrolls only if user is at bottom
  useEffect(() => {
    if (!scrollContainerRef.current) return
    if (!isAtBottom) return

    if (autoScrollTimeoutRef.current) {
      clearTimeout(autoScrollTimeoutRef.current)
    }

    autoScrollTimeoutRef.current = setTimeout(() => {
      const el = scrollContainerRef.current
      if (!el) return

      const threshold = TIMING.SCROLL_THRESHOLD
      const atBottomNow = el.scrollTop + el.clientHeight >= el.scrollHeight - threshold

      if (atBottomNow) {
        el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
      }
    }, TIMING.AUTO_SCROLL_DELAY)

    return () => {
      if (autoScrollTimeoutRef.current) {
        clearTimeout(autoScrollTimeoutRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAtBottom, deps?.messages, deps?.isTyping])

  return {
    scrollContainerRef,
    isAtBottom,
  }
}

