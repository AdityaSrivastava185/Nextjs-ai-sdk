"use client";

import { useState, useRef } from "react";

interface TranscriptResult {
  text: string;
  segments?: Array<{ start: number; end: number; text: string }>;
  language?: string;
  durationInSeconds?: number;
}

export default function TranscribeAudioPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<TranscriptResult | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setTranscript(null);
      setError(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      setError("Please select an audio file");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("audio", selectedFile);

      const response = await fetch("/api/transcribe-audio", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Unable to generate the auido transcript");
      }

      const data = await response.json();
      setTranscript(data);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error transcribing audio:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setTranscript(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {isLoading && (
        <div className="text-center mb-4">Transcribing audio...</div>
      )}

      {transcript && !isLoading && (
        <div className="mb-8 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
          <h3 className="font-semibold mb-2">Transcript:</h3>
          <p className="whitespace-pre-wrap">{transcript.text}</p>

          {transcript.language && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Language: {transcript.language}
            </p>
          )}

          {transcript.durationInSeconds && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Duration: {transcript.durationInSeconds.toFixed(1)} seconds
            </p>
          )}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="composer-shell fixed bottom-4 left-1/2 z-10 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 sm:bottom-6 sm:w-[calc(100%-3rem)]"
      >
        <div className="flex flex-col gap-2">
          {selectedFile && (
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Selected: {selectedFile.name}</span>
              <button
                type="button"
                onClick={resetForm}
                className="text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          )}

          <div className="flex items-center gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="hidden"
              id="audio-upload"
            />
            <label
              htmlFor="audio-upload"
              className="flex h-12 min-w-0 flex-1 cursor-pointer items-center justify-center rounded-2xl border border-zinc-800 bg-black px-5 text-sm font-medium text-zinc-100 shadow-2xl shadow-black/40 transition hover:border-zinc-600 hover:bg-zinc-950"
            >
              {selectedFile ? "Change file" : "Select audio file"}
            </label>
            <button
              type="submit"
              disabled={isLoading || !selectedFile}
              className="h-12 shrink-0 rounded-2xl bg-zinc-100 px-5 text-sm font-semibold text-zinc-950 shadow-2xl shadow-black/30 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Transcribe
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
