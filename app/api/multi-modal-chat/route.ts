import { groq } from "@ai-sdk/groq";
import { openai } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  streamText,
  UIMessage,
} from "ai";

export async function POST(req: Request) {
  try{
    const { messages }: { messages: UIMessage[] } = await req.json();
  const aiResponse = streamText({
    model: groq("qwen/qwen3.6-27b"),
    instructions: "You are a helpful coding assistant. Keep responses under 3 sentences and focus on practical examples.",
    messages: await convertToModelMessages(messages),
  });
  return aiResponse.toUIMessageStreamResponse()
  } catch(error){
    console.error("Error streaming chat response", error)
    return new Response("Unable to stream chat response", {
        status: 500
    })
  }
}
