'use client'

import { useMemo } from 'react'
import { SearchX } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'

import { destinations } from '@/data/destinations'
import {
  packagesFilterSchema,
  type PackagesFilterSchema,
} from '@/validators/packages-filter.validator'

import { Form } from '@/components/ui/form'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BlurFade } from '@/components/animations/blur-fade'

import { PackageCard } from './package-card'
import { PackagesFilter } from './packages-filter'

import 'flag-icons/css/flag-icons.min.css'

export function TripPackages() {
  const searchParams = useSearchParams()

  const form = useForm<PackagesFilterSchema>({
    resolver: zodResolver(packagesFilterSchema),
    defaultValues: {
      selectedCountry: searchParams.get('country'),
      priceRange: (() => {
        const minPrice = searchParams.get('minPrice')
        const maxPrice = searchParams.get('maxPrice')
        return minPrice ? `${minPrice}-${maxPrice || ''}` : null
      })(),
    },
  })

  function handleSubmitForm(data: PackagesFilterSchema) {
    const params = new URLSearchParams(searchParams.toString())

    if (data.selectedCountry) {
      params.set('country', data.selectedCountry)
    } else {
      params.delete('country')
    }

    if (data.priceRange) {
      const [min, max] = data.priceRange.split('-')

      params.set('minPrice', min)

      if (max) params.set('maxPrice', max)
    } else {
      params.delete('minPrice')
      params.delete('maxPrice')
    }

    const queryString = params.toString()
    const newUrl = queryString ? `/?${queryString}` : '/'
    window.history.replaceState(null, '', newUrl)
  }

  const packages = useMemo(() => {
    const country = searchParams.get('country') || ''
    const minPrice = searchParams.get('minPrice') || ''
    const maxPrice = searchParams.get('maxPrice') || ''

    if (!country && !minPrice && !maxPrice) {
      return destinations
    }

    return destinations.filter(destination => {
      const matchesCountry = country ? destination.country === country : true

      const matchesPrice =
        minPrice || maxPrice
          ? destination.price >= +minPrice &&
            destination.price <= (maxPrice ? +maxPrice : Infinity)
          : true

      return matchesCountry && matchesPrice
    })
  }, [searchParams])

  function clearFilters() {
    form.reset({ selectedCountry: null, priceRange: null })
    window.history.replaceState(null, '', '/')
  }

  return (
    <section
      id="features"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <BlurFade direction="down" inView>
          <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center justify-center gap-4 text-center">
            <Badge
              variant="outline"
              className="border-primary/20 bg-primary/5 text-primary w-fit px-4 py-1.5 text-sm font-medium"
            >
              Popular Destinations
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Explore Dream Destinations
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
              Discover our handpicked collection of unforgettable travel
              experiences around the world
            </p>
          </div>
          {/* Search and Filters */}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitForm)}>
              <PackagesFilter
                control={form.control}
                resultsCount={packages.length}
                onClearFilters={clearFilters}
                haveFilters={
                  !!form.getValues('selectedCountry') ||
                  !!form.getValues('priceRange')
                }
              />
            </form>
          </Form>
        </BlurFade>

        {/* Grid or Empty State */}
        {packages.length > 0 ? (
          <div className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {packages.map((destination, index) => (
              <BlurFade key={destination.id} delay={0.1 + index * 0.05} inView>
                <PackageCard destination={destination} priority={index < 4} />
              </BlurFade>
            ))}
          </div>
        ) : (
          <BlurFade inView>
            <div className="bg-muted/30 mx-auto flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-16 text-center sm:py-24">
              <div className="bg-muted/50 mb-6 flex size-16 items-center justify-center rounded-full">
                <SearchX className="text-muted-foreground size-8" />
              </div>
              <h3 className="mb-2 text-2xl font-bold">No destinations found</h3>
              <p className="text-muted-foreground mb-6 max-w-md text-sm leading-relaxed sm:text-base">
                We couldn&apos;t find any destinations matching your search
                criteria. Try adjusting your filters or search term.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button onClick={clearFilters}>Show all destinations</Button>
              </div>
            </div>
          </BlurFade>
        )}
      </div>
    </section>
  )
}
