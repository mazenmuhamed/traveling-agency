import type { Metadata } from 'next'
import { Globe, Compass, MapPin, Plane } from 'lucide-react'
import Link from 'next/link'

import { AboutDefaultValues, AboutWhyChooseUs } from '@/lib/constants'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BlurFade } from '@/components/animations/blur-fade'
import { TextAnimate } from '@/components/animations/text-animate'

export const metadata: Metadata = {
  title: 'About Us - Traveling Agency',
  description:
    'Discover our passion for creating unforgettable travel experiences around the world.',
}

export default function AboutPage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <BlurFade inView direction="up" delay={0.1}>
            <div className="mx-auto mb-12 max-w-4xl space-y-6 text-center sm:mb-16 lg:mb-20">
              <Badge variant="secondary" className="px-4 py-1.5 text-sm">
                <Plane className="mr-2 size-4" />
                Our Story
              </Badge>
              <TextAnimate
                once
                as="h1"
                startOnView={false}
                animation="blurInUp"
                className="text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl lg:text-6xl"
              >
                Creating Journeys That Transform Lives
              </TextAnimate>
              <TextAnimate
                once
                as="p"
                by="word"
                delay={0.2}
                startOnView={false}
                animation="blurIn"
                className="text-muted-foreground mx-auto max-w-3xl text-base leading-relaxed sm:text-lg"
              >
                For over a decade, we&apos;ve been turning travel dreams into
                reality. Every destination tells a story, and we&apos;re here to
                help you write yours with unforgettable experiences across the
                globe.
              </TextAnimate>
            </div>
          </BlurFade>

          {/* Values Section */}
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {AboutDefaultValues.map((value, idx) => {
              const Icon = value.icon
              return (
                <BlurFade
                  key={idx}
                  inView
                  direction="up"
                  delay={0.3 + idx * 0.1}
                >
                  <Card className="group hover:border-primary/50 relative h-full overflow-hidden border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8">
                    <div className="space-y-4">
                      <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex size-14 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-105">
                        <Icon className="size-7" />
                      </div>
                      <h3 className="text-xl font-bold sm:text-2xl">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                        {value.description}
                      </p>
                    </div>
                  </Card>
                </BlurFade>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative overflow-hidden py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade inView direction="up" delay={0.1}>
            <div className="mb-8 space-y-4 text-center sm:mb-12">
              <Badge variant="secondary" className="px-4 py-1.5">
                <MapPin className="mr-2 size-4" />
                Why Choose Us
              </Badge>
              <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
                Your Journey, Our Expertise
              </h2>
              <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg">
                Discover what makes us the preferred choice for travelers
                worldwide
              </p>
            </div>
          </BlurFade>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {AboutWhyChooseUs.map((item, idx) => {
              const Icon = item.icon
              return (
                <BlurFade
                  key={idx}
                  inView
                  direction="up"
                  delay={0.2 + idx * 0.1}
                >
                  <Card className="group hover:border-primary/50 relative h-full overflow-hidden border p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="space-y-4">
                      <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground mx-auto flex size-14 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-105">
                        <Icon className="size-7" />
                      </div>
                      <h3 className="text-base font-bold sm:text-lg">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </Card>
                </BlurFade>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade inView direction="up" delay={0.2}>
            <div className="bg-muted/30 relative overflow-hidden rounded-2xl border p-8 text-center shadow-lg sm:p-12 md:p-16">
              <div className="space-y-6 sm:space-y-8">
                <div className="space-y-4">
                  <Badge variant="secondary" className="px-4 py-1.5">
                    <Compass className="text-primary mr-2 size-4" />
                    Start Your Journey
                  </Badge>
                  <h3 className="text-2xl font-bold sm:text-3xl md:text-4xl">
                    Ready to Explore the World?
                  </h3>
                  <p className="text-muted-foreground mx-auto max-w-2xl text-base leading-relaxed sm:text-lg">
                    Let&apos;s turn your travel dreams into reality. Browse our
                    handpicked destinations and start planning an adventure
                    you&apos;ll never forget.
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button asChild size="lg" className="w-full px-8 sm:w-auto">
                    <Link href="/#features">
                      <Globe className="mr-2 size-5" />
                      Explore Destinations
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>
    </div>
  )
}
