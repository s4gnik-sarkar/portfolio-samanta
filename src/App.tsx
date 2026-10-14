import React from 'react'
import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { SelectedWork } from './components/SelectedWork'
import { PhotographicProcess } from './components/PhotographicProcess'
import { About } from './components/About'
import { Contact } from './components/Contact'

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F2F0EB] font-sans antialiased selection:bg-[#C8B89A] selection:text-[#0A0A0A] relative flex flex-col justify-between">
      {/* 1. Fixed Top Navigation */}
      <Navigation />

      {/* 2. Main Narrative Flow */}
      <main id="top" className="flex-1">
        {/* Cinematic Hero */}
        <Hero />

        {/* Selected Work Photography Gallery */}
        <SelectedWork />

        {/* Oversized editorial process sequence */}
        <PhotographicProcess />

        {/* Editorial About Section */}
        <About />
      </main>

      {/* 3. Editorial Contact Section & Minimal Footer */}
      <Contact />
    </div>
  )
}

export default App
