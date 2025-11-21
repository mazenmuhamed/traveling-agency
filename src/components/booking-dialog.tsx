'use client'

import { format } from 'date-fns'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { CalendarIcon, Users, Mail, User, Check } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  bookingSchema,
  type BookingSchema,
} from '@/validators/booking.validator'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export function BookingDialog({
  open,
  onOpenChange,
  destinationName,
  price,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  destinationName?: string
  price?: number
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [bookingDetails, setBookingDetails] = useState<BookingSchema | null>(
    null,
  )

  const form = useForm<BookingSchema>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      email: '',
      numberOfTravelers: 1,
      startDate: undefined,
      endDate: undefined,
    },
  })

  async function handleFormSubmit(values: BookingSchema) {
    setIsSubmitting(true)

    // Simulate API call for 1.5 seconds
    await new Promise(resolve => setTimeout(resolve, 1500))

    setBookingDetails(values)
    setIsSubmitting(false)
    setIsSuccess(true)

    // Reset after showing success
    setTimeout(() => {
      setIsSuccess(false)
      setBookingDetails(null)
      form.reset()
      onOpenChange(false)
    }, 5000)
  }

  const { numberOfTravelers, startDate, endDate } = useWatch({
    control: form.control,
  })

  const calculateTotal = () => {
    if (!price || !numberOfTravelers) return 0
    return price * numberOfTravelers
  }

  const calculateDuration = () => {
    if (!startDate || !endDate) return 0
    const diff = endDate.getTime() - startDate.getTime()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-screen max-w-screen flex-col rounded-2xl px-0 max-sm:rounded-none max-sm:px-4 sm:max-h-[min(90vh,850px)] sm:max-w-2xl">
        <DialogHeader className="shrink-0 px-3 sm:px-6">
          <DialogTitle className="text-2xl font-bold">
            {isSuccess ? '🎉 Booking Confirmed!' : 'Book Your Adventure'}
          </DialogTitle>
          <DialogDescription>
            {isSuccess
              ? "Your booking request has been received. We'll send you a confirmation email shortly."
              : destinationName
                ? `Complete your booking for ${destinationName}`
                : 'Fill in your details to reserve your spot on this amazing journey'}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 overflow-auto">
          <div className="px-3 pb-4 sm:px-6">
            {!isSuccess ? (
              <Form {...form}>
                <form
                  id="booking-form"
                  className="space-y-6"
                  onSubmit={form.handleSubmit(handleFormSubmit)}
                >
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <div className="text-muted-foreground flex items-center gap-2 text-sm font-semibold">
                      <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-full text-xs">
                        1
                      </div>
                      Personal Information
                    </div>

                    <div className="grid gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                                <Input
                                  placeholder="John Doe"
                                  className="pl-9"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                                <Input
                                  type="email"
                                  placeholder="john@example.com"
                                  className="pl-9"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Travel Details */}
                  <div className="space-y-4">
                    <div className="text-muted-foreground flex items-center gap-2 text-sm font-semibold">
                      <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-full text-xs">
                        2
                      </div>
                      Travel Details
                    </div>

                    <FormField
                      control={form.control}
                      name="numberOfTravelers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Travelers</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Users className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                              <Input
                                type="number"
                                min={1}
                                max={10}
                                placeholder="1"
                                className="pl-9"
                                {...field}
                                onChange={e =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Maximum 10 travelers per booking
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Start Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      'w-full pl-3 text-left font-normal',
                                      !field.value && 'text-muted-foreground',
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, 'PPP')
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto size-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={date =>
                                    date <
                                    new Date(new Date().setHours(0, 0, 0, 0))
                                  }
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>End Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      'w-full pl-3 text-left font-normal',
                                      !field.value && 'text-muted-foreground',
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, 'PPP')
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto size-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={date => {
                                    const today = new Date()
                                    today.setHours(0, 0, 0, 0)
                                    if (date < today) return true
                                    if (startDate && date < startDate)
                                      return true
                                    return false
                                  }}
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Booking Summary */}
                  {price && numberOfTravelers && numberOfTravelers > 0 && (
                    <div className="bg-muted/50 rounded-lg border p-4">
                      <h3 className="mb-3 font-semibold">Booking Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Price per person
                          </span>
                          <span className="font-medium">${price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Number of travelers
                          </span>
                          <span className="font-medium">
                            {numberOfTravelers}
                          </span>
                        </div>
                        {startDate && endDate && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Duration
                            </span>
                            <span className="font-medium">
                              {calculateDuration()} days
                            </span>
                          </div>
                        )}
                        <div className="border-t pt-2" />
                        <div className="flex justify-between text-base">
                          <span className="font-semibold">Total Price</span>
                          <span className="text-primary text-lg font-bold">
                            ${calculateTotal()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </Form>
            ) : (
              <BookingConfirmation
                details={bookingDetails!}
                destinationName={destinationName || ''}
                destinationPrice={price || 0}
                handleClose={() => {
                  form.reset()
                  setIsSuccess(false)
                  setBookingDetails(null)
                  onOpenChange(false)
                }}
              />
            )}
          </div>
        </ScrollArea>
        <DialogFooter className="shrink-0">
          {/* Action Buttons */}
          <div className="flex gap-3 px-6">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              form="booking-form"
              type="submit"
              className="flex-1"
              disabled={isSubmitting || !form.formState.isDirty}
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Processing...
                </>
              ) : (
                'Confirm Booking'
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

type BookingConfirmationProps = {
  details: BookingSchema
  handleClose: VoidFunction
  destinationName: string
  destinationPrice: number
}

function BookingConfirmation({
  details,
  handleClose,
  destinationName,
  destinationPrice,
}: BookingConfirmationProps) {
  return (
    <div className="space-y-6 py-4">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
          <Check className="size-8 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="mb-2 text-lg font-semibold">Booking Confirmed!</h3>
        <p className="text-muted-foreground text-center text-sm">
          Your booking has been successfully submitted
        </p>
      </div>

      {details && (
        <div className="bg-muted/30 space-y-4 rounded-lg border p-4">
          <h4 className="font-semibold">Booking Details</h4>

          <div className="space-y-3">
            <div className="flex items-start justify-between border-b pb-2">
              <span className="text-muted-foreground text-sm">Name</span>
              <span className="font-medium">{details.name}</span>
            </div>

            <div className="flex items-start justify-between border-b pb-2">
              <span className="text-muted-foreground text-sm">Email</span>
              <span className="font-medium">{details.email}</span>
            </div>

            {destinationName && (
              <div className="flex items-start justify-between border-b pb-2">
                <span className="text-muted-foreground text-sm">
                  Destination
                </span>
                <span className="font-medium">{destinationName}</span>
              </div>
            )}

            <div className="flex items-start justify-between border-b pb-2">
              <span className="text-muted-foreground text-sm">Travelers</span>
              <span className="font-medium">
                {details.numberOfTravelers}{' '}
                {details.numberOfTravelers === 1 ? 'person' : 'people'}
              </span>
            </div>

            <div className="flex items-start justify-between border-b pb-2">
              <span className="text-muted-foreground text-sm">Start Date</span>
              <span className="font-medium">
                {format(details.startDate, 'PPP')}
              </span>
            </div>

            <div className="flex items-start justify-between border-b pb-2">
              <span className="text-muted-foreground text-sm">End Date</span>
              <span className="font-medium">
                {format(details.endDate, 'PPP')}
              </span>
            </div>

            <div className="flex items-start justify-between border-b pb-2">
              <span className="text-muted-foreground text-sm">Duration</span>
              <span className="font-medium">
                {Math.ceil(
                  (details.endDate.getTime() - details.startDate.getTime()) /
                    (1000 * 60 * 60 * 24),
                )}{' '}
                days
              </span>
            </div>

            {destinationPrice && (
              <div className="flex items-start justify-between pt-2">
                <span className="font-semibold">Total Price</span>
                <span className="text-primary text-lg font-bold">
                  ${destinationPrice * details.numberOfTravelers}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950/20">
        <p className="text-muted-foreground text-center text-sm">
          📧 A confirmation email with complete details has been sent to{' '}
          <strong>{details?.email}</strong>
        </p>
      </div>

      <Button className="w-full" onClick={handleClose}>
        Close
      </Button>
    </div>
  )
}
