'use client'

import { throttle } from '@/lib/throttle'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import cx from 'classnames'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { ChatLine, LoadingChatLine } from './chat-line'





// default first message to display in UI (not necessary to define the prompt)

const InputMessage = ({ input, setInput, sendMessage, loading }) => {
  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false)
  const [question, setQuestion] = useState(null)
  const [questionError, setQuestionError] = useState(null)
  const [character, serCharacter] = useState("David Goggins") // write char name from select component
  const inputRef = useRef(null)

  const shouldShowLoadingIcon = loading || isGeneratingQuestion
  const inputActive = input !== '' && !shouldShowLoadingIcon

  const generateJeopardyQuestion = async () => {
    setIsGeneratingQuestion(true)
    setQuestionError(null)

    try {
      const res = await axios.get('/api/question')
      if (!res.data) {
        throw new Error('No question was found in the response.')
      }
      const question_data = res.data

      setQuestion(question_data)
      setInput(`The category is "${question_data.category}". ${question_data.question}`)
    } catch (err) {
      setQuestionError(err.message)
    } finally {
      setIsGeneratingQuestion(false)
    }
  }

  useEffect(() => {
    const input = inputRef?.current
    if (question && input) {
      input.focus()
      input.setSelectionRange(input.value.length, input.value.length)
    }
  }, [question, inputRef])

  useEffect(() => {
    if (questionError) {
      toast.error(questionError)
    }
  }, [questionError])


  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-transparent via-white to-white flex flex-col items-center clear-both">
      {/* select component for choosing character */}

      <div className="mx-2 my-4 flex-1 w-full md:mx-4 md:mb-[52px] lg:max-w-2xl xl:max-w-3xl">
        <div className="relative mx-2 flex-1 flex-col rounded-md border-black/10 bg-white shadow-[0_0_10px_rgba(0,0,0,0.10)] sm:mx-4">
          <input
            ref={inputRef} Fire away with trivia questions
            aria-label="chat input"
            required
            className="m-0 w-full border-0 bg-transparent p-0 py-3 pl-4 pr-12 text-black"
            placeholder="Type a message..."
            value={input}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage(input)
                setInput('')
              }
            }}
            onChange={(e) => {
              setInput(e.target.value)
            }}
            disabled={isGeneratingQuestion}
          />
          <button
            className={cx(
              shouldShowLoadingIcon && "hover:bg-inherit hover:text-inhert",
              inputActive && "bg-black hover:bg-neutral-800 hover:text-neutral-100",
              "absolute right-2 top-2 rounded-sm p-1 text-neutral-800 opacity-60 hover:bg-neutral-200 hover:text-neutral-900 transition-colors")}
            type="submit"
            onClick={() => {
              sendMessage(input)
              setInput('')
            }}
            disabled={shouldShowLoadingIcon}
          >
            {shouldShowLoadingIcon
              ? <div className="h-6 w-6 animate-spin rounded-full border-t-2 border-neutral-800 opacity-60 dark:border-neutral-100"></div>
              : <div className={cx(inputActive && "text-white", "w-6 h-6")}>
                <PaperAirplaneIcon />
              </div>
            }
          </button>
        </div>
      </div>
    </div>
  )
}

const useMessages = (character) => {
  const initialMessages = [
    {
      role: 'assistant',
      content: `Hey there! I am ${character}`,
    },
  ]
  const [messages, setMessages] = useState(initialMessages)
  const [isMessageStreaming, setIsMessageStreaming] = useState(false);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);

  // send message to API /api/chat endpoint
  const sendMessage = async (newMessage) => {
    setLoading(true)
    setError(null)
    const newMessages = [
      ...messages,
      { role: 'user', content: newMessage },
    ]
    setMessages(newMessages)
    const last10messages = newMessages.slice(-10) // remember last 10 messages

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: last10messages,
        character: character
      }),
    })

    console.log('Edge function returned.')

    if (!response.ok) {
      console.log(response)
      setError(response.statusText)
      setLoading(false)
      return
    }

    // This data is a ReadableStream
    const data = response.body
    if (!data) {
      return
    }

    // This data is a ReadableStream

    setIsMessageStreaming(true)

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    let lastMessage = ''

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)

      lastMessage = lastMessage + chunkValue

      setMessages([
        ...newMessages,
        { role: 'assistant', content: lastMessage },
      ])

      setLoading(false)
    }

    setIsMessageStreaming(false)
  }

  return {
    messages,
    isMessageStreaming,
    loading,
    error,
    sendMessage,
  }
}




export default function Chat({ character }) {
  const [input, setInput] = useState('')
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const { messages, isMessageStreaming, loading, error, sendMessage } = useMessages(character)

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      const bottomTolerance = 30;

      if (scrollTop + clientHeight < scrollHeight - bottomTolerance) {
        setAutoScrollEnabled(false);
      } else {
        setAutoScrollEnabled(true);
      }
    }
  };



  const scrollDown = useCallback(() => {
    if (autoScrollEnabled) {
      messagesEndRef.current?.scrollIntoView(true)
    }
  }, [autoScrollEnabled])
  const throttledScrollDown = throttle(scrollDown, 250);

  useEffect(() => {
    throttledScrollDown()
  }, [messages, throttledScrollDown]);

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])


  return (
    <div className="flex-1 w-full border-white-100 bg-white overflow-hidden flex flex-col">
      <div
        ref={chatContainerRef}
        className="flex-1 w-full relative max-h-[calc(100vh-4rem)] overflow-x-hidden "
        onScroll={handleScroll}
      >
        <div className='relative m-auto flex p-4 text-base md:max-w-2xl gap-2 md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl'>
          <Link href={"/"} className='rounded border px-8 py-2 flex items-center'><img src="/arrow-back.svg" alt="back" className='w-4 h-4 mr-2' /> Back home</Link>
        </div>
        {/* Existing code for rendering chat messages */}
        {messages.map(({ content, role }, index) => (
          <ChatLine key={index} role={role} content={content} isStreaming={index === messages.length - 1 && isMessageStreaming} />
        ))}

        {loading && <LoadingChatLine />}

        <div
          className="h-[152px] bg-white"
          ref={messagesEndRef}
        />
        <InputMessage
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          isLoading={loading || isMessageStreaming}
        />
      </div>

      <Toaster />
    </div>
  );
}
