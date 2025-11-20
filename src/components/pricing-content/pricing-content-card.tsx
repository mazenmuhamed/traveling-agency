import { CircleCheck, X } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface PricingFeature {
  text: string
  included: boolean
}

interface PricingPlan {
  id: string
  name: string
  description: string
  monthlyPrice: string
  yearlyPrice: string
  icon: React.ReactNode
  popular?: boolean
  badge?: string
  features: PricingFeature[]
  button: {
    text: string
    url: string
  }
}

interface PricingContentCardProps {
  plan: PricingPlan
  isYearly: boolean
  savings: number
}

export function PricingContentCard({
  plan,
  isYearly,
  savings,
}: PricingContentCardProps) {
  return (
    <Card
      className={cn(
        'relative flex flex-col justify-between text-left transition-all duration-300 hover:shadow-xl',
        plan.popular && 'border-primary z-10 scale-105 shadow-lg lg:scale-110',
      )}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <Badge className="from-primary bg-linear-to-r to-blue-600 px-4 py-1 text-white shadow-lg">
            {plan.badge}
          </Badge>
        </div>
      )}

      <CardHeader className="space-y-4 pb-6">
        {/* Plan Icon & Name */}
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex size-12 items-center justify-center rounded-xl',
              plan.id === 'free' && 'bg-yellow-500/10',
              plan.id === 'pro' && 'bg-blue-500/10',
              plan.id === 'enterprise' && 'bg-purple-500/10',
            )}
          >
            {plan.icon}
          </div>
          <CardTitle className="text-2xl">{plan.name}</CardTitle>
        </div>

        <p className="text-muted-foreground text-sm">{plan.description}</p>

        {/* Pricing */}
        <div className="flex items-end gap-2">
          <span className="text-5xl font-bold">
            {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
          </span>
          <span className="text-muted-foreground mb-1 text-xl font-medium">
            {isYearly ? '/year' : '/month'}
          </span>
        </div>

        {/* Savings Badge */}
        {isYearly && savings > 0 && (
          <Badge
            variant="secondary"
            className="w-fit bg-green-500/10 text-green-700 dark:text-green-400"
          >
            Save {savings}% with yearly billing
          </Badge>
        )}
      </CardHeader>

      <CardContent className="flex-1 space-y-6">
        <Separator />

        {/* Features List */}
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li
              key={index}
              className={cn(
                'flex items-start gap-3 text-sm',
                !feature.included && 'text-muted-foreground/50',
              )}
            >
              {feature.included ? (
                <CircleCheck className="mt-0.5 size-5 shrink-0 text-green-600 dark:text-green-400" />
              ) : (
                <X className="text-muted-foreground/30 mt-0.5 size-5 shrink-0" />
              )}
              <span className={!feature.included ? 'line-through' : ''}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="mt-auto pt-6">
        <Button
          asChild
          size="lg"
          variant="outline"
          className={cn(
            'w-full',
            plan.popular &&
              'from-primary text-primary-foreground! bg-linear-to-r to-blue-600 hover:opacity-90',
          )}
        >
          <a href={plan.button.url}>{plan.button.text}</a>
        </Button>
      </CardFooter>
    </Card>
  )
}
