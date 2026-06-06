'use client'

import { motion } from 'framer-motion'
import { charVariants, textRevealVariants } from '@/lib/animations'

interface TextRevealProps {
  text: string
  className?: string
  variant?: 'chars' | 'lines' | 'words' | 'single'
  delay?: number
}

const wordVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
}

export function TextReveal({
  text,
  className = '',
  variant = 'chars',
  delay = 0,
}: TextRevealProps) {
  if (variant === 'chars') {
    return (
      <motion.span
        className={className}
        variants={textRevealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {text.split('').map((char, idx) => (
          <motion.span
            key={idx}
            variants={charVariants}
            style={{ display: 'inline-block' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.span>
    )
  }

  if (variant === 'words') {
    const words = text.split(' ')
    return (
      <motion.span className={className}>
        {words.map((word, idx) => (
          <motion.span
            key={idx}
            variants={wordVariants}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: delay + idx * 0.08 }}
            viewport={{ once: true }}
            style={{ display: 'inline-block', marginRight: '0.25em' }}
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    )
  }

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      {text}
    </motion.span>
  )
}
