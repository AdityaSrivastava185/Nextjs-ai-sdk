"use client";

import { useCompletion } from '@ai-sdk/react'

const Page = () => {
    const {input , handleInputChange, handleSubmit, completion, isLoading, error, setInput, stop} = useCompletion({
        api: "/api/stream"
    })
  return (
     <div className="app-shell flex flex-1 flex-col items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
      <main className="workspace-panel flex min-h-[calc(100vh-3rem)] w-full max-w-4xl flex-1 flex-col items-center justify-between px-5 pb-28 pt-8 sm:min-h-[calc(100vh-4rem)] sm:px-10 sm:pb-32 sm:pt-12">
        {error && <div className="text-red-700 ">{error.message}</div>}
        <div className="w-full max-w-2xl flex-1">
            {
                isLoading && !completion && <div>Loading...</div>
            }
         {
            completion && <div className='whitespace-pre-wrap'>{completion}</div>
         }
        </div>
        <form
          className="composer-shell fixed bottom-4 left-1/2 z-10 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 sm:bottom-6 sm:w-[calc(100%-3rem)]"
          onSubmit={(e) => {
            e.preventDefault()
            setInput("")
            handleSubmit(e)
          }}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Ask Anything"
              value={input}
              onChange={handleInputChange}
              className="w-full rounded-2xl border border-zinc-800  px-7 py-3 text-sm font-medium text-zinc-100 shadow-2xl shadow-black/40 outline-none transition placeholder:text-zinc-500 focus:border-zinc-500 focus:ring-4 focus:ring-white/5"
            />
          </div>
          {
            isLoading ? <button onClick={stop} className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-lg text-red-600">stop</button> : <button type='submit' className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-lg text-zinc-600">↵</button>
          }
        </form>
      </main>
    </div>
  )
}

export default Page
