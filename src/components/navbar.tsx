'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Menu, X } from 'lucide-react'

import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', latest => {
    setIsExpanded(latest > 50 ? true : false)
  })

  const handleScrollToPackages = function () {
    const packagesSection = document.getElementById('features') as HTMLElement
    if (!packagesSection) return
    packagesSection.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Desktop & Tablet Navbar */}
      <motion.nav
        className="bg-accent sticky top-6 z-50 mx-auto my-6 hidden overflow-hidden rounded-full sm:block"
        initial={{ maxWidth: '32rem' }}
        animate={{ maxWidth: isExpanded ? '38rem' : '32rem' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="w-7" />
            <span className="text-lg font-semibold">Traveling Agency</span>
          </Link>
          <motion.div
            className="flex items-center gap-x-6"
            initial={{ x: isExpanded ? 0 : 115 }}
            animate={{ x: isExpanded ? 0 : 115 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <Link href="/about" className="font-medium">
              About
            </Link>
            <Link href="/pricing" className="font-medium">
              Pricing
            </Link>
            <motion.div
              key="button"
              initial={{ x: isExpanded ? 0 : 115, opacity: 0 }}
              animate={{ x: isExpanded ? 0 : 115, opacity: 1 }}
              exit={{ x: isExpanded ? 0 : 115, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              <Button
                asChild
                className="rounded-full text-base"
                onClick={handleScrollToPackages}
              >
                <Link href="/#features">Discover</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Navbar */}
      <nav className="bg-background sticky top-0 z-50 backdrop-blur-lg sm:hidden">
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="w-6" />
            <span className="font-semibold">Traveling Agency</span>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: isMobileMenuOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="space-y-1 border-t px-4 pt-2 pb-4">
            <Link
              href="/about"
              className="hover:bg-accent block rounded-lg px-3 py-2 font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/pricing"
              className="hover:bg-accent block rounded-lg px-3 py-2 font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Button
              asChild
              className="mt-2 w-full rounded-full"
              onClick={() => {
                setIsMobileMenuOpen(false)
                handleScrollToPackages()
              }}
            >
              <Link href="/#features">Discover</Link>
            </Button>
          </div>
        </motion.div>
      </nav>
    </>
  )
}
