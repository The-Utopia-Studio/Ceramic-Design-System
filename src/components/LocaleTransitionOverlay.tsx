import { lazy, Suspense, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { Locale } from '../i18n'

const Lottie = lazy(() => import('lottie-react'))

export function LocaleTransitionOverlay({ nextLocale }: { nextLocale: Locale | null }) {
  const [animationData, setAnimationData] = useState<object | null>(null)

  useEffect(() => {
    let ignore = false

    fetch('/projects/utopia-locale-loader/scene-1/lottie.json')
      .then((response) => response.json())
      .then((data) => {
        if (!ignore) setAnimationData(data)
      })
      .catch(() => {
        if (!ignore) setAnimationData(null)
      })

    return () => {
      ignore = true
    }
  }, [])

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="locale-transition-overlay"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="locale-transition-card"
        exit={{ opacity: 0, scale: 0.98, y: -8 }}
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          aria-label={nextLocale === 'ar' ? 'The Utopia Studio Arabic transition' : 'The Utopia Studio English transition'}
          className="locale-transition-mark"
          role="img"
        >
          <Suspense fallback={<span className="locale-transition-fallback" aria-hidden="true">The Utopia Studio</span>}>
            {animationData ? <Lottie animationData={animationData} loop={false} /> : <span className="locale-transition-fallback" aria-hidden="true">The Utopia Studio</span>}
          </Suspense>
        </div>
      </motion.div>
    </motion.div>
  )
}
