import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Mail, Copy, Check, ArrowUpRight, ArrowUp } from 'lucide-react'
import { CONTACT_DATA, PHOTOGRAPHER_INFO } from '../data/portfolioData'

export const Contact: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_DATA.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Fallback if clipboard API is not available
      setCopied(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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

  const mailtoHref = `mailto:${CONTACT_DATA.email}?subject=${encodeURIComponent(
    CONTACT_DATA.emailSubject,
  )}`

  return (
    <footer
      id="contact"
      className="border-t border-[#161616] scroll-mt-24 bg-[#0A0A0A] pt-24 sm:pt-28 md:pt-40"
      aria-label="Direct Inquiries and Footer"
    >
      <div className="container-cinematic">
        {/* Contact Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUpVariants}
          className="mb-16 md:mb-24 max-w-4xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-[#C8B89A]/80"></span>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium text-[#C8B89A]">
              {CONTACT_DATA.kicker}
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.94] text-[#F2F0EB]">
            {CONTACT_DATA.headlineMain}{' '}
            <span className="italic font-normal text-[#C8B89A] block sm:inline">
              {CONTACT_DATA.headlineAccent}
            </span>
          </h2>
        </motion.div>

        {/* 12-Column Asymmetric Inquiry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-16 pb-24 md:pb-36 border-b border-[#1A1A1A]">
          {/* Left Column: Direct Email & Call to Action (7 cols) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUpVariants}
            className="lg:col-span-7 flex flex-col justify-between space-y-10"
          >
            <div>
              <p className="text-sm md:text-base text-[#969696] font-light leading-relaxed max-w-xl mb-12">
                {CONTACT_DATA.description}
              </p>

              {/* Large Editorial Interactive Email Link */}
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#969696] block font-medium">
                  Direct Inquiries & Monograph Representation
                </span>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <a
                    href={mailtoHref}
                    className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-[#F2F0EB] hover:text-[#C8B89A] transition-colors duration-300 break-all leading-tight group flex items-center gap-3"
                    aria-label={`Send email to ${CONTACT_DATA.email}`}
                  >
                    <span>{CONTACT_DATA.email}</span>
                    <ArrowUpRight className="w-5 h-5 text-[#C8B89A] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 hidden sm:block" />
                  </a>

                  {/* Copy Button */}
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="self-start sm:self-auto p-2.5 rounded-full border border-[#222222] hover:border-[#C8B89A]/50 bg-[#121212] hover:bg-[#181818] text-[#969696] hover:text-[#F2F0EB] transition-all duration-300 flex items-center gap-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C8B89A]"
                    aria-label="Copy email address to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-[#C8B89A]" />
                        <span className="text-[10px] font-mono uppercase text-[#C8B89A] pr-1">
                          Copied
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#969696]" />
                        <span className="text-[10px] font-mono uppercase text-[#969696] pr-1">
                          Copy
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Direct Mailto CTA Button & Availability Notice */}
            <div className="space-y-6 pt-6">
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={mailtoHref}
                  className="group inline-flex items-center gap-3 bg-[#F2F0EB] hover:bg-[#C8B89A] text-[#0A0A0A] px-6 py-3.5 text-xs uppercase tracking-[0.25em] font-medium transition-colors duration-300"
                >
                  <Mail className="w-4 h-4" />
                  <span>Initiate Inquiry</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <div className="inline-flex items-center gap-2 border border-[#222222] bg-[#121212] px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-[#C8B89A]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C8B89A] animate-pulse"></span>
                  <span>{CONTACT_DATA.availabilityBadge}</span>
                </div>
              </div>

              <p className="text-xs text-[#969696]/80 font-light">
                {CONTACT_DATA.responseNotice}
              </p>
            </div>
          </motion.div>

          {/* Right Column: Social Channels & Direct Studio Notes (5 cols) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUpVariants}
            className="lg:col-span-5 flex flex-col justify-between space-y-12"
          >
            {/* Social / Portfolio Platforms */}
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8B89A] block font-medium">
                Public Feeds & Digital Editions
              </span>

              <div className="border-t border-[#1C1C1C]">
                {CONTACT_DATA.socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-3.5 border-b border-[#181818] hover:border-[#C8B89A]/30 transition-colors"
                  >
                    <div>
                      <span className="text-xs uppercase tracking-[0.2em] text-[#F2F0EB] group-hover:text-[#C8B89A] transition-colors block">
                        {link.name}
                      </span>
                      <span className="text-[11px] text-[#969696] font-light">
                        {link.label}
                      </span>
                    </div>

                    <ArrowUpRight className="w-4 h-4 text-[#969696] group-hover:text-[#C8B89A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* Direct Studio Notes Card */}
            <div className="p-6 border border-[#1A1A1A] bg-[#0E0E0E]/90 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8B89A] block font-medium">
                Studio Notes
              </span>
              <div className="space-y-3">
                {CONTACT_DATA.directNotes.map((note) => (
                  <div key={note.label} className="text-xs">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#969696] block mb-0.5">
                      {note.label}
                    </span>
                    <span className="text-xs text-[#F2F0EB] font-light">
                      {note.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Minimal Editorial Footer Conclusion */}
        <div className="py-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-[10px] uppercase tracking-[0.25em] text-[#969696]">
          {/* Wordmark and Monograph Subtitle */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="font-semibold text-[#F2F0EB] tracking-[0.35em]">
              {PHOTOGRAPHER_INFO.name}
            </span>
            <span className="hidden sm:inline text-[#333333]">//</span>
            <span className="font-light">
              © {PHOTOGRAPHER_INFO.currentYear}. All Rights Reserved.
            </span>
          </div>

          {/* Back to Top Control */}
          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 text-[#969696] hover:text-[#C8B89A] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C8B89A]"
            aria-label="Scroll back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Contact

