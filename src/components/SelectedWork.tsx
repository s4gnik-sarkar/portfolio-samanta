import React from 'react'
import { PHOTOGRAPHY_FOLDERS } from '../data/portfolioData'
import { PhotographyFolders } from './PhotographyFolders'
import { CurvedPhotoReel } from './CurvedPhotoReel'

export const SelectedWork: React.FC = () => (
  <section
    id="work"
    className="scroll-mt-24 border-t border-[#282920] bg-[#0A0A0A] py-24 sm:py-32 md:py-40"
    aria-labelledby="work-heading"
  >
    <div className="container-cinematic">
      <header className="mb-16 md:mb-24">
        <div className="mb-6 flex items-center gap-3">
          <span aria-hidden="true" className="h-1 w-8 bg-[#E6F35A]" />
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#E6F35A] md:text-xs">
            02 <span className="px-1 text-white/30">/</span> The image archive
          </p>
        </div>
        <div className="flex flex-col justify-between gap-8 border-b border-white/20 pb-8 lg:flex-row lg:items-end">
          <h2 id="work-heading" className="max-w-5xl font-sans text-5xl font-semibold uppercase leading-[0.86] tracking-[-0.075em] text-[#F2F0EB] sm:text-7xl md:text-8xl lg:text-[7.4rem]">
            Open a folder.
            <br />
            <span className="pl-[0.28em] italic text-[#E6F35A]">Find a story.</span>
          </h2>
          <p className="max-w-sm pb-1 text-xs font-normal leading-relaxed text-[#aaa69e] sm:text-sm">
            Three ways into the archive. Open a folder to browse event, wedding and portrait photographs.
          </p>
        </div>
      </header>

      <CurvedPhotoReel />
      <PhotographyFolders />

      <footer className="mt-24 flex flex-col gap-3 border-t border-white/10 pt-5 text-[9px] uppercase tracking-[0.2em] text-white/45 sm:mt-36 sm:flex-row sm:items-center sm:justify-between sm:text-[10px]">
        <span>Selected frames <span className="px-2 text-[#E6F35A]">/</span> An open archive</span>
        <span>{String(PHOTOGRAPHY_FOLDERS.length).padStart(2, '0')} collections</span>
      </footer>
    </div>
  </section>
)

export default SelectedWork
