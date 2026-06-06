'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface TeamMember {
  id: string
  name: string
  designation: string
  specialty: string
  bio: string
  image: string | null
}

const TEAM_STORAGE_KEY = 'viraaj_team_members'

const DEFAULT_TEAM: TeamMember[] = [
  {
    id: '1',
    name: 'Sophie Laurent',
    designation: 'Senior Stylist',
    specialty: 'Color & Styling Specialist',
    bio: 'Award-winning colorist with 12+ years of experience in advanced techniques and creative color design.',
    image: null,
  },
  {
    id: '2',
    name: 'Marcus Chen',
    designation: 'Creative Director',
    specialty: 'Master Stylist & Mentor',
    bio: 'Founder & creative director. Specializes in precision cuts and transformative style consultations.',
    image: null,
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    designation: 'Bridal Specialist',
    specialty: 'Bridal & Event Specialist',
    bio: 'Expert in creating stunning bridal looks and special occasion styling for unforgettable moments.',
    image: null,
  },
  {
    id: '4',
    name: 'James Mitchell',
    designation: 'Grooming Expert',
    specialty: "Men's Grooming Expert",
    bio: "Certified in men's barbering and grooming with a passion for classic and modern styles.",
    image: null,
  },
]

export default function ManageTeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    specialty: '',
    bio: '',
    image: null as string | null,
  })

  useEffect(() => {
    const stored = localStorage.getItem(TEAM_STORAGE_KEY)
    if (stored) {
      setTeamMembers(JSON.parse(stored))
    } else {
      setTeamMembers(DEFAULT_TEAM)
      localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(DEFAULT_TEAM))
    }
  }, [])

  const saveToStorage = (members: TeamMember[]) => {
    localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(members))
    setTeamMembers(members)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingMember) {
      const updated = teamMembers.map((m) =>
        m.id === editingMember.id
          ? { ...m, ...formData }
          : m
      )
      saveToStorage(updated)
      setSuccessMessage('Team member updated successfully!')
    } else {
      const newMember: TeamMember = {
        id: Date.now().toString(),
        ...formData,
      }
      saveToStorage([...teamMembers, newMember])
      setSuccessMessage('Team member added successfully!')
    }

    resetForm()
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member)
    setFormData({
      name: member.name,
      designation: member.designation,
      specialty: member.specialty,
      bio: member.bio,
      image: member.image,
    })
    setIsAddingNew(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this team member?')) {
      const filtered = teamMembers.filter((m) => m.id !== id)
      saveToStorage(filtered)
      setSuccessMessage('Team member removed successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    }
  }

  const resetForm = () => {
    setFormData({ name: '', designation: '', specialty: '', bio: '', image: null })
    setEditingMember(null)
    setIsAddingNew(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-light text-foreground">Manage Team</h1>
            <p className="text-muted-foreground mt-1">Add, edit, or remove team members</p>
          </div>
          <Link
            href="/"
            className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Site
          </Link>
        </div>

        {/* Success Message */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-600"
            >
              {successMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add New Button */}
        {!isAddingNew && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsAddingNew(true)}
            className="w-full mb-8 p-4 border-2 border-dashed border-primary/30 rounded-xl text-primary hover:border-primary hover:bg-primary/5 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Team Member
          </motion.button>
        )}

        {/* Form */}
        <AnimatePresence>
          {isAddingNew && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleSubmit}
              className="mb-8 p-6 bg-card border border-border rounded-xl shadow-sm overflow-hidden"
            >
              <h2 className="text-xl font-light text-foreground mb-6">
                {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Photo Upload */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Photo
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-muted flex items-center justify-center border-2 border-border">
                      {formData.image ? (
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl text-muted-foreground">
                          {formData.name ? getInitials(formData.name) : '?'}
                        </span>
                      )}
                    </div>
                    <div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label
                        htmlFor="photo-upload"
                        className="cursor-pointer inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
                      >
                        Upload Photo
                      </label>
                      {formData.image && (
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, image: null })}
                          className="ml-2 text-sm text-destructive hover:text-destructive/80"
                        >
                          Remove
                        </button>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        Recommended: Square image, at least 300x300px
                      </p>
                    </div>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    placeholder="Enter full name"
                  />
                </div>

                {/* Designation */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Designation *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    placeholder="e.g., Senior Stylist, Creative Director"
                  />
                </div>

                {/* Specialty */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Specialty *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    placeholder="e.g., Color & Highlights, Bridal Styling, Men's Grooming"
                  />
                </div>

                {/* Bio */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                    placeholder="A brief description about this team member..."
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  {editingMember ? 'Update Member' : 'Add Member'}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Team Members List */}
        <div className="space-y-4">
          <h2 className="text-xl font-light text-foreground mb-4">Current Team Members</h2>
          
          {teamMembers.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No team members yet. Add your first team member above.
            </div>
          ) : (
            <div className="grid gap-4">
              {teamMembers.map((member) => (
                <motion.div
                  key={member.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-card border border-border rounded-xl flex items-center gap-4 hover:shadow-md transition-shadow"
                >
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-muted flex-shrink-0 flex items-center justify-center">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xl text-muted-foreground font-light">
                        {getInitials(member.name)}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate">{member.name}</h3>
                    <p className="text-sm text-primary truncate">{member.designation}</p>
                    <p className="text-sm text-muted-foreground truncate">{member.specialty}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleEdit(member)}
                      className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                      title="Edit"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all"
                      title="Delete"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 p-4 bg-muted/50 rounded-xl">
          <h3 className="text-sm font-medium text-foreground mb-2">Note</h3>
          <p className="text-sm text-muted-foreground">
            Changes made here are saved to your browser&apos;s local storage. To see updates on the main site, 
            refresh the homepage after making changes. The team section will display the updated information.
          </p>
        </div>
      </div>
    </div>
  )
}
