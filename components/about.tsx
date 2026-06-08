'use client'

import { motion } from 'framer-motion'
import { fadeInUp, slideInLeft, slideInRight, sectionOverlapVariants, staggeredParagraphVariants, paragraphLineVariants, floatAnimation } from '@/lib/animations'

export function About() {
  return (
    <section id="about" className="pt-20 sm:pt-32 pb-20 sm:pb-32 bg-background relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl sm:text-5xl font-light text-foreground mb-4 tracking-tight"
            variants={staggeredParagraphVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            About VM Hair Studio
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
            variants={paragraphLineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Where artistry meets expertise. Since 2010, we&apos;ve been transforming
            lives through premium hair design and personalized beauty services.
          </motion.p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Brand Logo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-border/60 bg-[#0a0a0a] shadow-sm flex items-center justify-center p-8 sm:p-12"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/15 pointer-events-none" />
            <img
              src="/images/logo.jpeg"
              alt="VM Hair Studio Logo"
              className="relative z-10 w-[min(72%,240px)] sm:w-[min(68%,280px)] aspect-square rounded-full object-cover border-2 border-primary/30 shadow-lg"
            />
          </motion.div>

          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-light text-foreground mb-3">
                Our Philosophy
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                We believe every person deserves to feel confident and beautiful.
                Our team of expert stylists brings years of experience and
                artistic vision to every appointment, ensuring you leave feeling
                your absolute best.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-light text-foreground mb-3">
                What Sets Us Apart
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                From premium, sustainably-sourced products to our personalized
                consultation process, every detail is crafted to exceed
                expectations. We don&apos;t just cut hair—we create confidence.
              </p>
            </motion.div>

            <motion.div 
              className="pt-4 space-y-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <p className="text-foreground/70">Professional stylists with 50+ years combined expertise</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <p className="text-foreground/70">Premium, organic & sustainable hair products</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <p className="text-foreground/70">Personalized consultations & custom solutions</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8"
        >
          {[
            { number: '2K+', label: 'Happy Clients' },
            { number: '6+', label: 'Years in Business' },
            { number: '50+', label: 'Expert Hours' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-3xl sm:text-4xl font-light text-primary mb-2">{stat.number}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
