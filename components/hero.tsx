'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const slides = [
  { src: '/hero-slides/1.webp', mobileSrc: '/hero-slides/1-mobile.webp', alt: 'Salon interior view 1' },
  { src: '/hero-slides/2.webp', mobileSrc: '/hero-slides/2-mobile.webp', alt: 'Salon interior view 2' },
  { src: '/hero-slides/3.webp', mobileSrc: '/hero-slides/3-mobile.webp', alt: 'Salon interior view 3' },
  { src: '/hero-slides/4.webp', mobileSrc: '/hero-slides/4-mobile.webp', alt: 'Salon interior view 4' },
  { src: '/hero-slides/5.webp', mobileSrc: '/hero-slides/5-mobile.webp', alt: 'Salon interior view 5' },
  { src: '/hero-slides/6.webp', mobileSrc: '/hero-slides/6-mobile.webp', alt: 'Salon exterior view 6' },
] as const

function preloadSlide(index: number) {
  const slide = slides[index]
  if (!slide) return

  const mobile = window.matchMedia('(max-width: 768px)').matches
  const img = new window.Image()
  img.src = mobile ? slide.mobileSrc : slide.src
}

function HeroSlide({
  slide,
  visible,
  priority = false,
}: {
  slide: (typeof slides)[number]
  visible: boolean
  priority?: boolean
}) {
  return (
    <div
      className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
      style={{
        opacity: visible ? 1 : 0,
        willChange: 'opacity',
      }}
      aria-hidden={!visible}
    >
      <picture>
        <source media="(max-width: 768px)" srcSet={slide.mobileSrc} type="image/webp" />
        <img
          src={slide.src}
          alt={slide.alt}
          className="h-full w-full object-cover object-center"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          draggable={false}
        />
      </picture>
    </div>
  )
}

export function Hero() {
  const [offset, setOffset] = useState(0)
  const [activeSlide, setActiveSlide] = useState(0)
  const [loadedSlides, setLoadedSlides] = useState<Set<number>>(() => new Set([0]))

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * 0.4)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 4500)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const next = (activeSlide + 1) % slides.length
    preloadSlide(next)

    setLoadedSlides((current) => {
      if (current.has(next)) return current
      const updated = new Set(current)
      updated.add(next)
      return updated
    })
  }, [activeSlide])

  useEffect(() => {
    const idleCallback = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1200))
    const cancelIdleCallback = window.cancelIdleCallback ?? window.clearTimeout

    const id = idleCallback(() => {
      slides.forEach((_, index) => {
        if (index > 1) preloadSlide(index)
      })
    })

    return () => cancelIdleCallback(id)
  }, [])

  return (
    <section id="home" className="relative w-full min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translate3d(0, ${offset * -0.15}px, 0)`,
          willChange: 'transform',
        }}
      >
        {slides.map((slide, index) =>
          loadedSlides.has(index) ? (
            <HeroSlide
              key={slide.src}
              slide={slide}
              visible={index === activeSlide}
              priority={index === 0}
            />
          ) : null
        )}
      </div>

      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.14), rgba(0, 0, 0, 0.08))',
        }}
      />

      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, rgba(184, 165, 150, 0.1), transparent 50%), radial-gradient(circle at 80% 80%, rgba(184, 165, 150, 0.1), transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      <div className="relative h-screen flex items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full pl-0 sm:pl-4 lg:pl-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="mb-6"
          >
            <span className="inline-block bg-amber-500/20 border border-amber-500/40 text-amber-400 px-4 py-1.5 rounded-full text-sm font-medium tracking-wide">
              Premium Hair Studio in Pune
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="text-4xl sm:text-5xl lg:text-7xl font-light text-white mb-6 tracking-tight leading-[1.1] text-balance"
            style={{
              fontFamily: "'Playfair Display', serif",
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.4)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
            }}
          >
            Redefine Your Style with{' '}
            <span className="text-amber-300" style={{ fontStyle: 'italic' }}>
              Expert Hair Artistry
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            className="text-base sm:text-lg text-white/95 mb-8 leading-relaxed max-w-2xl font-light"
            style={{
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.4)',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '0.01em',
            }}
          >
            Experience precision cuts, luxury treatments, and personalized styling tailored just for you at VM Hair Studio.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#contact"
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-black px-6 py-3 rounded-lg font-semibold hover:from-amber-400 hover:to-amber-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 text-center"
            >
              Book Appointment
            </a>
            <a
              href="#services"
              className="border-2 border-white/80 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm text-center"
            >
              Explore Services
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-8 sm:left-1/2 sm:transform sm:-translate-x-1/2"
      >
        <div className="text-white/60 text-center">
          <p className="text-xs uppercase tracking-widest mb-3">Scroll to explore</p>
          <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  )
}
