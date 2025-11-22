'use client'

import { motion } from 'motion/react'
import { Button } from './ui/button'
import { Heart } from 'lucide-react'
import { ActionTooltip } from './action-tooltip'
import Link from 'next/link'

export function FAB() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 1, ease: 'easeInOut' }}
      className="fixed right-6 bottom-6 z-50"
    >
      <ActionTooltip tooltip="Your favorites">
        <Button asChild size="icon-lg" className="size-12 rounded-full">
          <Link href="/saved">
            <Heart className="size-6 fill-current" />
          </Link>
        </Button>
      </ActionTooltip>
    </motion.div>
  )
}
