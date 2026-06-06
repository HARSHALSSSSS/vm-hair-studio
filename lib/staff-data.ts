// Staff data management with local storage persistence

export interface StaffMember {
  id: string
  name: string
  role: string
  specialty: string
  experience: number
  image?: string
}

const STAFF_STORAGE_KEY = 'salon_staff'

const DEFAULT_STAFF: StaffMember[] = [
  {
    id: '1',
    name: 'VM - Creative Director',
    role: 'Hair Stylist',
    specialty: 'Color & Highlights',
    experience: 8,
  },
  {
    id: '2',
    name: 'Priya Sharma',
    role: 'Senior Stylist',
    specialty: 'Cutting & Styling',
    experience: 6,
  },
  {
    id: '3',
    name: 'Anjali Patel',
    role: 'Stylist',
    specialty: 'Treatments',
    experience: 4,
  },
  {
    id: '4',
    name: 'Neha Gupta',
    role: 'Beautician',
    specialty: 'Skin Care',
    experience: 5,
  },
]

export const staffData = {
  // Get all staff members
  getAllStaff: (): StaffMember[] => {
    if (typeof window === 'undefined') return DEFAULT_STAFF

    try {
      const data = localStorage.getItem(STAFF_STORAGE_KEY)
      return data ? JSON.parse(data) : DEFAULT_STAFF
    } catch {
      return DEFAULT_STAFF
    }
  },

  // Get staff member by ID
  getStaffById: (id: string): StaffMember | undefined => {
    return staffData.getAllStaff().find((staff) => staff.id === id)
  },

  // Add new staff member
  addStaff: (staff: Omit<StaffMember, 'id'>): StaffMember => {
    const newStaff: StaffMember = {
      ...staff,
      id: Date.now().toString(),
    }

    if (typeof window !== 'undefined') {
      const allStaff = staffData.getAllStaff()
      allStaff.push(newStaff)
      localStorage.setItem(STAFF_STORAGE_KEY, JSON.stringify(allStaff))
    }

    return newStaff
  },

  // Update staff member
  updateStaff: (id: string, updates: Partial<StaffMember>): StaffMember | null => {
    if (typeof window === 'undefined') return null

    const allStaff = staffData.getAllStaff()
    const index = allStaff.findIndex((staff) => staff.id === id)

    if (index === -1) return null

    const updated = { ...allStaff[index], ...updates, id }
    allStaff[index] = updated
    localStorage.setItem(STAFF_STORAGE_KEY, JSON.stringify(allStaff))

    return updated
  },

  // Delete staff member
  deleteStaff: (id: string): boolean => {
    if (typeof window === 'undefined') return false

    const allStaff = staffData.getAllStaff()
    const filtered = allStaff.filter((staff) => staff.id !== id)

    if (filtered.length === allStaff.length) return false

    localStorage.setItem(STAFF_STORAGE_KEY, JSON.stringify(filtered))
    return true
  },
}
