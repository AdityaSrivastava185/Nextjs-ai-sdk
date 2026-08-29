import { openai } from "@ai-sdk/openai";
import { transcribe } from "ai";


export async function POST(req: Request){
    try{
        const formData = await req.formData();
        const audioFile = await formData.get("audio") as File
        if(!audioFile){
            return new Response("No audio file available", {status: 400})
        }
        const arrayBuffer = await audioFile.arrayBuffer()
        const unit8Array = await new Uint8Array(arrayBuffer);
        const transcript = await  transcribe({
            model: openai.transcription("whisper-1"),
            audio: unit8Array
        })
        return Response.json(transcript)
    }catch(error){
        console.log("Error while transcriptiopm", error);
        return new Response("Unable to generate the transcription", {status: 500})
    }

}


// const formData = await req.formData();
//     const audiofile = formData.get("audio") as File
//     if(!audiofile){
//         return new Response("No audio file found", {status: 500});
//     }
//     const arrayBuffer = await audiofile.arrayBuffer();
//     const unit8Array = await new Uint8Array(arrayBuffer);
//     const transcript = await transcribe({
//         model: openai.transcription("whisper-1"),
//         audio: unit8Array
//     })
//     return Response.json(transcript)