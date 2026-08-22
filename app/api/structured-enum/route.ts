import { groq } from "@ai-sdk/groq";
import { generateObject } from "ai";

export async function POST(req: Request){
    try{
        const {text} = await req.json();
        // genreate object only works with enum 
        const aiResponse = await generateObject({
            model: groq("openai/gpt-oss-120b"),
            output: "enum",
            enum: ["positive", "negative", "neutral"],
            prompt: `classify the sentiment of the- ${text} type`
        })
        return aiResponse.toJsonResponse();
    }catch(error){
        console.log("Error while generating the response", error)
        return new Response("Unable to generate the response", {status: 500})
    }
}