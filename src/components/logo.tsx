import Image from 'next/image'

import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <>
      <Image
        src="/brand/logo.svg"
        alt="Logo"
        width={100}
        height={100}
        unoptimized
        priority
        className={cn('h-auto w-10 dark:hidden', className)}
      />
    </>
  )
}
