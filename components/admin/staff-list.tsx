'use client'

import { motion } from 'framer-motion'
import { StaffMember } from '@/lib/staff-data'

interface StaffListProps {
  staff: StaffMember[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function StaffList({ staff, onEdit, onDelete }: StaffListProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-card border border-border rounded-lg overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-background">
              <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Name</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Role</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Specialty</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Experience</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                  No staff members found. Add one to get started.
                </td>
              </tr>
            ) : (
              staff.map((member, idx) => (
                <motion.tr
                  key={member.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-border hover:bg-background transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-sm text-foreground font-light">{member.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{member.role}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{member.specialty}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{member.experience} years</td>
                  <td className="px-6 py-4 text-sm text-right space-x-2">
                    <button
                      onClick={() => onEdit(member.id)}
                      className="text-primary hover:text-primary/70 transition-colors duration-200 font-light"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(member.id)}
                      className="text-red-600 hover:text-red-700 transition-colors duration-200 font-light"
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
