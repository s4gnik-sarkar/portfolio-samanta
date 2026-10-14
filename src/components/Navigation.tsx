import React, { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { PHOTOGRAPHER_INFO, NAV_ITEMS } from '../data/portfolioData'

export const Navigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on Escape key press and manage body scroll locking
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileMenuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#1A1A1A] py-4'
          : 'bg-transparent border-b border-transparent py-6 md:py-8'
      }`}
    >
      <div className="container-cinematic flex items-center justify-between">
        {/* Photographer Wordmark */}
        <a
          href="#top"
          className="group flex flex-col focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C8B89A]"
          aria-label={`${PHOTOGRAPHER_INFO.name} Portfolio — Return to top`}
        >
          <span className="text-xs md:text-sm uppercase tracking-[0.35em] font-semibold text-[#F2F0EB] group-hover:text-[#C8B89A] transition-colors duration-300">
            {PHOTOGRAPHER_INFO.name}
          </span>
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#969696] font-light mt-0.5 hidden sm:block">
            {PHOTOGRAPHER_INFO.title}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center space-x-10"
          aria-label="Main Navigation"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative text-xs uppercase tracking-[0.25em] text-[#969696] hover:text-[#F2F0EB] transition-colors duration-300 py-1"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[#C8B89A] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Right Status / Inquiry Pill */}
        <div className="hidden lg:flex items-center">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2.5 border border-[#222222] hover:border-[#C8B89A]/50 bg-[#121212]/80 px-3.5 py-1.5 rounded-full transition-all duration-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#C8B89A] animate-pulse"></span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#C8B89A] font-medium group-hover:text-[#F2F0EB] transition-colors">
              Available for Commissions
            </span>
            <ArrowUpRight className="w-3 h-3 text-[#969696] group-hover:text-[#C8B89A] transition-colors" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#F2F0EB] hover:text-[#C8B89A] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C8B89A] transition-colors"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 top-[65px] bg-[#0A0A0A]/98 backdrop-blur-2xl border-t border-[#1A1A1A] z-40 transition-all duration-500 md:hidden flex flex-col justify-between px-6 py-10 overflow-y-auto ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex flex-col space-y-8 pt-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#969696] pb-2 border-b border-[#1A1A1A]">
            Navigation
          </span>
          {NAV_ITEMS.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-baseline justify-between font-serif text-3xl sm:text-4xl text-[#F2F0EB] hover:text-[#C8B89A] transition-colors duration-300 py-1"
            >
              <span>{item.label}</span>
              <span className="text-xs font-sans font-normal text-[#969696] tracking-[0.2em]">
                0{index + 1}
              </span>
            </a>
          ))}
        </div>

        {/* Mobile Drawer Footer Info */}
        <div className="pt-8 border-t border-[#1A1A1A] space-y-4 mt-8">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C8B89A]"></span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#C8B89A]">
              Accepting Commissions Worldwide
            </span>
          </div>
          <p className="text-xs text-[#969696] font-light leading-relaxed">
            {PHOTOGRAPHER_INFO.tagline}
          </p>
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#969696]">
            © {PHOTOGRAPHER_INFO.currentYear} {PHOTOGRAPHER_INFO.name}. All Rights Reserved.
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navigation
