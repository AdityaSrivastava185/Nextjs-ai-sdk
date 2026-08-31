import { openai } from "@ai-sdk/openai";
import { generateSpeech } from "ai";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const { audio } = await generateSpeech({
      model: openai.speech("tts-1"),
      text: text,
    });

    console.log(audio)

    const audioBuffer = new ArrayBuffer(audio.uint8Array.byteLength);
    new Uint8Array(audioBuffer).set(audio.uint8Array);

    return new Response(audioBuffer, {
      headers: {
        "Content-Type": audio.mediaType || "audio/mpeg",
      },
    });
  } catch (error) {
    console.error("Error generating speech:", error);
    return new Response("Unable to generate speech", { status: 500 });
  }
}
