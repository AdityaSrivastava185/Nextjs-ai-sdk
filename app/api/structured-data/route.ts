import { streamObject } from "ai"
import { groq } from "@ai-sdk/groq"
import {openai} from "@ai-sdk/openai"
import { recipeSchema } from "./schema"

export async function POST(req:Request) {
    try{
        const {dish} = await req.json()
        const streamResponse = await streamObject({
            model: groq("openai/gpt-oss-120b"),
            schema : recipeSchema,
            prompt: `Please Generate a recipie for ${dish}`
        })
        return streamResponse.toTextStreamResponse()
    }catch(error){
        console.log("Error generating recipe" , error)
        return new Response("Unable to generate recipe", {status : 500})
    }
}