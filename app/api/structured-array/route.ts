import { groq } from "@ai-sdk/groq"
import { streamObject } from "ai"
import { ArraySchema } from "./schema"

export async function POST(req: Request){
    try{
        const {type} = await req.json()
        const aiResponse = await streamObject({
            model: groq("openai/gpt-oss-120b"),
            output: "array",
            schema: ArraySchema,
            prompt: `Generate a list of 5 ${type} type pokemon` 
        })
        return aiResponse.toTextStreamResponse()
    }catch(error){
        console.log("Error when gernerating resposne" , error)
        return new Response("Unable to generate response",  {status: 500})
    }
}