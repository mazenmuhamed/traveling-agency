import type { Metadata } from 'next'
import Image from 'next/image'

import { SavedPlaces } from '@/components/saved-places'

export const metadata: Metadata = {
  title: 'Your saved places - Traveling Agency',
  description: 'Browse your saved favorite places on Traveling Agency.',
}

export default function SavedPage() {
  return (
    <section className="relative overflow-hidden py-8">
      <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
        <Image
          alt="background"
          src="/assets/square-alt-grid.svg"
          fill
          loading="eager"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="size-full mask-[radial-gradient(75%_75%_at_center,white,transparent)] object-cover opacity-90"
        />
      </div>
      <div className="relative z-10">
        <SavedPlaces />
      </div>
    </section>
  )
}
