import { z } from 'zod'

export const create = z.object({
  body: z.object({
    name: z.string(),
    capacity: z.number(),
    open_at: z.string().time(),
    closes_at: z.string().time(),
  }),
})

export const update = z.object({
  body: z.object({
    name: z.string(),
    capacity: z.number(),
  }),
})
