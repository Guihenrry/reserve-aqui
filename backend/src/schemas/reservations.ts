import { z } from 'zod'

export const create = z.object({
  body: z.object({
    space_id: z.number(),
    start_time: z.string().time(),
    end_time: z.string().time(),
    date: z.string().date(),
  }),
})
