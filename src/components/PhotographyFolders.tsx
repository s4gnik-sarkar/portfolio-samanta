import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, FolderOpen } from 'lucide-react'
import { PHOTOGRAPHY_FOLDERS, PortfolioFolder } from '../data/portfolioData'
import './PhotographyFolders.css'

export const PhotographyFolders: React.FC = () => {
  const [openFolder, setOpenFolder] = useState<string | null>(null)
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="portfolio-folders">
      <div className="portfolio-folder-grid">
        {PHOTOGRAPHY_FOLDERS.map((folder, index) => (
          <FolderCard
            key={folder.id}
            folder={folder}
            index={index}
            open={openFolder === folder.id}
            onToggle={() => setOpenFolder(openFolder === folder.id ? null : folder.id)}
            shouldReduceMotion={shouldReduceMotion}
          />
        ))}
      </div>
    </div>
  )
}

interface FolderCardProps {
  folder: PortfolioFolder
  index: number
  open: boolean
  onToggle: () => void
  shouldReduceMotion: boolean | null
}

const FolderCard: React.FC<FolderCardProps> = ({ folder, index, open, onToggle, shouldReduceMotion }) => {
  const contentsId = `folder-content-${folder.id}`

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.65, delay: shouldReduceMotion ? 0 : index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="portfolio-folder"
    >
      <button
        type="button"
        className="folder-trigger"
        data-open={open}
        aria-expanded={open}
        aria-controls={contentsId}
        aria-label={`${open ? 'Close' : 'Open'} ${folder.label}, ${folder.photos.length} photographs`}
        onClick={onToggle}
      >
        <span className="folder-art" aria-hidden="true">
          <span className="folder-tab" />
          <span className="folder-back" />
          <span className="folder-sheets">
            {folder.photos.slice(0, 3).map((photo, photoIndex) => (
              <img
                key={photo.id}
                src={photo.image.src}
                alt=""
                loading="lazy"
                decoding="async"
                className="folder-preview"
                style={{ '--photo-index': photoIndex } as React.CSSProperties}
              />
            ))}
          </span>
          <span className="folder-front">
            <span className="folder-label">
              <span className="folder-name">{folder.label}</span>
              <span className="folder-count">{String(folder.photos.length).padStart(2, '0')} PHOTOS</span>
            </span>
            <span className="folder-open-icon"><FolderOpen aria-hidden="true" /></span>
          </span>
        </span>
        <span className="folder-prompt">
          <span>{open ? 'Close folder' : 'Open folder'}</span>
          <ArrowDownRight aria-hidden="true" className={open ? 'folder-arrow is-open' : 'folder-arrow'} />
        </span>
      </button>

      <motion.div
        id={contentsId}
        className="folder-contents"
        aria-hidden={!open}
        inert={!open}
        initial={false}
        animate={{ opacity: open ? 1 : 0, height: open ? 'auto' : 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="folder-description">{folder.description}</p>
        <div className="folder-photo-grid">
          {folder.photos.map((photo, photoIndex) => (
            <motion.figure
              key={photo.id}
              initial={false}
              animate={{ opacity: open ? 1 : 0, y: open ? 0 : 12 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.35, delay: shouldReduceMotion || !open ? 0 : photoIndex * 0.06 }}
              className="folder-photo"
            >
              <div className="folder-photo-image">
                <img src={photo.image.src} alt={photo.image.alt} loading="lazy" decoding="async" />
              </div>
              <figcaption>
                <span className="folder-photo-title">{photo.title}</span>
                <span className="folder-photo-location">{photo.location}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </motion.div>
    </motion.article>
  )
}

export default PhotographyFolders
