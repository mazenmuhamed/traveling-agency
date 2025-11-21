import z from 'zod'

export const bookingSchema = z
  .object({
    name: z
      .string()
      .nonempty('Name is required')
      .min(2, 'Name is too short')
      .max(50, 'Name is too long'),
    email: z.email('Invalid email address').nonempty('Email is required'),
    numberOfTravelers: z
      .number()
      .min(1, 'At least one traveler is required')
      .max(10, 'Too many travelers'),
    startDate: z.date({ error: 'Start date is required' }),
    endDate: z.date({ error: 'End date is required' }),
  })
  .refine(
    data => data.endDate >= data.startDate,
    'End date must be after start date',
  )

export type BookingSchema = z.infer<typeof bookingSchema>
