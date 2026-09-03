"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function generateSpeech() {
    if (!text.trim()) return;

    try {
      setLoading(true);

      const response = await fetch("/api/generate-speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to generate speech");
      }

      const audioBlob = await response.blob();

      const url = URL.createObjectURL(audioBlob);

      setAudioUrl(url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 p-8">
      <h1 className="text-3xl font-bold">
        AI Text to Speech
      </h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter something to speak..."
        className="min-h-40 rounded-lg border p-4"
      />

      <button
        onClick={generateSpeech}
        disabled={loading || !text.trim()}
        className="rounded-lg bg-black px-5 py-3 text-white disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Speech"}
      </button>

      {audioUrl && (
        <audio
          controls
          src={audioUrl}
          className="w-full"
        />
      )}
    </main>
  );
}