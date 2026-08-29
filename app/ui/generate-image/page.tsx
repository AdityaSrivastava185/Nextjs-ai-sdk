"use client";

import Image from "next/image";
import { useState } from "react";

export default function GenerateImagePage() {
  const [prompt, setPrompt] = useState("");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    setImageSrc(null);
    setError(null);
    setPrompt("");

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setImageSrc(`data:image/png;base64,${data}`);
    } catch (error) {
      console.error("Error generating image:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="relative w-full aspect-square mb-20">
        {isLoading ? (
          <div className="w-full h-full animate-pulse bg-gray-300 rounded-lg" />
        ) : (
          imageSrc && (
            <Image
              alt="Generated Image"
              className="w-full h-full object-cover rounded-lg shadow-lg"
              src={imageSrc}
              width={1024}
              height={1024}
            />
          )
        )}
      </div>

      <form
          className="composer-shell fixed bottom-4 left-1/2 z-10 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 sm:bottom-6 sm:w-[calc(100%-3rem)]"
          onSubmit={handleSubmit}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Ask Anything"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full rounded-2xl border border-zinc-800  px-7 py-3 text-sm font-medium text-zinc-100 shadow-2xl shadow-black/40 outline-none transition placeholder:text-zinc-500 focus:border-zinc-500 focus:ring-4 focus:ring-white/5"
            />
          </div>
          {
            isLoading ? <button onClick={stop} className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-lg text-red-600">stop</button> : <button type='submit' className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-lg text-zinc-600">↵</button>
          }
        </form>
    </div>
  );
}