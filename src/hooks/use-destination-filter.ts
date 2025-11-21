import { useMemo, useState } from 'react'

import { priceRanges } from '@/lib/constants'
import { destinations } from '@/data/destinations'

/**
 * Custom hook to manage destination filtering based on search query, country, and price range.
 * @deprecated Use react-hook-form in combination with URL search params instead.
 */
export function useDestinationFilter() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<string | null>(null)

  const filtteredDestinations = useMemo(() => {
    return destinations.filter(destination => {
      const matchesSearch =
        !searchQuery ||
        destination.name.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCountry =
        !selectedCountry || destination.country === selectedCountry

      let matchesPrice = true
      if (priceRange) {
        const range = priceRanges.find(r => r.label === priceRange)
        if (range) {
          matchesPrice =
            destination.price >= range.min && destination.price < range.max
        }
      }
      return matchesSearch && matchesCountry && matchesPrice
    })
  }, [searchQuery, selectedCountry, priceRange])

  function clearFilters() {
    setSearchQuery('')
    setSelectedCountry(null)
    setPriceRange(null)
  }

  return {
    searchQuery,
    setSearchQuery,
    selectedCountry,
    setSelectedCountry,
    priceRange,
    setPriceRange,
    destinations: filtteredDestinations,
    clearFilters,
  }
}
