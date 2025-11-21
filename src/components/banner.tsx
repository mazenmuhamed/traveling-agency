'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { ArrowRight, Pause, Play, Star } from 'lucide-react'

import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { BlurFade } from '@/components/animations/blur-fade'
import { TextAnimate } from '@/components/animations/text-animate'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

const reviews = {
  count: 200,
  rating: 5.0,
  avatars: [
    { src: '/assets/avatars/avatar-1.webp', alt: 'Avatar 1' },
    { src: '/assets/avatars/avatar-2.webp', alt: 'Avatar 2' },
    { src: '/assets/avatars/avatar-3.webp', alt: 'Avatar 3' },
    { src: '/assets/avatars/avatar-4.webp', alt: 'Avatar 4' },
    { src: '/assets/avatars/avatar-5.webp', alt: 'Avatar 5' },
  ],
}

export function Banner() {
  const [playVideo, setPlayVideo] = useState(true)

  const videoRef = useRef<HTMLVideoElement>(null)

  const handleScrollToPackages = function () {
    const packagesSection = document.getElementById('features') as HTMLElement
    if (!packagesSection) return
    packagesSection.scrollIntoView({ behavior: 'smooth' })
  }

  const handleControlVideo = function () {
    if (!videoRef.current) return

    if (playVideo) videoRef.current.pause()
    else videoRef.current.play()

    setPlayVideo(prev => !prev)
  }

  return (
    <header className="container mx-auto px-4 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            alt="background"
            src="/assets/square-alt-grid.svg"
            fill
            loading="eager"
            sizes="100vw"
            priority
            className="size-full mask-[radial-gradient(75%_75%_at_center,white,transparent)] object-cover"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Main Content Grid */}
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            {/* Left Content */}
            <div className="flex flex-col space-y-6 text-center lg:text-left">
              {/* Badge */}
              <BlurFade direction="down" delay={0.1}>
                <div className="mb-6 flex justify-center lg:justify-start">
                  <button
                    className="hover:bg-background dark:hover:border-t-border bg-background group flex w-fit items-center gap-3 rounded-full border p-1 pl-4 shadow-sm transition-all duration-300 hover:shadow-md"
                    onClick={handleScrollToPackages}
                  >
                    <span className="text-foreground text-xs font-medium sm:text-sm">
                      ✈️ Start Your Next Adventure
                    </span>
                    <span className="bg-border block h-3 w-0.5"></span>
                    <div className="bg-background group-hover:bg-muted size-5 overflow-hidden rounded-full transition-all duration-300">
                      <div className="flex w-10 -translate-x-1/2 transition-transform duration-300 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-5">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                        <span className="flex size-5">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                      </div>
                    </div>
                  </button>
                </div>
              </BlurFade>

              <BlurFade direction="up" delay={0.15}>
                <Logo className="mx-auto w-12 sm:w-14 lg:mx-0" />
              </BlurFade>

              <div className="space-y-5">
                <TextAnimate
                  once
                  as="h1"
                  startOnView={false}
                  animation="blurInUp"
                  className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
                >
                  Discover Your Dream Destination
                </TextAnimate>
                <TextAnimate
                  once
                  as="p"
                  by="word"
                  delay={0.3}
                  startOnView={false}
                  animation="blurIn"
                  className="text-muted-foreground mx-auto max-w-xl text-base leading-relaxed max-sm:text-sm sm:text-lg lg:mx-0 lg:text-xl"
                >
                  Explore breathtaking destinations around the world with our
                  carefully curated travel packages.
                </TextAnimate>
              </div>

              <BlurFade direction="up" delay={0.4}>
                <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4 lg:justify-start">
                  <Button
                    size="lg"
                    className="rounded-full px-8 text-base font-medium shadow-lg transition-all hover:shadow-xl max-sm:text-[15px]"
                    onClick={handleScrollToPackages}
                  >
                    Explore Packages
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="hover:bg-accent rounded-full px-8 text-base font-medium transition-all max-sm:text-[15px]"
                  >
                    <Link href="/about">Learn More</Link>
                  </Button>
                </div>
              </BlurFade>

              <BlurFade direction="up" delay={0.5}>
                <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row lg:justify-start">
                  <div className="flex items-center -space-x-3">
                    {reviews.avatars.map((avatar, index) => (
                      <Avatar
                        key={index}
                        className="border-background ring-background size-11 border-2 ring-2"
                      >
                        <AvatarImage src={avatar.src} alt={avatar.alt} />
                      </Avatar>
                    ))}
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="flex items-center justify-center gap-1 sm:justify-start">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className="size-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                      <span className="ml-1 text-sm font-semibold">
                        {reviews.rating?.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm font-medium">
                      from {reviews.count}+ happy travelers
                    </p>
                  </div>
                </div>
              </BlurFade>
            </div>

            {/* Right Video */}
            <BlurFade direction="up" delay={0.3}>
              <div className="relative aspect-square overflow-hidden rounded-3xl shadow-2xl sm:aspect-video lg:aspect-square">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-10 bg-linear-to-t from-black/30 via-transparent to-transparent"
                />
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-16 rounded-full bg-white/20 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/30"
                    onClick={handleControlVideo}
                  >
                    {playVideo ? (
                      <Pause className="size-8 text-white" />
                    ) : (
                      <Play className="ml-1 size-8 text-white" />
                    )}
                  </Button>
                </div>
                <video
                  loop
                  muted
                  playsInline
                  autoPlay
                  ref={videoRef}
                  preload="auto"
                  className="h-full w-full object-cover"
                >
                  <source
                    src="/assets/videos/banner-video.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>
    </header>
  )
}
