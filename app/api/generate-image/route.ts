import { generateImage } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req:Request){
    try{
        const {prompt} = await req.json();
        const {image} = await generateImage({
            model: openai.imageModel("dall-e-3"),
            prompt: prompt,
            size: "1024x1024",
            providerOptions:{
                openai:{
                    qulaity: "hd",
                    style:"vivid"
                }
            }
        })
        return new Response(image.base64)
    }catch(error){
        console.log("error while generating image", error)
        return new Response("Error while generating the image", {
            status: 500
        })
    }
}