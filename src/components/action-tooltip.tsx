'use client'

import { TooltipContentProps } from '@radix-ui/react-tooltip'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { cn } from '@/lib/utils'

type Props = {
  side?: TooltipContentProps['side']
  tooltip: string | undefined
  asChild?: boolean
  className?: string
  children?: React.ReactNode
  contentClassName?: string
}

export function ActionTooltip({
  side = 'top',
  children,
  tooltip,
  asChild,
  className,
  contentClassName,
}: Props) {
  return (
    <Tooltip>
      <TooltipTrigger asChild={asChild ?? true} className={className}>
        {children}
      </TooltipTrigger>
      <TooltipContent
        side={side}
        className={cn('select-none', contentClassName)}
      >
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  )
}
