import type { Metadata } from 'next'

import { Banner } from '@/components/banner'
import { TripPackages } from '@/components/trip-packages'

export const metadata: Metadata = {
  title: 'Traveling Agency | Explore cultures, places, and adventures',
  description:
    'Discover amazing places in the world with Traveling Agency. Plan your perfect getaway today!',
}

export default function HomePage() {
  return (
    <>
      <Banner />
      <TripPackages />
    </>
  )
}
