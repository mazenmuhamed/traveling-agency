'use client'

import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import { useState } from 'react'
import {
  ArrowLeft,
  Calendar,
  Clock,
  Star,
  Users,
  Check,
  Globe,
  Heart,
  Share2,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { usePlacesStorage } from '@/hooks/use-places-storage'
import type { Destination } from '@/models/destination.model'

import { Button } from '@/components/ui/button'
import { BlurFade } from '@/components/animations/blur-fade'

import { BookingDialog } from './booking-dialog'
import { ActionTooltip } from './action-tooltip'

import 'flag-icons/css/flag-icons.min.css'

const packageIncludes = [
  'Expert local guides',
  'Premium accommodations',
  'All meals included',
  'Airport transfers',
  'Cultural activities',
  'Travel insurance',
]

const packageItinerary = [
  {
    day: 1,
    title: 'Arrival & Welcome',
    description:
      'Airport pickup, hotel check-in, and welcome dinner with orientation.',
  },
  {
    day: 2,
    title: 'Landmarks Tour',
    description: 'Guided tour of iconic sites with traditional lunch included.',
  },
  {
    day: 3,
    title: 'Local Experiences',
    description: 'Market visits, artisan workshops, and cultural activities.',
  },
]

export function PackageDetails({ destination }: { destination: Destination }) {
  const [openBookingDialog, setOpenBookingDialog] = useState(false)
  const { savePlace, removePlace, isPlaceSaved } = usePlacesStorage()

  function handleBookmark() {
    if (isPlaceSaved(destination.id)) {
      removePlace(destination.id)
    } else {
      savePlace(destination.id)
    }
  }

  // Copy to clipboard or use Web Share API
  function handleShare() {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => toast.success('Link copied to clipboard!'))
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Navigation */}
        <BlurFade delay={0.1}>
          <div className="mb-4 flex items-center justify-between">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="gap-2 rounded-full"
            >
              <Link href="/#features">
                <ArrowLeft className="size-4" />
                Back
              </Link>
            </Button>

            <div className="flex gap-2">
              <ActionTooltip
                tooltip={
                  isPlaceSaved(destination.id)
                    ? 'Remove from Favorites'
                    : 'Add to Favorites'
                }
              >
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full"
                  onClick={handleBookmark}
                >
                  <Heart
                    className={cn(
                      'size-4',
                      isPlaceSaved(destination.id) && 'fill-red-500',
                    )}
                  />
                </Button>
              </ActionTooltip>
              <ActionTooltip tooltip="Share">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={handleShare}
                >
                  <Share2 className="size-4" />
                </Button>
              </ActionTooltip>
            </div>
          </div>
        </BlurFade>

        {/* Hero Image */}
        <BlurFade delay={0.2}>
          <div className="relative mb-6 h-[300px] w-full overflow-hidden rounded-xl sm:h-[400px] lg:h-[450px]">
            <Image
              src={destination.image}
              alt={destination.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

            {/* Hero Content */}
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 backdrop-blur-sm">
                    <span
                      className={`fi fi-${destination.code.toLowerCase()} size-3 rounded-sm`}
                    />
                    <span className="text-xs font-semibold">
                      {destination.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 backdrop-blur-sm">
                    <Star className="size-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-semibold">4.9 (243)</span>
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                  {destination.name}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-white/90">
                  <div className="flex items-center gap-1.5">
                    <Clock className="size-4" />
                    <span>{destination.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="size-4" />
                    <span>2-8 people</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Globe className="size-4" />
                    <span>English guided</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Content Sections */}
          <div className="space-y-8 lg:col-span-2">
            {/* Overview */}
            <BlurFade delay={0.3}>
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {destination.description}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Embark on an unforgettable journey through{' '}
                  {destination.country}. Our expertly crafted itinerary ensures
                  you experience the best this destination has to offer.
                </p>
              </section>
            </BlurFade>

            {/* Highlights */}
            <BlurFade delay={0.4}>
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">What&apos;s Included</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {packageIncludes.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="text-primary size-4 shrink-0" />
                      <span className="text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </section>
            </BlurFade>

            {/* Itinerary */}
            <BlurFade delay={0.5}>
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">Itinerary</h2>
                <div className="space-y-4 px-2">
                  {packageItinerary.map((item, idx) => (
                    <div
                      key={idx}
                      className="border-primary/30 relative border-l-2 pb-4 pl-6"
                    >
                      <div className="border-background bg-primary text-primary-foreground absolute top-0 -left-3 flex size-6 items-center justify-center rounded-full border-2 text-xs font-bold">
                        {item.day}
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold">
                          Day {item.day}: {item.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </BlurFade>
          </div>

          {/* Booking Card - Desktop */}
          <BlurFade delay={0.6}>
            <div className="hidden lg:block">
              <div className="bg-card sticky top-6 rounded-xl border p-6 shadow-lg">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">
                        ${destination.price}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        per person
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="size-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">
                        4.9 (243 reviews)
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 border-t pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium">
                        {destination.duration}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Group Size</span>
                      <span className="font-medium">2-8 people</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Languages</span>
                      <span className="font-medium">English, Arabic</span>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => setOpenBookingDialog(true)}
                  >
                    <Calendar />
                    Book now
                  </Button>

                  <BookingDialog
                    open={openBookingDialog}
                    onOpenChange={setOpenBookingDialog}
                    destinationName={destination.name}
                    price={destination.price}
                  />

                  <div className="space-y-2 border-t pt-4">
                    {[
                      'Free cancellation (48hrs)',
                      'Instant confirmation',
                      'Secure payment',
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="text-primary mt-0.5 size-4 shrink-0" />
                        <span className="text-muted-foreground text-xs">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>

        {/* Mobile Booking Bar */}
        <div className="bg-background/95 fixed inset-x-0 bottom-0 z-50 border-t backdrop-blur-lg lg:hidden">
          <div className="flex items-center justify-between gap-4 px-4 py-3">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold">${destination.price}</span>
                <span className="text-muted-foreground text-xs">/person</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="size-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium">4.9 (243)</span>
              </div>
            </div>
            <Button
              size="lg"
              className="px-6"
              onClick={() => setOpenBookingDialog(true)}
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
