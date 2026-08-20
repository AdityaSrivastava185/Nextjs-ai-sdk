import { groq } from "@ai-sdk/groq"
import { streamText } from "ai"

export async function POST(req:Request) {
   try{
    const {prompt} = await req.json();
    const aiStreamResponse = streamText({
        model: groq("groq/compound"),
        prompt: prompt,
    })
    return aiStreamResponse.toUIMessageStreamResponse()
   } catch(error){
    console.log(error);
    return new Response("Unable to stream text", {status: 500})
   }
}