import { CollectionConfig } from 'payload'
import { moduleAccess, publicCreateOrModuleAccess, publicReadOrModuleAccess } from '../access/rbac'
import { verifyCaptcha } from '../utilities/validateCaptcha'

export const MentorshipBookings: CollectionConfig = {
  slug: 'mentorship-bookings',
  admin: {
    group: 'Leads',
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'appointmentDate', 'appointmentTime', 'status'],
    components: {
      beforeList: ['@/components/aashayein/MoveCreateButton'],
    }
  },
  access: {
    read: publicReadOrModuleAccess('mentorship-bookings'),
    create: publicCreateOrModuleAccess('mentorship-bookings'),
    update: moduleAccess('mentorship-bookings', 'update'),
    delete: moduleAccess('mentorship-bookings', 'delete'),
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { 
      name: 'phone', 
      type: 'text',
      required: true,
      validate: (val: string | null | undefined) => {
        if (!val) return 'Phone number is required'
        if (!/^\d{10}$/.test(val)) return 'Please enter a valid 10-digit mobile number'
        return true
      }
    },
    { 
      name: 'appointmentDate', 
      type: 'date', 
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'yyyy-MM-dd',
        }
      }
    }, // Date picker
    { 
      name: 'appointmentTime', 
      type: 'date', 
      required: true,
      admin: {
        date: {
          pickerAppearance: 'timeOnly',
          displayFormat: 'hh:mm a',
          timeIntervals: 5,
        }
      }
    }, // Time picker
    { name: 'sessionDuration', type: 'number', required: true, defaultValue: 5 },
    {
      name: 'status',
      type: 'select',
      options: ['pending', 'confirmed', 'cancelled'],
      defaultValue: 'pending',
    },
    { name: 'meetingLink', type: 'text' },
  ],
  endpoints: [
    {
      path: '/custom/availability',
      method: 'get',
      handler: async (req) => {
        const { searchParams } = new URL(req.url as string)
        const date = searchParams.get('date') // YYYY-MM-DD
        const durationStr = searchParams.get('duration') || '5'
        const duration = parseInt(durationStr, 10)

        if (!date) {
          return Response.json({ error: 'Date is required' }, { status: 400 })
        }

        // Fetch existing bookings for this date
        const existingBookingsResponse = await req.payload.find({
          collection: 'mentorship-bookings',
          where: {
            appointmentDate: { equals: date },
            status: { not_equals: 'cancelled' },
          },
          limit: 1000,
          depth: 0,
        })
        
        const existingBookings = existingBookingsResponse.docs

        // Generate all possible slots from 10:00 to 18:00
        const slots: string[] = []
        let currentHour = 10
        let currentMinute = 0
        const endHour = 18

        while (currentHour < endHour) {
          const hh = currentHour.toString().padStart(2, '0')
          const mm = currentMinute.toString().padStart(2, '0')
          const timeString = `${hh}:${mm}`
          
          // Check if this slot overlaps with any existing booking
          // For simplicity, we assume any booking overlapping the current slot makes it unavailable.
          // In a real app we'd convert times to minutes and check overlap.
          const currentSlotMins = currentHour * 60 + currentMinute
          const slotEndMins = currentSlotMins + duration

          let isAvailable = true
          for (const booking of existingBookings as any[]) {
            let bH, bM;
            const bTime = booking.appointmentTime
            if (typeof bTime === 'string' && bTime.includes(':')) {
              // Handle "HH:mm" or "HH:mm:ss"
              [bH, bM] = bTime.split(':').map(Number)
            } else {
              // Handle Date object/ISO string
              const bDate = new Date(bTime)
              bH = bDate.getHours()
              bM = bDate.getMinutes()
            }
            const bStartMins = bH * 60 + bM
            const bDuration = booking.sessionDuration || 5
            const bEndMins = bStartMins + bDuration

            // Overlap condition:
            // Math.max(start1, start2) < Math.min(end1, end2)
            if (Math.max(currentSlotMins, bStartMins) < Math.min(slotEndMins, bEndMins)) {
              isAvailable = false
              break
            }
          }

          if (isAvailable) {
            slots.push(timeString)
          }

          currentMinute += duration
          if (currentMinute >= 60) {
            currentHour += Math.floor(currentMinute / 60)
            currentMinute = currentMinute % 60
          }
        }

        return Response.json({ slots })
      },
    },
    {
      path: '/custom/book',
      method: 'post',
      handler: async (req) => {
        try {
          const body = await (req as any).json()
          const { name, email, phone, date, slotTime, duration, captcha } = body

          if (!name || !email || !date || !slotTime || !duration) {
            return Response.json({ error: 'Missing required fields' }, { status: 400 })
          }

          // Verify Captcha
          try {
            await verifyCaptcha(captcha)
          } catch (err: any) {
            return Response.json({ error: err.message || 'Captcha verification failed' }, { status: 400 })
          }

          const existingBooking = await req.payload.find({
            collection: 'mentorship-bookings',
            where: {
              and: [
                { appointmentDate: { equals: date } },
                { appointmentTime: { equals: new Date(`${date}T${slotTime}:00`).toISOString() } },
                { status: { not_equals: 'cancelled' } }
              ]
            },
            depth: 0,
          })

          if (existingBooking.docs.length > 0) {
            return Response.json({ error: 'Slot already booked' }, { status: 409 })
          }

          const newBooking = await req.payload.create({
            collection: 'mentorship-bookings',
            data: {
              name,
              email,
              phone,
              appointmentDate: new Date(date).toISOString(),
              appointmentTime: new Date(`${date}T${slotTime}:00`).toISOString(),
              sessionDuration: duration,
              status: 'pending',
            },
            req,
          })

          return Response.json({ success: true, booking: newBooking })
        } catch (error) {
          console.error('Booking error:', error)
          return Response.json({ error: 'Internal Server Error' }, { status: 500 })
        }
      },
    },
  ],
}
