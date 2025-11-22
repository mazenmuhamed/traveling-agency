'use client'

import Link from 'next/link'
import { Heart, Sparkles } from 'lucide-react'

import { usePlacesStorage } from '@/hooks/use-places-storage'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BlurFade } from '@/components/animations/blur-fade'

import { PackageCard } from './trip-packages/package-card'

export function SavedPlaces() {
  const { placesData } = usePlacesStorage()

  const handleScrollToPackages = function () {
    const packagesSection = document.getElementById('features') as HTMLElement
    if (!packagesSection) return
    packagesSection.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <BlurFade direction="down" inView>
          <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center justify-center gap-4 text-center">
            <div className="bg-primary/10 border-primary/20 flex size-16 items-center justify-center rounded-2xl border-2 backdrop-blur-sm">
              <Heart className="text-primary size-8 fill-current" />
            </div>
            <Badge
              variant="outline"
              className="border-primary/20 bg-primary/5 text-primary w-fit px-4 py-1.5 text-sm font-medium"
            >
              <Sparkles className="mr-1.5 size-3.5" />
              Your Collection
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Saved Destinations
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
              {placesData.length > 0
                ? `You have ${placesData.length} dream ${placesData.length === 1 ? 'destination' : 'destinations'} waiting to be explored`
                : 'Start building your travel wishlist by saving your favorite destinations'}
            </p>
          </div>
        </BlurFade>

        {/* Content */}
        {placesData.length > 0 ? (
          <div className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {placesData.map((destination, index) => (
              <BlurFade key={destination.id} delay={0.1 + index * 0.05} inView>
                <PackageCard destination={destination} />
              </BlurFade>
            ))}
          </div>
        ) : (
          <BlurFade inView>
            <div className="bg-muted/30 mx-auto flex w-full max-w-2xl flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-16 text-center sm:py-24">
              <div className="bg-muted/50 mb-6 flex size-20 items-center justify-center rounded-full">
                <Heart className="text-muted-foreground size-10" />
              </div>
              <h3 className="mb-2 text-2xl font-bold">
                No Saved Destinations Yet
              </h3>
              <p className="text-muted-foreground mb-8 max-w-md text-sm leading-relaxed sm:text-base">
                Start building your dream travel collection! Browse our amazing
                destinations and click the heart icon to save your favorites.
              </p>
              <Button asChild size="lg" className="rounded-full">
                <Link href="/#features">
                  <Sparkles className="mr-2 size-4" />
                  Explore Destinations
                </Link>
              </Button>
            </div>
          </BlurFade>
        )}

        {/* Footer Stats */}
        {placesData.length > 0 && (
          <BlurFade delay={0.4} inView>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/#features" onClick={handleScrollToPackages}>
                  <Sparkles />
                  Discover More
                </Link>
              </Button>
            </div>
          </BlurFade>
        )}
      </div>
    </section>
  )
}
