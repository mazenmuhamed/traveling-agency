'use client'

import { useCallback, useState } from 'react'
import { CircleCheck, Sparkles } from 'lucide-react'

import { plans } from './plans'

import { Badge } from '@/components/ui/badge'
import { BlurFade } from '@/components/animations/blur-fade'
import { TextAnimate } from '@/components/animations/text-animate'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import { PricingContentCard } from './pricing-content-card'

export function PricingContent() {
  const [isYearly, setIsYearly] = useState(false)

  const calculateSavings = useCallback((monthly: string, yearly: string) => {
    const monthlyNum = parseFloat(monthly.replace('$', ''))
    const yearlyNum = parseFloat(yearly.replace('$', ''))

    if (monthlyNum === 0) return 0

    const yearlyCost = monthlyNum * 12
    const savings = Math.round(((yearlyCost - yearlyNum) / yearlyCost) * 100)
    return savings
  }, [])

  return (
    <section className="py-14 max-md:px-6 max-sm:px-5">
      <div className="container mx-auto">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 text-center md:gap-10">
          {/* Header */}
          <BlurFade inView direction="up" delay={0.1}>
            <div className="space-y-4">
              <Badge variant="secondary" className="px-4 py-1.5">
                <Sparkles className="mr-2 size-3" />
                Pricing Plans
              </Badge>
              <TextAnimate
                once
                startOnView={false}
                as="h2"
                animation="blurInUp"
                className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl"
              >
                Choose Your Adventure
              </TextAnimate>
              <TextAnimate
                once
                startOnView={false}
                as="p"
                by="word"
                delay={0.2}
                animation="blurIn"
                className="text-muted-foreground max-w-3xl text-lg lg:text-xl"
              >
                Select the perfect membership plan for your travel lifestyle and
                unlock exclusive benefits worldwide
              </TextAnimate>
            </div>
          </BlurFade>

          {/* Billing Toggle */}
          <BlurFade inView direction="up" delay={0.3}>
            <div className="bg-input/50 inline-flex h-9 rounded-md p-0.5">
              <RadioGroup
                value={isYearly ? 'on' : 'off'}
                onValueChange={value => setIsYearly(value === 'on')}
                className="group after:bg-background has-focus-visible:after:border-ring has-focus-visible:after:ring-ring/50 relative inline-grid grid-cols-[1fr_1fr] items-center gap-0 text-sm font-medium after:absolute after:inset-y-0 after:w-1/2 after:rounded-sm after:shadow-xs after:transition-[translate,box-shadow] after:duration-300 after:ease-[cubic-bezier(0.16,1,0.3,1)] has-focus-visible:after:ring-[3px] data-[state=off]:after:translate-x-0 data-[state=on]:after:translate-x-full"
                data-state={isYearly ? 'on' : 'off'}
              >
                <label className="group-data-[state=on]:text-muted-foreground relative z-10 inline-flex h-full min-w-8 cursor-pointer items-center justify-center px-4 whitespace-nowrap transition-colors select-none">
                  Bill Monthly
                  <RadioGroupItem value="off" className="sr-only" />
                </label>
                <label className="group-data-[state=off]:text-muted-foreground relative z-10 inline-flex h-full min-w-8 cursor-pointer items-center justify-center px-4 whitespace-nowrap transition-colors select-none">
                  <span>
                    Bill Yearly{' '}
                    <span className="group-data-[state=off]:text-muted-foreground transition-colors group-data-[state=on]:text-emerald-500">
                      -20%
                    </span>
                  </span>
                  <RadioGroupItem value="on" className="sr-only" />
                </label>
              </RadioGroup>
            </div>
          </BlurFade>

          {/* Pricing Cards */}
          <div className="mt-12 grid w-full max-w-7xl gap-12 lg:grid-cols-3 lg:gap-8">
            {plans.map((plan, index) => {
              const savings = calculateSavings(
                plan.monthlyPrice,
                plan.yearlyPrice,
              )

              return (
                <BlurFade
                  key={plan.id}
                  inView
                  direction="up"
                  delay={0.4 + index * 0.1}
                >
                  <PricingContentCard
                    plan={plan}
                    isYearly={isYearly}
                    savings={savings}
                  />
                </BlurFade>
              )
            })}
          </div>

          {/* Trust Section */}
          <BlurFade inView direction="up">
            <div className="mt-16 flex flex-col items-center gap-6">
              <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <CircleCheck className="size-5 text-green-600 dark:text-green-400" />
                  <span>Flexible cancellation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CircleCheck className="size-5 text-green-600 dark:text-green-400" />
                  <span>24/7 travel support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CircleCheck className="size-5 text-green-600 dark:text-green-400" />
                  <span>Best price guarantee</span>
                </div>
              </div>

              <p className="text-muted-foreground max-w-2xl text-center">
                All membership plans include travel insurance, secure booking
                protection, and access to our exclusive partner network. Upgrade
                or modify your plan anytime to match your travel needs.
              </p>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  )
}
