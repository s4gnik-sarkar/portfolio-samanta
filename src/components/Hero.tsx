import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { HERO_DATA, PHOTOGRAPHER_INFO } from '../data/portfolioData'

const headlineWords = [...HERO_DATA.headlineMain.split(' '), HERO_DATA.headlineAccent]
const popColor = '#E6F35A'

export const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      aria-label="Introduction"
      className="relative isolate flex min-h-[100svh] overflow-hidden bg-[#11100e]"
    >
      {/* The source lives in HERO_DATA so the photograph can be replaced independently. */}
      <motion.div
        aria-hidden="true"
        initial={shouldReduceMotion ? false : { clipPath: 'inset(0 0 100% 0)' }}
        animate={{ clipPath: 'inset(0 0 0% 0)' }}
        transition={{ duration: shouldReduceMotion ? 0 : 1.45, delay: shouldReduceMotion ? 0 : 0.1, ease: [0.77, 0, 0.175, 1] }}
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        <img
          src={HERO_DATA.heroImage.src}
          alt={HERO_DATA.heroImage.alt}
          loading="eager"
          fetchPriority="high"
          className="h-full w-full object-cover object-[58%_center]"
        />
        <div className="absolute inset-0 bg-[#090908]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090908]/80 via-[#090908]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090908]/80 via-transparent to-[#090908]/35" />
      </motion.div>

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1800px] flex-col justify-between px-5 pb-7 pt-28 sm:px-8 sm:pb-10 sm:pt-32 lg:px-[6.2vw] lg:pb-12 lg:pt-36">
        <div className="flex items-start justify-between gap-5">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.7, delay: shouldReduceMotion ? 0 : 0.55 }}
            className="max-w-[12rem] border-l-2 pl-3 sm:pl-4"
            style={{ borderColor: popColor }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#f1eee7] sm:text-xs">
              {PHOTOGRAPHER_INFO.name}
            </p>
            <p className="mt-1.5 text-[9px] uppercase leading-relaxed tracking-[0.16em] text-white/60 sm:text-[10px]">
              Photographer / Visual artist
            </p>
          </motion.div>
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.7, delay: shouldReduceMotion ? 0 : 0.75 }}
            className="hidden text-right text-[9px] font-medium uppercase leading-relaxed tracking-[0.2em] text-white/65 sm:block sm:text-[10px]"
          >
            <span className="text-white/35">01 / </span>{HERO_DATA.heroImage.location}
          </motion.p>
        </div>

        <div className="mb-9 mt-auto max-w-[1300px] pt-20 sm:mb-11 lg:pt-28">
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.65, delay: shouldReduceMotion ? 0 : 0.75 }}
            className="mb-4 text-[9px] font-semibold uppercase tracking-[0.28em] sm:mb-5 sm:text-[10px]"
            style={{ color: popColor }}
          >
            {HERO_DATA.kicker}
          </motion.p>
          <h1 className="max-w-[13ch] font-sans text-[clamp(3.9rem,11.3vw,11.8rem)] font-semibold uppercase leading-[0.82] tracking-[-0.075em] text-[#f4f0e9]">
            <span className="sr-only">{headlineWords.join(' ')}</span>
            <span aria-hidden="true" className="flex flex-wrap gap-x-[0.24em]">
              {headlineWords.map((word, index) => (
                <span key={`${word}-${index}`} className="overflow-hidden pb-[0.12em]">
                  <motion.span
                    initial={shouldReduceMotion ? false : { y: '110%', rotate: 2 }}
                    animate={{ y: '0%', rotate: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.9, delay: shouldReduceMotion ? 0 : 0.62 + index * 0.09, ease: [0.16, 1, 0.3, 1] }}
                    className={`inline-block ${index === headlineWords.length - 1 ? 'italic text-[#E6F35A]' : ''}`}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>
          <div className="mt-7 flex max-w-[48rem] items-end justify-between gap-6 sm:mt-9 lg:mt-11">
            <p className="max-w-sm text-xs font-normal leading-relaxed text-white/75 sm:text-sm">
              {HERO_DATA.subtitle}
            </p>
            <span className="hidden shrink-0 pb-0.5 text-[9px] uppercase tracking-[0.2em] text-white/60 md:block">
              {HERO_DATA.heroImage.plateNumber} <span className="px-2 text-[#d5c4a0]">/</span> {HERO_DATA.heroImage.title}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/20 pt-4 sm:pt-5">
          <a
            href="#work"
            className="group inline-flex min-h-10 items-center gap-3 text-[9px] uppercase tracking-[0.24em] text-white/75 transition-colors hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#d5c4a0] sm:text-[10px]"
            aria-label="Scroll down to explore selected photographs"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/35 transition-colors group-hover:border-[#d5c4a0]">
              <ArrowDown aria-hidden="true" className="h-3 w-3 transition-transform group-hover:translate-y-0.5" />
            </span>
            Scroll to explore
          </a>
          <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/65 sm:text-[10px]">
            {HERO_DATA.metadata.archiveRange}
          </span>
        </div>
      </div>
    </section>
  )
}

export default Hero
