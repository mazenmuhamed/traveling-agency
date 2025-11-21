import z from 'zod'

export const packagesFilterSchema = z.object({
  selectedCountry: z.string().nullable().optional(),
  priceRange: z.string().nullable().optional(),
})

export type PackagesFilterSchema = z.infer<typeof packagesFilterSchema>
