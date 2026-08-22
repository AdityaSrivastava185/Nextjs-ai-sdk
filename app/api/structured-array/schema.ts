import {z} from 'zod'

export const ArraySchema = z.object({
    name: z.string(),
    abilities: z.array(z.string())
})

export const UIArraySchma = z.array(ArraySchema)