'use client'

import { motion } from 'framer-motion'
import { containerVariants, itemVariants, staggeredParagraphVariants, paragraphLineVariants } from '@/lib/animations'
import { pricingData } from '@/lib/pricing-data'
import { PricingModal } from './pricing-modal'
import { useState } from 'react'

const serviceCategories = [
  {
    id: 'haircuts',
    name: 'Haircuts',
    description: 'Professional haircuts for men and women',
    image: '/services/haircuts.jpg',
    subcategories: ['men_haircut', 'women_haircut'],
  },
  {
    id: 'hair_styling',
    name: 'Hair Styling',
    description: 'Ironing, tong, and professional styling services',
    image: '/services/styling.jpg',
    subcategories: ['hair_styling'],
  },
  {
    id: 'hair_color',
    name: 'Hair Color',
    description: 'Color services, highlights, balayage, and ombre',
    image: '/services/color.jpg',
    subcategories: ['men_hair_color', 'women_hair_color'],
  },
  {
    id: 'treatments',
    name: 'Hair Treatments',
    description: 'Spa, keratin, botox, and specialized treatments',
    image: '/services/treatments.jpg',
    subcategories: ['men_treatments', 'women_treatments'],
  },
  {
    id: 'skin_services',
    name: 'Skin Services',
    description: 'Facial, cleansing, D-tan, and skin treatments',
    image: '/services/skin.jpg',
    subcategories: ['skin_services'],
  },
  {
    id: 'waxing_threading',
    name: 'Waxing & Threading',
    description: 'Professional waxing and threading services',
    image: '/services/waxing.jpg',
    subcategories: ['men_waxing', 'women_waxing', 'threading'],
  },
  {
    id: 'nail_services',
    name: 'Nail Services',
    description: 'Extensions, polish, and nail art services',
    image: '/services/nails.jpg',
    subcategories: ['nail_services'],
  },
  {
    id: 'semi_permanent',
    name: 'Semi-Permanent',
    description: 'Microblading, lip tinting, and lash extensions',
    image: '/services/semi-permanent.jpg',
    subcategories: ['semi_permanent'],
  },
]

const getCategoryLabel = (categoryId: string) => {
  const labels: Record<string, string> = {
    men_haircut: "Men's Haircut",
    women_haircut: "Women's Haircut",
    hair_styling: 'Hair Styling',
    men_hair_color: "Men's Hair Color",
    women_hair_color: "Women's Hair Color",
    men_treatments: "Men's Treatments",
    women_treatments: "Women's Treatments",
    skin_services: 'Skin Services',
    men_waxing: "Men's Waxing",
    women_waxing: "Women's Waxing",
    threading: 'Threading',
    nail_services: 'Nail Services',
    semi_permanent: 'Semi-Permanent',
  }
  return labels[categoryId] || categoryId
}

export function Services() {
  const [selectedCategory, setSelectedCategory] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const renderPrice = (item: any) => {
    if (item.price) return `₹${item.price}`
    if (item.range) return `₹${item.range}`
    if (item.short && item.medium && item.long) {
      return `₹${item.short} - ₹${item.long}`
    }
    if (item.shoulder && item.below && item.waist) {
      return `₹${item.shoulder} - ₹${item.waist}`
    }
    if (item.without_art && item.with_art) {
      return `₹${item.without_art} - ₹${item.with_art}`
    }
    if (item.brand) return `₹${item.short} - ₹${item.long}`
    if (item['2inch'] && item['3inch'] && item['4inch']) {
      return `₹${item['2inch']} - ₹${item['4inch']}`
    }
    return 'Custom Quote'
  }

  return (
    <section id="services" className="py-20 sm:py-32 bg-background relative section-overlap">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="mb-16" 
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
            Our Services & Pricing
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground leading-relaxed max-w-2xl prose-light"
            variants={paragraphLineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Professional beauty and grooming services with transparent pricing tailored to every client.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -150px 0px' }}
        >
          {serviceCategories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="group"
            >
              <button
                onClick={() => {
                  setSelectedCategory(category)
                  setIsModalOpen(true)
                }}
                className="relative rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border/50 w-full text-left group aspect-video"
              >
                {/* Background Image - Fixed aspect ratio */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30" />

                {/* Content Overlay */}
                <div className="relative h-full p-6 sm:p-8 flex flex-col justify-between">
                  {/* Title and Description */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-light text-white mb-2 tracking-tight">
                      {category.name}
                    </h3>
                    <p className="text-sm sm:text-base text-white/90">
                      {category.description}
                    </p>
                  </div>

                  {/* Explore Services Button */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="self-start"
                  >
                    <span className="inline-block bg-accent text-accent-foreground px-5 py-2 rounded-lg font-light text-sm group-hover:bg-accent/90 transition-all duration-300 shadow-md group-hover:shadow-lg">
                      Explore Services
                    </span>
                  </motion.div>
                </div>
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a
            href="#contact"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-light text-base hover:bg-primary/90 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Book an Appointment
          </a>
        </motion.div>
      </div>

      {/* Pricing Modal */}
      <PricingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={selectedCategory}
        getCategoryLabel={getCategoryLabel}
        renderPrice={renderPrice}
      />
    </section>
  )
}
