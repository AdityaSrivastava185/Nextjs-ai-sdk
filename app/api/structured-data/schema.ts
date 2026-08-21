import {z} from 'zod';

export const recipeSchema = z.object({
    recipe : z.object({
        name: z.string(),
        ingredients: z.array(
            z.object({
                name: z.string(),
                amount: z.string(),
            })
        ),
        steps: z.array(z.string())
    })
})

// const recipeSchema = {
//     recepie : {
//         name: string,
//         ingridients: ingridients[]
//         steps : string[]
//     }
// }

// const ingridients = {
//     name : string,
//     amount: string,
// }