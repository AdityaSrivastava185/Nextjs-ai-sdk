import { experimental_generateSpeech as generateSpeech } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string") {
      return Response.json({ error: "Text is required" }, { status: 400 });
    }

    const result = await generateSpeech({
      model: openai.speech("tts-1"),
      text,
      voice: "alloy",
    });

    const audioBuffer = new Uint8Array(result.audio.uint8Array).buffer;

    return new Response(audioBuffer, {
      headers: {
        "Content-Type": result.audio.mediaType,
      },
    });
  } catch (error) {
    console.error("Speech generation error:", error);

    return Response.json(
      { error: "Unable to generate speech" },
      { status: 500 },
    );
  }
}
