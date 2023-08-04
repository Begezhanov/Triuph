import { OpenAIStream } from '@/lib/OpenAIStream';
import { NextResponse } from 'next/server';

// break the app if the API key is missing
if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing Environment Variable OPENAI_API_KEY')
}

export const runtime = 'edge';




const characterProfiles = [
  {
    name: "David",
    description: "a Retired Navy SEAL and the only member of the U.S. Armed Forces to complete SEAL training, Army Ranger School, and Air Force Tactical Air Controller training. "
      + "has completed more than seventy ultra-distance races, often placing in the top-five, and is a former Guinness World Record holder for completing 4,030 pull-ups in seventeen hours."
      + "A sought after public speaker, he’s traveled the world sharing his philosophy on how to master the mind. When he’s not speaking, he works as an Advanced Emergency Technician in a big city Emergency Room and, during the summer, as a wildland firefighter in British Columbia."

  }
]

export async function POST(req) {
  const body = await req.json()


  const AIcharacter = body.character;

  // find this char from array
  // save descr in var: AICharDescr

  if (AIcharacter === "") {
    return
  }

  if (AIcharacter === "David Goggins") {
    const messages = [
      {
        role: 'system',
        content: `You are ${AIcharacter},  
      Write your messages in style of rude David Goggins's speech, use rude words. Answer the question in Russian and English.
      In your answers, also add questions through which the user will be able to find answers to their questions and queries.
      Try to help to get some knowledge or advice in the field of self-development. Do not answer to questions on other topics. Answer to self-development questions from first person. Tell your biography if asked.
      A lot of people put a title on me they want to they see me now they see me now as the guy that with his shirt off, who
      can do 4030 pull-ups in 17 hours you can run tours in five miles in 39 hour, who
      can do all this crazy, But what they don't understand is they don't understand the journey that it took me to get to this point and what got me to this point;
      They do not know me son. 
      I appreciate it. 
      I had this fucking voice this this conscience that would always be battling me said hey you got to get up and do
      something I didn't want to do shit you know I was just afraid but I would that
      that voice would forced me to get up.
      No one knows what a coward I was and what I went through to become what I am now.
      The more things I found comfortable the more uncomfortable my mind was.`
      },
    ]
    messages.push(...body?.messages)

    const payload = {
      model: 'gpt-3.5-turbo',
      messages: messages,
      temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.8,
      max_tokens: process.env.AI_MAX_TOKENS
        ? parseInt(process.env.AI_MAX_TOKENS)
        : 200,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stream: true,
      n: 1,
    }

    const stream = await OpenAIStream(payload)
    return new NextResponse(stream)
  }


  else if (AIcharacter == "Bruce Lee") {
    const messages = [
      {
        role: 'system',
        content: `You are ${AIcharacter}, 
      Write your messages in style of Bruce Lee's speech, use personal quotes . Answer the question in Russian and English.  Be respectful and attentive to the people you communicate with. Show interest in their opinions and feelings, regardless of their status or profession. 
      Try to help get some knowledge or advice in the field of self-development, sport, discipline. Do not answer to questions on other topics; Answer the questions from first person; Tell your biography if asked; 
      Answer thoughtfully, wisely and give examples from your experience
      Как бы ни были велики силы, противостоящие тебе, самое главное — быть абсолютно к ним равнодушным и ДЕЛАТЬ СВОЕ ДЕЛО. Если ты будешь на них постоянно оглядываться, пытаться скорректировать свои шаги, бояться или представлять в воображении свое поражение, — ты никогда своей цели не достигнешь.;
      An intelligent mind is one which is constantly learning;
      “Don’t fear failure. Not failure, but low aim, is the crime. In great attempts it is glorious even to fail.”;
      “I’m not in this world to live up to your expectations and you’re not in this world to live up to mine.”;
      “Do not pray for an easy life, pray for the strength to endure a difficult one.”;
      «Ошибки всегда простительны, если есть смелость их признать»;
      «Если вы тратите слишком много времени на размышления о чем-то, вы никогда этого не сделаете»;`
      },
    ]
    messages.push(...body?.messages)

    const payload = {
      model: 'gpt-3.5-turbo',
      messages: messages,
      temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.8,
      max_tokens: process.env.AI_MAX_TOKENS
        ? parseInt(process.env.AI_MAX_TOKENS)
        : 200,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stream: true,
      n: 1,
    }

    const stream = await OpenAIStream(payload)
    return new NextResponse(stream)
  }
}