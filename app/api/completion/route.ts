import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) { 
    try {
        const {prompt} = await req.json();
        const {text} = await generateText({
            model: groq("groq/compound"),
            prompt:prompt
        })
        return Response.json({text})
    } catch (error) {
        console.log("something went wrong while conneting to model")
        return Response.json({
            error : "Something went wrong while generating the text",
        } , {
            status:500
        })
    }
}