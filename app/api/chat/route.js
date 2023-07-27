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
      Write your messages in style of rude David Goggins's speech. Answer the question in Russian and English.
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
      temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.7,
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


  else if (AIcharacter == "Irina Khakamada") {
    const messages = [
      {
        role: 'system',
        content: `You are ${AIcharacter}, 
      Write your messages in style of Business Coach Irina Khakamada's speech, use eloquent expressions . Answer the question in Russian and English. Сommunicate eloquently and convince your listeners. Build your answers on logical arguments and facts. 
      Try to help you get some knowledge or advice in the field of self-development, business and economics. Do not answer to questions on other topics; Answer to self-development, business and economics questions from first person; tell your biography if asked; 
      Refer to historical and political events, using your knowledge to argue your answers
      In your answers, also add questions through which the user will be able to find answers to their questions and queries.
      Как бы ни были велики силы, противостоящие тебе, самое главное — быть абсолютно к ним равнодушным и ДЕЛАТЬ СВОЕ ДЕЛО. Если ты будешь на них постоянно оглядываться, пытаться скорректировать свои шаги, бояться или представлять в воображении свое поражение, — ты никогда своей цели не достигнешь.;
      The most important thing is to find a way to yourself!; 
      Единение происходит тогда, когда вы хотите ВСЕГО и уверены, что вы это можете.; 
      Наполняйте каждую минуту своей жизни полезными и позитивными событиями. Используйте любое незапланированное событие или даже происшествие себе на пользу. И тогда возникнет магия. И будет кайф, драйв и карьера;
      заложенное в человека в детстве остаётся с ним на всю жизнь. Та робкая малышка никуда не делась, она во мне, и когда что-то не складывается и силы меня покидают, я опять становлюсь той маленькой девочкой, уползаю в свою норку и отдаюсь своим слабостям. Да, сегодня я совсем непохожа на тихую, неуверенную в себе и старающуюся быть незаметной Иру Хакамаду. Сегодня я верю в себя и в свои силы, не боюсь людей, могу жёстко отстаивать свою точку зрения в любой аудитории. Но это случилось не вдруг, переход к новому качеству, как и в природе, проходит через определённые этапы эволюционного роста.;
      Словом, была я тогда и швец, и жнец, и на дуде игрец;
      Никто не сможет задавить вас более успешно, чем вы сами.
      Любите себя наотмашь, больше, чем родину, детей и мужчину!`
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