import React, { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Pause, Play } from 'lucide-react'
import { PHOTOGRAPHY_FOLDERS } from '../data/portfolioData'
import './CurvedPhotoReel.css'

const SLICES = 16
const CAMERA = 1.6
const MAX_WIDTH = 55
const TILE_HEIGHT = 40
const ASPECT_RATIO = 16 / 9
const GAP = 6
const AXIS = 56
const CURVE = 80
const SPEED = 3.4
const FADE = 12

interface ReelLayout {
  columns: number
  sweep: number
  unit: number
  limit: number
}

const arc = (bend: number) => (CAMERA - 1 + Math.cos(bend)) / (2 * CAMERA * Math.sin(bend))

function measure(width: number, height: number, bend: number): ReelLayout {
  const tileHeight = Math.min((TILE_HEIGHT / 100) * height, ((MAX_WIDTH / 100) * width) / ASPECT_RATIO)
  const radius = width * arc(bend)
  if (!(tileHeight > 0) || !(radius > 0)) return { columns: 2, sweep: 0, unit: 0, limit: 0 }
  const degrees = (radians: number) => (radians * 180) / Math.PI
  const unit = degrees(tileHeight / radius)
  const pitch = (ASPECT_RATIO + GAP / 100) * unit
  const limit = degrees(bend) + (ASPECT_RATIO * unit) / 2
  const columns = Math.min(60, Math.max(2, Math.ceil((2 * limit) / pitch)))
  const round = (number: number) => +number.toFixed(4)
  const sweep = round((columns * pitch) / 2)
  return { columns, sweep, unit: round(unit), limit: round(Math.min(sweep, limit)) }
}

export const CurvedPhotoReel: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null)
  const instanceId = useId().replace(/[^a-zA-Z0-9]/g, '')
  const orbitClass = `photo-reel-orbit-${instanceId}`
  const tileClass = `photo-reel-tile-${instanceId}`
  const bend = (CURVE * Math.PI) / 180
  const prefersReducedMotion = useReducedMotion()
  const [layout, setLayout] = useState<ReelLayout | null>(null)
  const [shown, setShown] = useState<Record<number, number>>({})
  const [paused, setPaused] = useState(false)
  const photos = useMemo(() => PHOTOGRAPHY_FOLDERS.flatMap((folder) => folder.photos), [])
  const isPaused = paused || prefersReducedMotion === true

  useEffect(() => {
    const element = rootRef.current
    if (!element || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(([entry]) => {
      const next = measure(entry.contentRect.width, entry.contentRect.height, bend)
      setLayout((previous) => previous?.columns === next.columns && previous.sweep === next.sweep && previous.unit === next.unit ? previous : next)
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [bend])

  useEffect(() => {
    const element = rootRef.current
    if (!element) return
    const preload = () => photos.forEach(({ image }) => { const imageLoader = new Image(); imageLoader.src = image.src })
    if (typeof IntersectionObserver === 'undefined') {
      preload()
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      preload()
      observer.disconnect()
    }, { rootMargin: '400px' })
    observer.observe(element)
    return () => observer.disconnect()
  }, [photos])

  const { columns, sweep, unit, limit } = layout ?? measure(1200, 560, bend)
  const unitLength = (number: number) => `calc(${+number.toFixed(4)} * min(${TILE_HEIGHT}cqh, ${(MAX_WIDTH / ASPECT_RATIO).toFixed(4)}cqw))`
  const radius = `${(100 * arc(bend)).toFixed(3)}cqw`
  const turn = (degrees: number) => `translateZ(${radius}) rotateY(${degrees.toFixed(4)}deg) translateZ(-${radius})`
  const hiddenPercent = +(((sweep - limit) / (2 * sweep || 1)) * 100).toFixed(4)
  const sharedStyle = `@keyframes ${orbitClass}{from{transform:${turn(-sweep)}}to{transform:${turn(sweep)}}0%,${hiddenPercent}%,${100 - hiddenPercent}%,100%{visibility:hidden}${hiddenPercent + 0.001}%,${100 - hiddenPercent - 0.001}%{visibility:visible}}@media(prefers-reduced-motion:reduce){.${tileClass}{animation-play-state:paused}}`
  const sliceWidth = ASPECT_RATIO / SLICES
  const duration = columns * SPEED
  const edgeMask = `linear-gradient(90deg,transparent,#000 ${FADE}%,#000 ${100 - FADE}%,transparent)`

  return (
    <div className="curved-reel-section">
      <div className="curved-reel-heading">
        <span>01 / All photographs</span>
        <span>{String(photos.length).padStart(2, '0')} frames</span>
      </div>

      <div ref={rootRef} className="curved-reel" data-paused={isPaused}>
        <style>{sharedStyle}</style>
        <div
          className="curved-reel-band"
          aria-hidden="true"
          style={{
            opacity: layout ? 1 : 0,
            perspective: `${(100 * arc(bend) * CAMERA).toFixed(3)}cqw`,
            perspectiveOrigin: `50% ${AXIS}%`,
            maskImage: edgeMask,
            WebkitMaskImage: edgeMask,
          }}
        >
          {Array.from({ length: columns }, (_, tileIndex) => {
            const firstPhoto = columns - 1 - tileIndex
            const photoIndex = (shown[tileIndex] ?? firstPhoto) % Math.max(photos.length, 1)
            const photo = photos[photoIndex]
            return (
              <div
                key={tileIndex}
                className={`curved-reel-tile ${tileClass}`}
                style={{
                  left: `calc(50% - ${unitLength(ASPECT_RATIO / 2)})`,
                  top: `calc(${AXIS}% - ${unitLength(.5)})`,
                  width: unitLength(ASPECT_RATIO),
                  height: unitLength(1),
                  transformStyle: 'preserve-3d',
                  animation: `${orbitClass} ${duration}s linear ${-tileIndex * SPEED}s infinite`,
                  animationPlayState: isPaused ? 'paused' : 'running',
                }}
                onAnimationIteration={(event) => {
                  const lap = Math.round(event.elapsedTime / duration)
                  const nextPhoto = lap * columns + firstPhoto
                  setShown((previous) => previous[tileIndex] === nextPhoto ? previous : { ...previous, [tileIndex]: nextPhoto })
                }}
              >
                {Array.from({ length: SLICES }, (_, sliceIndex) => (
                  <div
                    key={sliceIndex}
                    className="curved-reel-slice"
                    style={{
                      left: unitLength((ASPECT_RATIO - sliceWidth) / 2),
                      width: sliceIndex === SLICES - 1 ? unitLength(sliceWidth) : `calc(${unitLength(sliceWidth)} + 1px)`,
                      height: unitLength(1),
                      transform: turn((ASPECT_RATIO / 2 - (sliceIndex + .5) * sliceWidth) * unit),
                    }}
                  >
                    <img
                      src={photo?.image.src}
                      alt=""
                      draggable={false}
                      loading="lazy"
                      decoding="async"
                      className="curved-reel-slice-image"
                      style={{ left: unitLength(-sliceIndex * sliceWidth), width: unitLength(ASPECT_RATIO), height: unitLength(1) }}
                    />
                  </div>
                ))}
              </div>
            )
          })}
        </div>
        <div className="curved-reel-fade" aria-hidden="true" />
      </div>

      <div className="curved-reel-controls">
        <span>{prefersReducedMotion ? 'Motion reduced by your settings' : 'A moving index of the archive'}</span>
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          disabled={Boolean(prefersReducedMotion)}
          aria-label={isPaused ? 'Play the moving photograph reel' : 'Pause the moving photograph reel'}
          aria-pressed={Boolean(isPaused)}
          className="curved-reel-toggle"
        >
          {isPaused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
          <span>{isPaused ? 'Play' : 'Pause'}</span>
        </button>
      </div>
    </div>
  )
}

export default CurvedPhotoReel
