import { notFound } from 'next/navigation'

import { destinations } from '@/data/destinations'

import { PackageDetails } from '@/components/package-details'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params

  const destination = destinations.find(dest => dest.id === id)

  if (!destination) {
    return {
      title: 'Package Not Found',
      description: 'The requested trip package could not be found.',
    }
  }

  return {
    title: `${destination.name} - Travel Package Details`,
    description: `Explore the details of our exclusive travel package to ${destination.name}, including itinerary, pricing, and more.`,
    keywords: ['travel', 'package', destination.name, destination.country],
  }
}

export default async function PackageDetailsPage({ params }: Props) {
  const { id } = await params

  const destination = destinations.find(dest => dest.id === id)

  if (!destination) return notFound()

  return <PackageDetails destination={destination} />
}
