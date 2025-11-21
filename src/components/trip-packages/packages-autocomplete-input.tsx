'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Search, X, Clock, DollarSign } from 'lucide-react'
import { useCallback, useMemo, useState, useRef, useEffect } from 'react'

import { cn } from '@/lib/utils'
import { destinations } from '@/data/destinations'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'

import 'flag-icons/css/flag-icons.min.css'

export function PackagesAutoCompleteInput() {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(-1)
  const [inputWidth, setInputWidth] = useState(0)

  const inputRef = useRef<HTMLInputElement | null>(null)
  const triggerRef = useRef<HTMLDivElement | null>(null)

  const router = useRouter()

  // Update popover width to match input
  useEffect(() => {
    if (triggerRef.current) {
      setInputWidth(triggerRef.current.offsetWidth)
    }
  }, [open])

  // Get full destination details for results
  const results = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return []
    return destinations.filter(d => {
      return (
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
      )
    })
  }, [searchQuery])

  // Show featured/popular destinations when input is empty and focused
  const featuredDestinations = useMemo(() => {
    return destinations.slice(0, 3) // Show top 3
  }, [])

  const openPopover = useCallback(() => {
    setOpen(true)
    setActiveIndex(-1)
  }, [])

  const closePopover = useCallback(() => {
    setOpen(false)
    setActiveIndex(-1)
  }, [])

  const navigateTo = useCallback(
    (id: string) => {
      closePopover()
      setSearchQuery('')
      router.push(`/details/${id}`)
    },
    [router, closePopover],
  )

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const displayResults = searchQuery.trim() ? results : featuredDestinations
    if (displayResults.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(i => Math.min(displayResults.length - 1, i + 1))
      setOpen(true)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(i => Math.max(-1, i - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const idx = activeIndex >= 0 ? activeIndex : 0
      const item = displayResults[idx]
      if (item) navigateTo(item.id)
    } else if (e.key === 'Escape') {
      closePopover()
    }
  }

  const displayResults = searchQuery.trim() ? results : featuredDestinations
  const showEmptyState = searchQuery.trim() && results.length === 0

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div ref={triggerRef} className="relative flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search destinations, countries, or explore..."
              className="pr-10 pl-10"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value)
                openPopover()
              }}
              onKeyDown={onKeyDown}
              aria-autocomplete="list"
              aria-controls="packages-autocomplete-list"
              aria-expanded={open}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 right-1 size-8 -translate-y-1/2"
                onClick={() => {
                  setSearchQuery('')
                  closePopover()
                  inputRef.current?.focus()
                }}
              >
                <X className="size-4" />
              </Button>
            )}
          </div>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          side="bottom"
          className="p-0"
          style={{ width: inputWidth || '100%' }}
          onOpenAutoFocus={e => e.preventDefault()}
        >
          <div className="max-h-[400px] overflow-auto">
            {showEmptyState ? (
              <div className="p-6 text-center">
                <Search className="text-muted-foreground mx-auto mb-3 size-10" />
                <p className="text-muted-foreground text-sm">
                  No destinations found for &quot;{searchQuery}&quot;
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  Try searching for a different destination or country
                </p>
              </div>
            ) : (
              <div>
                {!searchQuery.trim() && (
                  <div className="bg-muted/30 border-b px-4 py-2">
                    <p className="text-muted-foreground text-xs font-medium">
                      Popular Destinations
                    </p>
                  </div>
                )}
                <ul
                  id="packages-autocomplete-list"
                  role="listbox"
                  className="divide-y"
                >
                  {displayResults.map((destination, idx) => (
                    <li
                      key={destination.id}
                      role="option"
                      aria-selected={activeIndex === idx}
                      onMouseEnter={() => setActiveIndex(idx)}
                      onMouseLeave={() => setActiveIndex(-1)}
                      onClick={() => navigateTo(destination.id)}
                      className={cn(
                        'hover:bg-muted/50 cursor-pointer transition-colors',
                        activeIndex === idx ? 'bg-muted' : '',
                      )}
                    >
                      <div className="flex items-center gap-3 px-4 py-3">
                        {/* Destination Image */}
                        <div className="relative size-12 shrink-0 overflow-hidden rounded-md">
                          <Image
                            src={destination.image}
                            alt={destination.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>

                        {/* Destination Info */}
                        <div className="flex-1 overflow-hidden">
                          <div className="flex items-center gap-2">
                            <span
                              className={`fi fi-${destination.code.toLowerCase()} size-4 shrink-0`}
                            />
                            <h4 className="truncate text-sm font-semibold">
                              {destination.name}
                            </h4>
                          </div>
                          <p className="text-muted-foreground mt-0.5 truncate text-xs">
                            {destination.country}
                          </p>
                        </div>

                        {/* Price & Duration */}
                        <div className="flex flex-col items-end gap-1 text-right">
                          <div className="flex items-center gap-1">
                            <DollarSign className="size-3" />
                            <span className="text-sm font-semibold">
                              {destination.price}
                            </span>
                          </div>
                          <div className="text-muted-foreground flex items-center gap-1 text-xs">
                            <Clock className="size-3" />
                            <span>{destination.duration}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
