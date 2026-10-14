import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Camera, MapPin, Info } from 'lucide-react'
import { GalleryProject } from '../data/portfolioData'

interface LightboxProps {
  projects: GalleryProject[]
  activeIndex: number | null
  onClose: () => void
  onNavigate: (newIndex: number) => void
}

export const Lightbox: React.FC<LightboxProps> = ({
  projects,
  activeIndex,
  onClose,
  onNavigate,
}) => {
  const shouldReduceMotion = useReducedMotion()
  const [showDetails, setShowDetails] = useState(true)
  const [failedImageIds, setFailedImageIds] = useState<Record<string, boolean>>({})
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const touchStartCoords = useRef<{ x: number; y: number } | null>(null)

  const isOpen = activeIndex !== null && activeIndex >= 0 && activeIndex < projects.length
  const currentProject = isOpen ? projects[activeIndex] : null
  const isImageFailed = currentProject ? Boolean(failedImageIds[currentProject.id]) : false

  const handlePrev = useCallback(() => {
    if (activeIndex === null) return
    const prev = (activeIndex - 1 + projects.length) % projects.length
    onNavigate(prev)
  }, [activeIndex, projects.length, onNavigate])

  const handleNext = useCallback(() => {
    if (activeIndex === null) return
    const next = (activeIndex + 1) % projects.length
    onNavigate(next)
  }, [activeIndex, projects.length, onNavigate])

  // Focus management and background scroll lock
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      requestAnimationFrame(() => {
        closeButtonRef.current?.focus()
      })

      return () => {
        document.body.style.overflow = originalOverflow || ''
        previousFocusRef.current?.focus()
      }
    }
  }, [isOpen])

  // Keyboard navigation & Focus Trapping
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          e.preventDefault()
          onClose()
          break
        case 'ArrowLeft':
          e.preventDefault()
          handlePrev()
          break
        case 'ArrowRight':
          e.preventDefault()
          handleNext()
          break
        case 'Tab': {
          // Keep focus within dialog
          const focusable = document.querySelectorAll<HTMLElement>(
            '[role="dialog"] button:not([disabled])',
          )
          if (!focusable.length) return
          const first = focusable[0]
          const last = focusable[focusable.length - 1]

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault()
            last.focus()
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
          break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, handlePrev, handleNext])

  // Touch handlers for mobile swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    touchStartCoords.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartCoords.current) return
    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - touchStartCoords.current.x
    const deltaY = touch.clientY - touchStartCoords.current.y
    touchStartCoords.current = null

    // Require predominantly horizontal swipe of at least 45px
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX > 0) {
        handlePrev()
      } else {
        handleNext()
      }
    }
  }

  if (!isOpen || !currentProject) return null

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Photograph viewer: ${currentProject.title}`}
        className="fixed inset-0 z-50 flex items-center justify-center select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#0A0A0A]/95 backdrop-blur-xl cursor-zoom-out"
          aria-hidden="true"
        />

        {/* Top Control Bar */}
        <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-5 py-4 md:px-10 md:py-6 border-b border-[#1A1A1A]/60 bg-gradient-to-b from-[#0A0A0A]/90 to-transparent">
          {/* Index Counter */}
          <div className="flex items-center gap-2 sm:gap-3 font-mono text-xs tracking-widest text-[#969696]">
            <span className="text-[#C8B89A] font-medium">
              {String((activeIndex ?? 0) + 1).padStart(2, '0')}
            </span>
            <span>/</span>
            <span>{String(projects.length).padStart(2, '0')}</span>
            <span className="hidden sm:inline-block text-[#969696]/60 ml-2">
              — {currentProject.category}
            </span>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-3">
            {/* Toggle Info Details */}
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className={`p-2 sm:p-2.5 rounded-full border transition-all duration-300 flex items-center gap-2 text-xs uppercase tracking-[0.2em] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C8B89A] ${
                showDetails
                  ? 'border-[#C8B89A]/40 bg-[#C8B89A]/10 text-[#C8B89A]'
                  : 'border-[#222222] bg-[#121212]/80 text-[#969696] hover:text-[#F2F0EB]'
              }`}
              aria-label={showDetails ? 'Hide plate details' : 'Show plate details'}
              aria-pressed={showDetails}
            >
              <Info className="w-4 h-4" />
              <span className="hidden sm:inline text-[10px]">Details</span>
            </button>

            {/* Close Button */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-full border border-[#222222] hover:border-[#C8B89A]/50 bg-[#121212]/80 hover:bg-[#181818] text-[#F2F0EB] hover:text-[#C8B89A] transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C8B89A]"
              aria-label="Close lightbox (Escape)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Previous Button (Universal with subtle mobile touch sizing) */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 lg:left-8 z-30 p-2 sm:p-3 rounded-full border border-[#222222] hover:border-[#C8B89A]/50 bg-[#121212]/80 hover:bg-[#181818] text-[#F2F0EB] hover:text-[#C8B89A] transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C8B89A]"
          aria-label="Previous photograph (Left Arrow)"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Next Button (Universal with subtle mobile touch sizing) */}
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-2 sm:right-4 lg:right-8 z-30 p-2 sm:p-3 rounded-full border border-[#222222] hover:border-[#C8B89A]/50 bg-[#121212]/80 hover:bg-[#181818] text-[#F2F0EB] hover:text-[#C8B89A] transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C8B89A]"
          aria-label="Next photograph (Right Arrow)"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Central Photographic Image Container */}
        <div className="relative z-10 max-w-6xl max-h-[82vh] p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center">
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative flex flex-col items-center max-h-[68vh] sm:max-h-[72vh] md:max-h-[76vh]"
          >
            <div className="relative overflow-hidden border border-[#262626] bg-[#0E0E0E] shadow-2xl">
              {!isImageFailed ? (
                <img
                  src={currentProject.image.src}
                  alt={currentProject.image.alt}
                  onError={() => {
                    if (currentProject) {
                      setFailedImageIds((prev) => ({ ...prev, [currentProject.id]: true }))
                    }
                  }}
                  className="max-h-[60vh] sm:max-h-[66vh] md:max-h-[72vh] w-auto max-w-[88vw] md:max-w-[78vw] object-contain filter brightness-[0.96] contrast-[1.04]"
                />
              ) : (
                <div className="h-64 w-80 max-w-[88vw] flex flex-col items-center justify-center p-6 text-center text-[#969696]">
                  <Camera className="w-8 h-8 text-[#C8B89A] mb-3" />
                  <span className="font-serif italic text-lg text-[#F2F0EB]">
                    {currentProject.title}
                  </span>
                  <span className="text-[10px] font-mono mt-2 text-[#C8B89A]">
                    {currentProject.plateNumber}
                  </span>
                </div>
              )}

              {/* Discreet Corner Accents */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#C8B89A]/40 pointer-events-none"></div>
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#C8B89A]/40 pointer-events-none"></div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Details Drawer / Plate Bar */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
              className="absolute bottom-0 left-0 right-0 z-20 px-5 py-4 sm:px-8 sm:py-5 md:px-12 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/95 to-transparent border-t border-[#1A1A1A]/80 backdrop-blur-md"
            >
              <div className="container-cinematic flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
                {/* Title & Caption */}
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#C8B89A] mb-1">
                    <span>{currentProject.plateNumber}</span>
                    <span>//</span>
                    <span>{currentProject.year}</span>
                    <span className="text-[#969696] sm:hidden">— {currentProject.category}</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-light text-[#F2F0EB] leading-tight mb-1">
                    {currentProject.title}
                  </h3>

                  <p className="text-xs md:text-sm text-[#969696] font-light leading-relaxed hidden sm:block">
                    {currentProject.caption}
                  </p>
                </div>

                {/* Technical EXIF & Location */}
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-2 text-[10px] font-mono text-[#969696]/80 tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-[#C8B89A]" />
                    {currentProject.camera}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C8B89A]" />
                    {currentProject.location}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  )
}

export default Lightbox
