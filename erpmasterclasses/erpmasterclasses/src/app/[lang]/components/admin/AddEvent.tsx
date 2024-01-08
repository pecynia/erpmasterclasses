"use client"

import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { EventSchema } from '@/lib/schema'
import { saveEvent } from '@/app/_actions'
import { Locale, i18n } from '../../../../../i18n.config'
import { CreateEventProps } from '@/../typings'
import LocaleIcons from '@/app/[lang]/components/lang/LocaleIcon'
import { toast } from 'sonner'

import { cn } from "@/lib/utils"
import { CalendarIcon } from "@radix-ui/react-icons"
import { Plus } from 'lucide-react'
import { format } from "date-fns"
import { Calendar } from "@/app/[lang]/components/ui/calendar"
import { Checkbox } from "@/app/[lang]/components/ui/checkbox"
import { Label } from "@/app/[lang]/components/ui/label"
import { Badge } from '@/app/[lang]/components/ui/badge'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/[lang]/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/[lang]/components/ui/select"
import Image from 'next/image'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/app/[lang]/components/ui/dialog"
const AddEvent: React.FC = () => {
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<CreateEventProps>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      title: '',
      eventSlug: '',
      description: '',
      location: '',
      requiredRegistrations: 10,
      date: undefined,
      language: i18n.defaultLocale,
      shownLanguages: [i18n.defaultLocale]
    }
  })

  // Register the date, language, and shownLanguages fields
  React.useEffect(() => {
    register('date')
    register('language')
    register('shownLanguages')
  }, [register])

  const processForm: SubmitHandler<CreateEventProps> = async (data) => {
    try {
      await saveEvent(data)
      toast.success("Event added successfully")
      closeSheet()
    } catch (error) {
      console.error(error)
      toast.error("Failed to add event")
    }
  }

  const [selectedLocale, setSelectedLocale] = React.useState<Locale>(i18n.defaultLocale)
  const [date, setDate] = React.useState<Date | null>(null)
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
  const [shownLanguages, setShownLanguages] = React.useState<Locale[]>([selectedLocale])
  const [open, setOpen] = React.useState(false)

  const closeSheet = () => setOpen(false);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate)
      setValue('date', selectedDate) // Update the registered field
      setIsPopoverOpen(false) // Close the popover on date selection
    }
  }

  const switchLocale = (newLocale: Locale) => {
    setSelectedLocale(newLocale)
    setValue('language', newLocale) // Update the registered field
  }

  const toggleLanguage = (loc: Locale) => {
    const newShownLanguages = shownLanguages.includes(loc)
      ? shownLanguages.filter((l) => l !== loc)
      : [...shownLanguages, loc]
    setShownLanguages(newShownLanguages)
    setValue('shownLanguages', newShownLanguages) // Update the registered field
  }

  // Custom register for requiredRegistrations
  React.useEffect(() => {
    register('requiredRegistrations', { 
      setValueAs: (value) => parseInt(value, 10) || 0 
    })
  }, [register])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="h-5 w-5" />
          <span className="sr-only">Add Event</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add Event
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(processForm)} className='flex flex-1 flex-col gap-3'>
          <Input {...register('title')} placeholder='Title' className='w-full rounded-lg p-2 border-2 border-gray-100' />
          {errors.title && <p className='text-sm text-red-400 -mt-2'>{errors.title.message}</p>}

          <Input {...register('eventSlug')} placeholder='Event Slug' className='w-full rounded-lg p-2 border-2 border-gray-100' />
          {errors.eventSlug && <p className='text-sm text-red-400 -mt-2'>{errors.eventSlug.message}</p>}

          <Textarea {...register('description')} placeholder='Description' className='w-full rounded-lg p-2 border-2 border-gray-100' />
          {errors.description && <p className='text-sm text-red-400 -mt-2'>{errors.description.message}</p>}

          {/* Date Picker */}
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date || undefined}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>

            {/* Error Message */}
            {errors.date && <p className='text-sm text-red-400 -mt-2'>{errors.date.message}</p>}
          </Popover>

          {/* Location */}
          <Input {...register('location')} placeholder='Location (optional)' className='w-full rounded-lg p-2 border-2 border-gray-100' />
          {errors.location && <p className='text-sm text-red-400 -mt-2'>{errors.location.message}</p>}

          {/* Required Registrations (number) */}
          <div className='flex flex-col gap-2 w-[240px] '>
            <div>
              <p className='text-sm '>Required Registrations</p>
            </div>
            <Input
              placeholder='Required Registrations'
              {...register('requiredRegistrations')}
              className='w-full rounded-lg p-2 border-2 border-gray-100'
              min="1"
              onChange={(e) => setValue('requiredRegistrations', parseInt(e.target.value, 10))}
            />
            {errors.requiredRegistrations && <p className='text-sm text-red-400 -mt-2'>{errors.requiredRegistrations.message}</p>}
          </div>

          {/* Language */}
          <div className='flex flex-col gap-2 w-[240px] '>
            <div>
              <p className='text-sm '>Event language</p>
            </div>
            <Select value={selectedLocale} onValueChange={switchLocale}>
              <SelectTrigger>
                <SelectValue>
                  {selectedLocale ? (
                    <div className="flex items-center">
                      <Image
                        src={LocaleIcons[selectedLocale]}
                        alt={selectedLocale.toUpperCase()}
                        width={24}
                        height={24}
                        className="mr-2"
                      />
                      {selectedLocale.toUpperCase()}
                    </div>
                  ) : (
                    "Choose Language"
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {i18n.locales.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      <div className="flex items-center">
                        <Image
                          src={LocaleIcons[loc]}
                          alt={loc.toUpperCase()}
                          width={24}
                          height={24}
                          className="mr-2"
                        />
                        {loc.toUpperCase()}
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>


          {/* Multiple Languages Selector */}
          <div className='flex flex-col gap-2'>
            <div>
              <p className='text-sm '>Show event in site versions</p>
            </div>
            <div className='flex flex-wrap'>
              {i18n.locales.map((loc) => (
                <div key={loc} className="flex items-center mr-2 mb-2">
                  <Badge className="p-2" variant="secondary">
                  <Checkbox
                    checked={shownLanguages.includes(loc)}
                    onCheckedChange={() => toggleLanguage(loc)}
                  />
                  <Label className="flex items-center ml-3">
                    <Image src={LocaleIcons[loc]} alt={loc.toUpperCase()} width={24} height={24} />
                    <span className='ml-2'>{loc.toUpperCase()}</span>
                  </Label>
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            disabled={isSubmitting} 
            className='rounded-lg bg-primary py-2.5 font-medium text-white transition-colors hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-50'
          >
            {isSubmitting ? 'Adding...' : 'Add Event'}
          </Button>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEvent;