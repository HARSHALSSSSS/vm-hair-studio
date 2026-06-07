'use client'

import { motion } from 'framer-motion'
import { fadeInUp, containerVariants, itemVariants, sectionOverlapVariants, staggeredParagraphVariants, paragraphLineVariants, floatAnimation } from '@/lib/animations'
import { useState, useEffect } from 'react'

interface TeamMember {
  id: string
  name: string
  designation: string
  specialty: string
  bio: string
  image: string | null
  isOwner?: boolean
}

const TEAM_STORAGE_KEY = 'viraaj_team_members_v2'

const OWNER: TeamMember = {
  id: 'owner',
  name: 'Viraaj Mhalaskar',
  designation: 'Owner',
  specialty: 'Unisex Hairdresser & Beautician | Master Stylist',
  bio: 'Founder of VM Hair Studio with years of expertise in hair styling and beauty. Passionate about creating stunning transformations and mentoring the next generation of stylists.',
  image: '/images/team/owner.jpeg',
  isOwner: true,
}

const DEFAULT_TEAM: TeamMember[] = [
  {
    id: '1',
    name: 'Anmol',
    designation: 'Mens Hairdresser',
    specialty: 'Hair Cutting & Styling',
    bio: "Passionate about creating fresh, trendy hairstyles. Specializes in precision cuts and modern men's styling techniques.",
    image: '/images/team/anmol.png',
  },
  {
    id: '2',
    name: 'Ashu',
    designation: 'Manager',
    specialty: 'Mens Hairdresser & Beautician',
    bio: "Skilled in men's haircuts, styling, and grooming. Dedicated to delivering sharp, modern looks with attention to detail.",
    image: '/images/team/ashu.png',
  },
  {
    id: '3',
    name: 'Sunil',
    designation: 'Unisex Hairdresser',
    specialty: 'All Hair Types & Styles',
    bio: "Versatile stylist skilled in both men's and women's haircuts. Creates personalized looks for every client.",
    image: '/images/team/sunil.png',
  },
]

const colors = [
  'from-primary/30 to-primary/20',
  'from-accent/30 to-accent/20',
  'from-muted/40 to-muted/30',
  'from-primary/25 to-accent/25',
]

export function Team() {
  const [activeBioId, setActiveBioId] = useState<string | null>(null)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(DEFAULT_TEAM)

  useEffect(() => {
    const stored = localStorage.getItem(TEAM_STORAGE_KEY)
    if (stored) {
      setTeamMembers(JSON.parse(stored))
    }
  }, [])

  return (
    <section id="team" className="py-20 sm:py-32 bg-background relative section-overlap">
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
            Meet Our Team
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
            variants={paragraphLineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Our passionate stylists are dedicated to delivering exceptional service
            and transforming your vision into reality.
          </motion.p>
        </motion.div>

        {/* Owner Featured Card */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <div className="relative max-w-4xl mx-auto">
            {/* Decorative background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-3xl blur-xl" />
            
            <div className="relative bg-card border border-primary/20 rounded-3xl overflow-hidden shadow-2xl">
              <div className="flex flex-col lg:flex-row">
                {/* Owner Image */}
                <div className="lg:w-1/2 relative">
                  <div className="aspect-[3/4] lg:aspect-auto lg:h-full">
                    <img
                      src={OWNER.image || ''}
                      alt={OWNER.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Gold badge */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-black px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-lg max-w-[calc(100%-1.5rem)]">
                    Founder & Owner
                  </div>
                </div>
                
                {/* Owner Info */}
                <div className="lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-foreground mb-2">
                        {OWNER.name}
                      </h3>
                      <p className="text-primary font-medium text-lg">
                        {OWNER.specialty}
                      </p>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {OWNER.bio}
                    </p>
                    
                    {/* Stats/Highlights */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-border">
                      <div className="text-center">
                        <div className="text-lg sm:text-2xl font-light text-primary">10+</div>
                        <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">Years Exp</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg sm:text-2xl font-light text-primary">5000+</div>
                        <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">Clients</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg sm:text-2xl font-light text-primary">Master</div>
                        <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">Certified</div>
                      </div>
                    </div>
                    
                    {/* Social Links */}
                    <div className="flex gap-4 pt-4">
                      <motion.a
                        href="https://www.instagram.com/vm.hairstudio?igsh=bWRqdjZ2ZjNrNHR5"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 bg-primary/10 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white px-4 py-2 rounded-full text-sm transition-all duration-300"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        Instagram
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Team Members Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-light text-foreground">Our Expert Team</h3>
          <div className="w-16 h-0.5 bg-primary mx-auto mt-3" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -150px 0px' }}
        >
          {teamMembers.map((member, idx) => {
            const getInitials = (name: string) => {
              return name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2)
            }
            
            return (
            <motion.div
              key={member.id}
              variants={itemVariants}
              onMouseEnter={() => setActiveBioId(member.id)}
              onMouseLeave={() => setActiveBioId(null)}
              onClick={() =>
                setActiveBioId((current) => (current === member.id ? null : member.id))
              }
              className="group cursor-pointer md:cursor-default"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative mb-6 overflow-hidden rounded-xl">
                {/* Avatar with image or gradient background */}
                <div
                  className={`w-full aspect-square flex items-center justify-center bg-gradient-to-br ${colors[idx % colors.length]} transition-all duration-500 transform ${
                    activeBioId === member.id ? 'scale-110' : 'scale-100'
                  }`}
                >
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-4xl font-light text-foreground/40">
                      {getInitials(member.name)}
                    </div>
                  )}
                </div>

                {/* Desktop hover overlay */}
                {activeBioId === member.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-primary/80 hidden md:flex items-center justify-center"
                  >
                    <div className="text-center text-white px-4">
                      <p className="text-sm font-light">{member.bio}</p>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="text-center">
                <h3 className="text-lg font-light text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
                  {member.designation}
                </p>
                <p className="text-sm text-accent font-light mb-3">
                  {member.specialty}
                </p>

                <p className="md:hidden text-sm text-muted-foreground leading-relaxed mb-3">
                  {member.bio}
                </p>

                {/* Social links (placeholder) */}
                <div className="flex justify-center gap-3">
                  {['instagram', 'facebook'].map((social) => (
                    <motion.button
                      key={social}
                      whileHover={{ scale: 1.2 }}
                      className="min-h-11 min-w-11 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-200"
                      aria-label={`Visit ${social}`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0z" />
                      </svg>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )})}
        </motion.div>
      </div>
    </section>
  )
}
