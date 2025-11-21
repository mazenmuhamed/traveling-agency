'use client'

import { useMemo } from 'react'
import { Control } from 'react-hook-form'

import { priceRanges } from '@/lib/constants'
import { destinations } from '@/data/destinations'
import type { PackagesFilterSchema } from '@/validators/packages-filter.validator'

import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { PackagesAutoCompleteInput } from './packages-autocomplete-input'

import 'flag-icons/css/flag-icons.min.css'

type Props = {
  resultsCount: number
  haveFilters: boolean
  control: Control<PackagesFilterSchema>
  onClearFilters: VoidFunction
}

export function PackagesFilter({
  resultsCount,
  haveFilters,
  control,
  onClearFilters,
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
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
      {/* Search */}
      <PackagesAutoCompleteInput />

      {/* Country Filter */}
      <FormField
        control={control}
        name="selectedCountry"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Select
                value={field.value || 'all'}
                onValueChange={val => field.onChange(val === 'all' ? '' : val)}
              >
                <SelectTrigger className="w-[180px] max-sm:w-full">
                  <SelectValue
                    placeholder={
                      field.value ? (
                        <>
                          <span
                            className={`fi fi-${getCountryCode(field.value)} mr-2 size-4`}
                          />
                          {field.value}
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
            </FormControl>
          </FormItem>
        )}
      />

      {/* Price Filter */}
      <FormField
        control={control}
        name="priceRange"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Select
                value={field.value || 'all'}
                onValueChange={val => field.onChange(val === 'all' ? '' : val)}
              >
                <SelectTrigger className="w-[180px] max-sm:w-full">
                  <SelectValue placeholder={field.value || 'All Prices'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  {priceRanges.map(range => (
                    <SelectItem
                      key={range.label}
                      value={`${range.min}-${range.max === Infinity ? '' : range.max}`}
                    >
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />

      {/* Clear Filters Button */}
      <div className="flex items-center gap-x-2 max-sm:[&>button]:grow">
        <Button type="submit">Filter</Button>
        {haveFilters && (
          <div className="flex items-center gap-x-2">
            <Button variant="outline" onClick={onClearFilters}>
              Clear Filters
            </Button>
            <div className="bg-secondary flex items-center justify-center gap-1 rounded-full px-3 py-1.5 text-sm">
              <p>{resultsCount}</p>
              <p className="text-sm">results</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
