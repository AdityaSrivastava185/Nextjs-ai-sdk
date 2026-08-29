"use client"

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [response, setResponse] = useState<string | null>("");
  const [prompt, setPrompt] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("")


  const handleSubmitPrompt = async (e : React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setPrompt("")
    try {
      const response = await fetch('/api/completion', {
        method : "POST",
        headers:{
          "content-type": "application/json"
        },
        body: JSON.stringify({prompt})
      })
      
      const data = await response.json()
      if(!response.ok){
        throw new Error(data.error || "Something went wrong")
      }
      setResponse(data.text)
    } catch (error) {
      console.log("Error while getting response from selected model")
      setError(error instanceof Error ? error.message  : "Something went wrong")
    } finally{
      setIsLoading(false);
    }
  }

  return (
    <div className="app-shell flex flex-1 flex-col items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
      <main className="workspace-panel flex min-h-[calc(100vh-3rem)] w-full max-w-4xl flex-1 flex-col items-center justify-between px-5 pb-28 pt-8 sm:min-h-[calc(100vh-4rem)] sm:px-10 sm:pb-32 sm:pt-12">
        {error && <div className="text-red-700 ">{error}</div>}
        <div className="w-full max-w-2xl flex-1">
          {
            isLoading ? (
              <div>Loading...</div>
            ) : (
              response ? (
                <div className="whitespace-pre-wrap">{response}</div>
              )  : (
                null
              )
            )
          }
        </div>
        <form
          className="composer-shell fixed bottom-4 left-1/2 z-10 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 sm:bottom-6 sm:w-[calc(100%-3rem)]"
          onSubmit={handleSubmitPrompt}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Ask Anything"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full rounded-2xl border border-zinc-800  px-7 py-3 text-sm font-medium text-zinc-100 shadow-2xl shadow-black/40 outline-none transition placeholder:text-zinc-500 focus:border-zinc-500 focus:ring-4 focus:ring-white/5"
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-lg text-zinc-600">↵</span>
          </div>
        </form>
      </main>
    </div>
  );
}
