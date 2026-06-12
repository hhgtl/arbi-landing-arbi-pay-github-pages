import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import styles from './ModalOverlay.module.scss'
// import CloseSvg from '../../../assets/CloseSvg.svg?react'
import clsx from "clsx";

const ModalDepthContext = createContext(0)

let bodyScrollLockCount = 0
let bodyScrollLockSavedOverflow = ''
let bodyScrollLockSavedHtmlOverflow = ''
let bodyScrollLockSavedBodyPosition = ''
let bodyScrollLockSavedBodyTop = ''
let bodyScrollLockSavedBodyLeft = ''
let bodyScrollLockSavedBodyWidth = ''
let bodyScrollLockSavedScrollY = 0

function restoreBodyScrollPosition(scrollY: number) {
  document.documentElement.scrollTop = scrollY
  document.body.scrollTop = scrollY
  window.scrollTo({
    top: scrollY,
    left: 0,
    behavior: 'instant',
  })
}

type ModalOverlayProps = {
  open: boolean
  onClose?: () => void
  ariaLabelledBy?: string
  className?: string
  contentClassName?: string
  classNameSwipeStrip?: string
  children: React.ReactNode
  headerTitle?: string | boolean
  headerSubtitle?: string
  isHomeIndicator?: boolean
  classNamePanel?: string
  /** Легче затемнение за шитом (например чат поверх предыдущего экрана). */
  backdropTone?: 'default' | 'light'
}

const VELOCITY_CLOSE_PX_PER_MS = 0.45
/** Закриття після відпускання, якщо зсув ≥ цієї частки висоти панелі */
const CLOSE_THRESHOLD_RATIO = 0.6

export const ModalOverlay: React.FC<ModalOverlayProps> = ({
  open,
  onClose,
  ariaLabelledBy,
  className,
  contentClassName,
  classNamePanel,
  classNameSwipeStrip,
  children,
  headerTitle = false,
  isHomeIndicator = false, headerSubtitle,
  backdropTone = 'default',
}) => {
  const parentDepth = useContext(ModalDepthContext)
  const depth = parentDepth + 1
  const stackZIndex = 999 + depth

  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const dragStartY = useRef(0)
  const dragStartTime = useRef(0)
  const dragOffsetRef = useRef(0)
  const lastMove = useRef<{ y: number; t: number } | null>(null)
  const [panelDragging, setPanelDragging] = useState(false)
  /** Два кадри rAF: спочатку панель знизу, потім перехід у translateY(0) */
  const [panelVisible, setPanelVisible] = useState(false)
  const [prevOpen, setPrevOpen] = useState(open)
  if (open !== prevOpen) {
    setPrevOpen(open)
    setPanelVisible(false)
  }

  useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    if (panel) panel.style.transform = ''
    let raf1 = 0
    let raf2 = 0
    let cancelled = false
    raf1 = requestAnimationFrame(() => {
      if (cancelled) return
      raf2 = requestAnimationFrame(() => {
        if (!cancelled) setPanelVisible(true)
      })
    })
    return () => {
      cancelled = true
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    if (bodyScrollLockCount === 0) {
      bodyScrollLockSavedOverflow = document.body.style.overflow
      bodyScrollLockSavedHtmlOverflow = document.documentElement.style.overflow
      bodyScrollLockSavedBodyPosition = document.body.style.position
      bodyScrollLockSavedBodyTop = document.body.style.top
      bodyScrollLockSavedBodyLeft = document.body.style.left
      bodyScrollLockSavedBodyWidth = document.body.style.width
      bodyScrollLockSavedScrollY = window.scrollY
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${bodyScrollLockSavedScrollY}px`
      document.body.style.left = '0'
      document.body.style.width = '100%'
    }
    bodyScrollLockCount += 1
    return () => {
      bodyScrollLockCount -= 1
      if (bodyScrollLockCount <= 0) {
        bodyScrollLockCount = 0
        const scrollY = bodyScrollLockSavedScrollY
        document.documentElement.style.overflow = bodyScrollLockSavedHtmlOverflow
        document.body.style.overflow = bodyScrollLockSavedOverflow
        document.body.style.position = bodyScrollLockSavedBodyPosition
        document.body.style.top = bodyScrollLockSavedBodyTop
        document.body.style.left = bodyScrollLockSavedBodyLeft
        document.body.style.width = bodyScrollLockSavedBodyWidth
        restoreBodyScrollPosition(scrollY)
      }
    }
  }, [open])

  useEffect(() => {
    if (!open) {
      dragOffsetRef.current = 0
      const panel = panelRef.current
      const overlay = overlayRef.current
      if (panel) panel.style.transform = 'translateY(100%)'
      if (overlay) overlay.style.removeProperty('--modal-overlay-dim')
    }
  }, [open])

  const applyDragVisuals = useCallback((offsetPx: number) => {
    const panel = panelRef.current
    const overlay = overlayRef.current
    if (panel) panel.style.transform = `translateY(${offsetPx}px)`
    if (overlay) {
      const panelH = panel?.offsetHeight ?? window.innerHeight
      const maxDim = panelH * CLOSE_THRESHOLD_RATIO
      const dim = Math.max(0, 1 - Math.min(1, offsetPx / maxDim))
      overlay.style.setProperty('--modal-overlay-dim', String(dim))
    }
  }, [])

  const finishSwipe = useCallback(
    (offsetPx: number, velocityPxPerMs: number) => {
      const panel = panelRef.current
      const panelH = panel?.offsetHeight ?? window.innerHeight
      const threshold = panelH * CLOSE_THRESHOLD_RATIO
      const shouldClose =
        offsetPx >= threshold || velocityPxPerMs > VELOCITY_CLOSE_PX_PER_MS
      const overlay = overlayRef.current
      setPanelDragging(false)

      if (shouldClose && onClose) {
        const travel = panelH + 48
        if (panel) {
          panel.classList.remove(styles.panelDragging)
          void panel.offsetHeight
          panel.style.transform = `translateY(${travel}px)`
        }
        if (overlay) overlay.style.setProperty('--modal-overlay-dim', '0')

        let finished = false
        const cleanup = () => {
          if (finished) return
          finished = true
          onClose()
        }

        if (panel) {
          const onTransitionEnd = (ev: TransitionEvent) => {
            if (ev.target !== panel || ev.propertyName !== 'transform') return
            panel.removeEventListener('transitionend', onTransitionEnd)
            window.clearTimeout(fallbackTimer)
            cleanup()
          }
          panel.addEventListener('transitionend', onTransitionEnd)
          const fallbackTimer = window.setTimeout(() => {
            panel.removeEventListener('transitionend', onTransitionEnd)
            cleanup()
          }, 380)
        } else {
          onClose()
        }
        dragOffsetRef.current = 0
        return
      }

      dragOffsetRef.current = 0
      if (panel) panel.style.transform = 'translateY(0)'
      if (overlay) overlay.style.setProperty('--modal-overlay-dim', '1')
    },
    [onClose],
  )

  const onSwipePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!onClose || !open || e.button !== 0) return
      const target = e.target as HTMLElement
      if (target.closest('button, a, input, textarea, select, [data-modal-no-swipe]')) {
        return
      }

      e.preventDefault()
      dragStartY.current = e.clientY
      dragStartTime.current = e.timeStamp
      dragOffsetRef.current = 0
      lastMove.current = { y: e.clientY, t: e.timeStamp }
      setPanelDragging(true)

      const onMove = (ev: PointerEvent) => {
        if (ev.pointerId !== e.pointerId) return
        const delta = ev.clientY - dragStartY.current
        const offset = Math.max(0, delta)
        dragOffsetRef.current = offset
        lastMove.current = { y: ev.clientY, t: ev.timeStamp }
        applyDragVisuals(offset)
      }

      const onUp = (ev: PointerEvent) => {
        if (ev.pointerId !== e.pointerId) return
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerup', onUp)
        window.removeEventListener('pointercancel', onUp)

        const offset = dragOffsetRef.current
        let velocity = 0
        if (lastMove.current) {
          const dt = ev.timeStamp - lastMove.current.t
          if (dt > 0) velocity = (ev.clientY - lastMove.current.y) / dt
        }
        const totalDt = ev.timeStamp - dragStartTime.current
        if (totalDt > 0) {
          const avg = (ev.clientY - dragStartY.current) / totalDt
          velocity = Math.max(velocity, avg > 0 ? avg : 0)
        }
        finishSwipe(offset, velocity)
      }

      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('pointerup', onUp)
      window.addEventListener('pointercancel', onUp)
    },
    [applyDragVisuals, finishSwipe, onClose, open],
  )

  const hasSwipeChrome = isHomeIndicator || !!headerTitle
  const swipeStripClass = [
    styles.swipeStrip,
    !hasSwipeChrome && styles.swipeStripFallbackOnly,
    isHomeIndicator && !headerTitle && styles.swipeStripIndicatorOnly,
  ]
    .filter(Boolean)
    .join(' ')

  const topChrome = (
    <>
      {isHomeIndicator && <div className={styles.homeIndicator} aria-hidden />}
      {headerTitle ? (
        <div className={styles.header}>
          <div className={styles.header_info}>
            <p className={styles.header_title}>{headerTitle}</p>
            {headerSubtitle && <p className={styles.header_subtitle}>{headerSubtitle}</p>}
          </div>
          {/*<p className={styles.header_title}>{headerTitle}</p>*/}
          <button type="button" className={styles.header_close} onClick={onClose}>
            {/*<CloseSvg />*/}
            Close
          </button>
        </div>
      ) : null}
    </>
  )

  const overlayNode = (
    <ModalDepthContext.Provider value={depth}>
      <div
        ref={overlayRef}
        className={clsx(
          styles.overlay,
          open && styles.overlayOpen,
          backdropTone === 'light' && styles.overlayBackdropLight,
          className,
        )}
        style={{ zIndex: stackZIndex }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabelledBy}
        onClick={(e) => e.target === e.currentTarget && onClose?.()}
      >
        <div
          ref={panelRef}
          className={`${styles.panel} ${classNamePanel ?? ''} ${open && panelVisible ? styles.panelVisible : ''} ${panelDragging ? styles.panelDragging : ''}`}
        >
          {onClose ? (
            <div className={clsx(swipeStripClass, classNameSwipeStrip)} onPointerDown={onSwipePointerDown}>
              {topChrome}
            </div>
          ) : (
            topChrome
          )}
          <div className={`${styles.content} ${isHomeIndicator ? styles.isHomeIndicator : ''} ${contentClassName ?? ''}`}>{children}</div>
        </div>
      </div>
    </ModalDepthContext.Provider>
  )

  return createPortal(overlayNode, document.body)
}