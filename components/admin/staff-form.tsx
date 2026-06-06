'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { StaffMember } from '@/lib/staff-data'

interface StaffFormProps {
  initialData?: StaffMember
  onSubmit: (data: Omit<StaffMember, 'id'>) => void
  onCancel: () => void
  isEditing?: boolean
}

export function StaffForm({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false,
}: StaffFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    role: initialData?.role || '',
    specialty: initialData?.specialty || '',
    experience: initialData?.experience || 0,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.role.trim()) newErrors.role = 'Role is required'
    if (!formData.specialty.trim()) newErrors.specialty = 'Specialty is required'
    if (formData.experience < 0) newErrors.experience = 'Experience cannot be negative'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    onSubmit({
      name: formData.name,
      role: formData.role,
      specialty: formData.specialty,
      experience: formData.experience,
    })

    setFormData({
      name: '',
      role: '',
      specialty: '',
      experience: 0,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card border border-border rounded-lg p-6 sm:p-8"
    >
      <h2 className="text-2xl font-light text-foreground mb-6">
        {isEditing ? 'Edit Staff Member' : 'Add New Staff Member'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 ${
              errors.name ? 'border-red-500' : 'border-border'
            }`}
            placeholder="Staff member name"
          />
          {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Role</label>
          <input
            type="text"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 ${
              errors.role ? 'border-red-500' : 'border-border'
            }`}
            placeholder="e.g., Hair Stylist, Beautician"
          />
          {errors.role && <p className="text-xs text-red-600 mt-1">{errors.role}</p>}
        </div>

        {/* Specialty */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Specialty</label>
          <input
            type="text"
            value={formData.specialty}
            onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 ${
              errors.specialty ? 'border-red-500' : 'border-border'
            }`}
            placeholder="e.g., Color & Highlights"
          />
          {errors.specialty && <p className="text-xs text-red-600 mt-1">{errors.specialty}</p>}
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Experience (Years)</label>
          <input
            type="number"
            min="0"
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) || 0 })}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 ${
              errors.experience ? 'border-red-500' : 'border-border'
            }`}
            placeholder="0"
          />
          {errors.experience && <p className="text-xs text-red-600 mt-1">{errors.experience}</p>}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-end pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 rounded-lg border border-border text-foreground hover:bg-background transition-all duration-300 font-light"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-light"
          >
            {isEditing ? 'Update' : 'Add'} Staff
          </button>
        </div>
      </form>
    </motion.div>
  )
}
