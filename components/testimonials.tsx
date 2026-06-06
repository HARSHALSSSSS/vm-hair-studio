'use client'

import { motion, useAnimationControls } from 'framer-motion'
import { staggeredParagraphVariants, paragraphLineVariants } from '@/lib/animations'
import { useState, useRef, useEffect } from 'react'

const testimonials = [
  {
    id: 1,
    quote:
      "The best haircut I've ever had! The attention to detail and personalized service made all the difference.",
    author: 'Rahul Sharma',
    role: 'Business Owner',
  },
  {
    id: 2,
    quote:
      "VM Hair Studio transformed my look completely. The team really understands what works for each client.",
    author: 'Priya Patel',
    role: 'Marketing Manager',
  },
  {
    id: 3,
    quote:
      "Professional, friendly, and incredibly skilled. I won't go anywhere else for my grooming needs.",
    author: 'Amit Kumar',
    role: 'Software Engineer',
  },
  {
    id: 4,
    quote:
      "Amazing experience every time! The ambiance is great and the stylists are true professionals.",
    author: 'Sneha Desai',
    role: 'Entrepreneur',
  },
  {
    id: 5,
    quote:
      "Found my go-to salon! The quality of service and the warm hospitality keep me coming back.",
    author: 'Vikram Singh',
    role: 'Architect',
  },
  {
    id: 6,
    quote:
      "Exceptional service and stunning results. The team goes above and beyond for their clients.",
    author: 'Ananya Reddy',
    role: 'Doctor',
  },
]

export function Testimonials() {
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [duplicatedTestimonials] = useState([...testimonials, ...testimonials])

  return (
    <section className="py-20 sm:py-32 bg-background relative section-overlap overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl sm:text-5xl font-light text-foreground mb-4 tracking-tight"
            variants={staggeredParagraphVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            What Our Clients Say
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
            variants={paragraphLineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Real stories from real people who experienced the VM Hair Studio difference.
          </motion.p>
        </motion.div>
      </div>

      {/* Carousel Container */}
      <div 
        className="relative w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track */}
        <div 
          ref={containerRef}
          className="flex gap-6 py-4"
          style={{
            width: 'max-content',
          }}
        >
          <motion.div
            className="flex gap-6"
            animate={{
              x: isPaused ? undefined : [0, -50 * testimonials.length * 6.5],
            }}
            transition={{
              x: {
                duration: 30,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
            style={{
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            {duplicatedTestimonials.map((testimonial, idx) => (
              <motion.div
                key={`${testimonial.id}-${idx}`}
                className="flex-shrink-0 w-[350px] bg-card border border-border rounded-2xl p-6 shadow-sm cursor-pointer group"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                  borderColor: 'hsl(var(--primary))',
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {/* Quote Icon */}
                <div className="mb-4">
                  <svg 
                    className="w-8 h-8 text-primary/30 group-hover:text-primary/50 transition-colors duration-300" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 fill-amber-400 group-hover:fill-amber-500 transition-colors duration-300"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-foreground/80 leading-relaxed mb-6 text-sm group-hover:text-foreground transition-colors duration-300">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-sm font-medium text-primary group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Pause Indicator */}
      <motion.div
        className="flex justify-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <motion.div
            className={`w-2 h-2 rounded-full ${isPaused ? 'bg-amber-500' : 'bg-primary'}`}
            animate={{ scale: isPaused ? 1 : [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: isPaused ? 0 : Infinity }}
          />
          {isPaused ? 'Paused - Hover to explore' : 'Hover to pause'}
        </div>
      </motion.div>
    </section>
  )
}
