import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock, MapPin, Star } from 'lucide-react'

import type { Destination } from '@/models/destination.model'

import { Button } from '@/components/ui/button'

interface Props {
  destination: Destination
  priority?: boolean
}

export function PackageCard({ destination, priority }: Props) {
  return (
    <Link href={`/details/${destination.id}`} className="group block h-full">
      <article className="bg-card relative flex h-full flex-col overflow-hidden rounded-2xl shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
        {/* Image */}
        <div className="relative aspect-4/3 shrink-0 overflow-hidden">
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

          {/* Country Badge */}
          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
              <span
                className={`fi fi-${destination.code.toLowerCase()} size-3.5 rounded-sm`}
              />
              <span className="text-xs font-semibold">
                {destination.country}
              </span>
            </div>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1.5 shadow-lg backdrop-blur-sm">
              <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-bold">4.9</span>
            </div>
          </div>

          {/* Title Overlay */}
          <div className="absolute right-0 bottom-0 left-0 p-4">
            <h3 className="line-clamp-2 text-xl font-bold text-white transition-transform duration-300 group-hover:-translate-y-1 sm:text-2xl">
              {destination.name}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col space-y-4 p-5">
          <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
            {destination.description}
          </p>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-muted/50 flex items-center gap-2 rounded-lg px-3 py-2">
              <MapPin className="text-primary size-4 shrink-0" />
              <span className="truncate text-xs font-medium">
                {destination.country}
              </span>
            </div>
            <div className="bg-muted/50 flex items-center gap-2 rounded-lg px-3 py-2">
              <Clock className="text-primary size-4 shrink-0" />
              <span className="text-xs font-medium">
                {destination.duration}
              </span>
            </div>
          </div>

          {/* Price & CTA */}
          <div className="mt-auto flex items-center justify-between gap-3 pt-2">
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs">From</span>
              <span className="text-primary text-2xl font-bold">
                ${destination.price}
              </span>
            </div>
            <Button className="rounded-full font-semibold shadow-md transition-all hover:gap-2 hover:px-5">
              Book Now
              <ArrowRight />
            </Button>
          </div>
        </div>

        {/* Hover Border Effect */}
        <div className="border-primary absolute inset-0 rounded-2xl border-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </article>
    </Link>
  )
}
