'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface FormValues {
  name: string
  description?: string
  email: string
  phone?: string
}

interface NewOrgaAddProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (values: FormValues) => void
  defaultValues?: Partial<FormValues>
}

export function NewOrgaAdd({
  isOpen,
  onClose,
  onSubmit,
  defaultValues = { name: '', description: '', email: '', phone: '' },
}: NewOrgaAddProps) {
  const form = useForm<FormValues>({
    defaultValues,
  })

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = form

  const handleFormSubmit = (values: FormValues) => {
    onSubmit(values)
    reset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Organization</DialogTitle>
          <DialogDescription>
            Enter the basic details of the new organization. You can add more
            information later.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="space-y-4"
          >
            {/* Name Field */}
            <FormField
              name="name"
              render={() => (
                <FormItem>
                  <FormLabel>Organization Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter organization name"
                      {...form.register('name', {
                        required: 'Organization name is required',
                        minLength: {
                          value: 2,
                          message: 'Name must be at least 2 characters',
                        },
                      })}
                    />
                  </FormControl>
                  {errors.name && (
                    <FormMessage>{errors.name.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />

            {/* Description Field */}
            <FormField
              name="description"
              render={() => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief description of the organization"
                      {...form.register('description')}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              name="email"
              render={() => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="contact@organization.com"
                      {...form.register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                          message: 'Invalid email address',
                        },
                      })}
                    />
                  </FormControl>
                  {errors.email && (
                    <FormMessage>{errors.email.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />

            {/* Phone Field */}
            <FormField
              name="phone"
              render={() => (
                <FormItem>
                  <FormLabel>Phone (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter phone number"
                      {...form.register('phone', {
                        pattern: {
                          value: /^[0-9]*$/,
                          message: 'Phone number must contain only digits',
                        },
                      })}
                    />
                  </FormControl>
                  {errors.phone && (
                    <FormMessage>{errors.phone.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />

            {/* Footer */}
            <DialogFooter>
              <Button type="submit">Add Organization</Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
