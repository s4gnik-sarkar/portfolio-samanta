import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { PHOTOGRAPHY_PROCESS } from '../data/portfolioData'
import './PhotographicProcess.css'

export const PhotographicProcess: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()
  const [activeStep, setActiveStep] = React.useState<number | null>(null)
  const activeColor = activeStep === null ? '#0A0A0A' : PHOTOGRAPHY_PROCESS[activeStep].backgroundColor
  const processImage = PHOTOGRAPHY_PROCESS.find((step) => step.image)?.image

  return (
    <section aria-labelledby="process-heading" className="relative border-t border-white/10 bg-[#0A0A0A]">
      <div className="process-sticky-background" aria-hidden="true">
        <motion.div
          className="process-background-color"
          animate={{ backgroundColor: activeColor }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
        />
        {processImage && (
          <motion.img
            src={processImage}
            alt=""
            loading="lazy"
            decoding="async"
            className="process-background-image"
            animate={{ opacity: activeStep !== null && Boolean(PHOTOGRAPHY_PROCESS[activeStep].image) ? 0.28 : 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.65 }}
          />
        )}
      </div>
      <div className="process-content">
      <header className="container-cinematic mb-12 pt-24 sm:mb-16 sm:pt-32 md:mb-20 md:pt-40">
        <p className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#E6F35A] sm:text-xs">
          <span aria-hidden="true" className="h-1 w-8 bg-[#E6F35A]" />
          03 <span className="text-white/35">/</span> A way of seeing
        </p>
        <h2 id="process-heading" className="max-w-5xl font-sans text-5xl font-semibold uppercase leading-[0.86] tracking-[-0.075em] text-[#F2F0EB] sm:text-7xl md:text-8xl lg:text-[7.4rem]">
          Before the
          <br />
          <span className="pl-[0.25em] italic text-[#E6F35A]">frame.</span>
        </h2>
      </header>

      <ol className="m-0 list-none p-0">
        {PHOTOGRAPHY_PROCESS.map((step, index) => (
          <motion.li
            key={step.number}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`process-panel process-panel-${index + 1}`}
            onViewportEnter={() => setActiveStep(index)}
          >
            <div className={`process-panel-inner process-panel-inner-${index + 1}`}>
              <span className="process-number">{step.number}</span>
              <div className="process-copy">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          </motion.li>
        ))}
      </ol>
      </div>
    </section>
  )
}

export default PhotographicProcess
