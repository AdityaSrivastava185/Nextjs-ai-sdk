import { groq } from "@ai-sdk/groq";
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  UIMessage,
} from "ai";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const aiResponse = streamText({
    model: groq("groq/compound"),
    instructions: "You are a helpful coding assistant. Keep responses under 3 sentences and focus on practical examples.",
    messages: await convertToModelMessages(messages),
  });
  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: aiResponse.stream }),
  });
}
