import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { MapPin, Globe, Sparkles, CheckCircle2, User } from 'lucide-react'
import { ABOUT_DATA } from '../data/portfolioData'

export const About: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()
  const [imageError, setImageError] = useState(false)

  const transitionConfig = {
    duration: shouldReduceMotion ? 0 : 0.85,
    ease: [0.16, 1, 0.3, 1] as const,
  }

  const fadeUpVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: transitionConfig,
    },
  }

  return (
    <section
      id="about"
      className="py-24 sm:py-28 md:py-40 border-t border-[#161616] scroll-mt-24 bg-[#0A0A0A]"
      aria-label="About the Photographer"
    >
      <div className="container-cinematic">
        {/* Section Header */}
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUpVariants}
          className="mb-16 md:mb-28 max-w-4xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-[#C8B89A]/80"></span>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium text-[#C8B89A]">
              {ABOUT_DATA.kicker}
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[0.96] text-[#F2F0EB]">
            {ABOUT_DATA.headlineMain}{' '}
            <span className="italic font-normal text-[#C8B89A] block sm:inline">
              {ABOUT_DATA.headlineAccent}
            </span>
          </h2>
        </motion.header>

        {/* Asymmetrical 12-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-16 items-start">
          {/* Left Column: Photographer Portrait & Studio Locations (5 cols) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUpVariants}
            className="lg:col-span-5 flex flex-col space-y-10"
          >
            {/* Portrait Frame */}
            <div className="relative group">
              {/* Outer Framing Accents */}
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-[#C8B89A]/40 z-20 pointer-events-none"></div>
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-[#C8B89A]/40 z-20 pointer-events-none"></div>

              {/* Main Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#121212] border border-[#222222]">
                {!imageError ? (
                  <img
                    src={ABOUT_DATA.portrait.src}
                    alt={ABOUT_DATA.portrait.alt}
                    loading="lazy"
                    decoding="async"
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover object-center filter brightness-[0.93] contrast-[1.05] transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#141414] text-[#969696]">
                    <User className="w-8 h-8 text-[#C8B89A] mb-3" />
                    <span className="font-serif italic text-lg text-[#F2F0EB]">
                      {ABOUT_DATA.portrait.caption}
                    </span>
                    <span className="text-[10px] font-mono mt-2 text-[#C8B89A]">
                      {ABOUT_DATA.portrait.year}
                    </span>
                  </div>
                )}

                {/* Subtle Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent pointer-events-none"></div>

                {/* Inset Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#0A0A0A]/85 backdrop-blur-md border border-[#262626] text-[9px] uppercase tracking-[0.2em] text-[#C8B89A]">
                    <Sparkles className="w-2.5 h-2.5 text-[#C8B89A]" />
                    Studio Archive
                  </span>
                </div>

                {/* Inset Caption */}
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <p className="text-xs font-serif italic text-[#F2F0EB]">
                    {ABOUT_DATA.portrait.caption}
                  </p>
                </div>
              </div>

              {/* EXIF / Travel Note Underneath */}
              <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-[#969696]/80 tracking-wider px-1">
                <span>{ABOUT_DATA.portrait.year} Series</span>
                <span className="flex items-center gap-1 text-[#C8B89A]">
                  <Globe className="w-3 h-3" />
                  {ABOUT_DATA.portrait.exif}
                </span>
              </div>
            </div>

            {/* Studio Locations Plate */}
            <div className="p-6 border border-[#1A1A1A] bg-[#0E0E0E]/90">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8B89A] block mb-4 font-medium">
                Active Studio Presences
              </span>
              <ul className="space-y-3">
                {ABOUT_DATA.locations.map((loc) => (
                  <li
                    key={loc.city}
                    className="flex items-center justify-between pb-2.5 border-b border-[#161616] last:border-b-0 last:pb-0"
                  >
                    <span className="flex items-center gap-2 text-xs font-medium text-[#F2F0EB] tracking-wide">
                      <MapPin className="w-3.5 h-3.5 text-[#C8B89A]" />
                      {loc.city}
                    </span>
                    <span className="text-[11px] text-[#969696] font-light">
                      {loc.role}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right Column: Creative Philosophy, Biography, Specialties & Exhibitions (7 cols) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUpVariants}
            className="lg:col-span-7 flex flex-col space-y-14"
          >
            {/* Creative Philosophy Pull-Quote */}
            <blockquote className="border-l-2 border-[#C8B89A] pl-6 md:pl-8 py-2">
              <p className="font-serif italic text-2xl sm:text-3xl text-[#F2F0EB] font-light leading-relaxed mb-4">
                "{ABOUT_DATA.philosophyQuote}"
              </p>
              <footer className="text-[10px] uppercase tracking-[0.25em] text-[#C8B89A] font-medium">
                — {ABOUT_DATA.philosophyAttribution}
              </footer>
            </blockquote>

            {/* Biography Narrative Paragraphs */}
            <div className="space-y-6 text-sm md:text-base text-[#969696] font-light leading-relaxed">
              {ABOUT_DATA.biographyParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Specialties & Services Grid */}
            <div className="pt-8 border-t border-[#1C1C1C]">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8B89A] block mb-6 font-medium">
                Specialties & Focus
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {ABOUT_DATA.specialties.map((group) => (
                  <div key={group.category} className="space-y-3">
                    <h3 className="text-xs uppercase tracking-[0.2em] font-medium text-[#F2F0EB] pb-2 border-b border-[#1A1A1A]">
                      {group.category}
                    </h3>
                    <ul className="space-y-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2.5 text-xs text-[#969696]"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C8B89A] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Exhibitions Chronology */}
            <div className="pt-8 border-t border-[#1C1C1C]">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8B89A] block mb-6 font-medium">
                Selected Exhibitions & Monograph Showcases
              </span>

              <div className="space-y-4">
                {ABOUT_DATA.exhibitions.map((exhibition) => (
                  <div
                    key={`${exhibition.year}-${exhibition.title}`}
                    className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-4 border-b border-[#161616] gap-2"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-[#C8B89A] shrink-0">
                        {exhibition.year}
                      </span>
                      <h4 className="font-serif text-lg text-[#F2F0EB] font-light">
                        {exhibition.title}
                      </h4>
                    </div>

                    <div className="text-[11px] text-[#969696] font-light sm:text-right">
                      <span>{exhibition.venue}</span>
                      <span className="mx-2 text-[#444444]">//</span>
                      <span>{exhibition.city}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
