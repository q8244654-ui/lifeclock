import { z } from 'zod'

export const createCheckoutSessionSchema = z.object({
  referralCode: z.string().optional(),
  email: z.string().email().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
})

export const webhookHeadersSchema = z.object({
  'stripe-signature': z.string(),
})

