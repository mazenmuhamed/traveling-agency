'use client'

import { useMemo } from 'react'
import { Search, X } from 'lucide-react'

import { priceRanges } from '@/lib/constants'
import { destinations } from '@/data/destinations'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import 'flag-icons/css/flag-icons.min.css'

type Props = {
  searchQuery: string
  setSearchQuery: (value: string) => void
  selectedCountry: string | null
  setSelectedCountry: (value: string | null) => void
  priceRange: string | null
  setPriceRange: (value: string | null) => void
  filteredDestinations: typeof destinations
}

export function PackagesFilter({
  searchQuery,
  setSearchQuery,
  selectedCountry,
  setSelectedCountry,
  priceRange,
  setPriceRange,
  filteredDestinations,
}: Props) {
  // Get unique list of countries from destinations
  const countries = useMemo(() => {
    return Array.from(new Set(destinations.map(d => d.country))).sort()
  }, [])

  // Get country code by country name
  const getCountryCode = (countryName: string) => {
    const dest = destinations.find(d => d.country === countryName)
    return dest?.code.toLowerCase() || ''
  }

  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
        <Input
          type="text"
          placeholder="Search destinations..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="pr-10 pl-10"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-1 size-8 -translate-y-1/2"
            onClick={() => setSearchQuery('')}
          >
            <X className="size-4" />
          </Button>
        )}
      </div>

      {/* Country Filter */}
      <Select
        value={selectedCountry || 'all'}
        onValueChange={val => setSelectedCountry(val === 'all' ? null : val)}
      >
        <SelectTrigger className="w-[180px] max-sm:w-full">
          <SelectValue
            placeholder={
              selectedCountry ? (
                <>
                  <span
                    className={`fi fi-${getCountryCode(selectedCountry)} mr-2 size-4`}
                  />
                  {selectedCountry}
                </>
              ) : (
                'All Countries'
              )
            }
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Countries</SelectItem>
          {countries.map(country => (
            <SelectItem key={country} value={country}>
              <span className="flex items-center gap-2">
                <span
                  className={`fi fi-${getCountryCode(country)} mr-2 size-4`}
                />
                {country}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Price Filter */}
      <Select
        value={priceRange || 'all'}
        onValueChange={val => setPriceRange(val === 'all' ? null : val)}
      >
        <SelectTrigger className="w-[180px] max-sm:w-full">
          <SelectValue placeholder={priceRange || 'All Prices'} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Prices</SelectItem>
          {priceRanges.map(range => (
            <SelectItem key={range.label} value={range.label}>
              {range.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Active Filters Count */}
      {(selectedCountry || priceRange) && (
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="font-semibold">
            {filteredDestinations.length} results
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedCountry(null)
              setPriceRange(null)
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  )
}
