"use client";

import { useChat } from "@ai-sdk/react";
import React, { useState } from "react";

const Page = () => {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error, stop } = useChat();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage({
      text: input,
    });
    setInput("");
  };
  return (
    <div className="app-shell flex min-h-screen flex-col items-center bg-black px-4 text-zinc-100 sm:px-6 lg:px-8">
      <main className="workspace-panel flex min-h-screen w-full max-w-5xl flex-col">
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-1 pb-32 pt-10 sm:px-3 sm:pb-36 sm:pt-16">
          {error && (
            <div className="mb-6 rounded-lg border border-red-900/60 bg-red-950/20 px-4 py-3 text-sm text-red-300">
              {error.message}
            </div>
          )}

          <div className="flex flex-1 flex-col gap-7">
            {messages.map((message) => {
              const isUser = message.role === "user";

              return (
                <div
                  className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
                  key={message.id}
                >
                  <div
                    className={`flex max-w-[min(42rem,100%)] flex-col gap-2 ${
                      isUser ? "items-end" : "items-start"
                    }`}
                  >
                    <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                      {isUser ? "You" : "AI"}
                    </div>
                    <div
                      className={`rounded-2xl border px-4 py-3 text-[15px] leading-7 shadow-2xl shadow-black/20 ${
                        isUser
                          ? "border-zinc-800 bg-zinc-950 text-zinc-100"
                          : "border-zinc-900 bg-black text-zinc-200"
                      }`}
                    >
                      {message.parts.map((part, index) => {
                        switch (part.type) {
                          case "text":
                            return (
                              <div
                                className="whitespace-pre-wrap break-words"
                                key={`${message.id}-${index}`}
                              >
                                {part.text}
                              </div>
                            );
                          default:
                            return null;
                        }
                      })}
                    </div>
                  </div>
                </div>
              );
            })}

            {(status === "submitted" || status === "streaming") && (
              <div className="flex items-center gap-3 text-sm text-zinc-500">
                <div className="h-4 w-4 animate-spin rounded-full border border-zinc-800 border-t-zinc-400" />
                <span>Thinking</span>
              </div>
            )}
          </div>
        </div>

        <form
          className="composer-shell fixed bottom-4 left-1/2 z-10 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 sm:bottom-6 sm:w-[calc(100%-3rem)]"
          onSubmit={handleSubmit}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Ask Anything"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="h-12 w-full rounded-2xl border border-zinc-800 bg-black px-5 pr-20 text-sm font-medium text-zinc-100 shadow-2xl shadow-black/50 outline-none transition placeholder:text-zinc-500 focus:border-zinc-500 focus:ring-4 focus:ring-white/5"
            />
            <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center">
              {status === "streaming" || status === "submitted" ? (
                <button
                  onClick={stop}
                  className="rounded-lg px-2.5 py-1 text-xs font-semibold text-red-500 transition hover:bg-red-950/40 hover:text-red-300"
                  type="button"
                >
                  stop
                </button>
              ) : (
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-lg text-zinc-500 transition hover:bg-zinc-900 hover:text-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={status !== "ready"}
                  type="submit"
                >
                  ↵
                </button>
              )}
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Page;
