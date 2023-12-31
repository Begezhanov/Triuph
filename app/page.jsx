import Landing from "@/components/home/landing";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    session !== null ? (
      <>
        {/* <Chat character="David Goggins" /> */}
        {/* <div className="absolute">

          <div className="relative flex items-center justify-center min-h-screen min-w-screen overflow-h"><video src="fight2.mp4 " autoPlay={true} loop muted className="absolute w-auto min-w-full min-h-full max-w-none"></video></div>
        </div> */}




        <div
          className="relative flex items-center justify-center min-h-screen min-w-screen overflow-hidden">
          <video src="fight2.mp4 " autoPlay={true} loop muted className="absolute w-auto min-w-full min-h-full max-w-none"></video>

          <div className="z-20 flex flex-col my-16 text-white">
            <div className="text-center">
              <h2 className="mb-2 text-6xl font-semibold " style={{ fontFamily: 'italic, sans-serif' }}>
                Chat with a Legendary Trainer
              </h2>

              <h4 className="mb-6 text-xl  font-light drop-shadow-md">Get inspired and receive advice from the strict <span className="font-bold">David Goggins</span> and wise <span className="font-bold">Bruce Lee</span></h4>
            </div>
            <div className="flex flex-col items-center md:flex-row gap-8 flex justify-center mt-20">
              <Link href="/david" className={`hover:scale-105 transitions-[grayscale] transitions-[background] w-[450px] md:h-[600px] 
                ease-in-out duration-100  flex flex-col p-4 drop-shadow-2xl
                gap-4 text-center text-3xl font-bold rounded-xl button md:davidButton bg-[rgba(0,0,0,0.5)] border-2 border-gray-300 hover:bg-gray-900`}>
                <div className="w-full overflow-hidden rounded">


                  <Image
                    src="/davidG.jpeg" width={500} height={500}
                    className="grayscale p-6 hover:grayscale-0 rounded-t-lg " />
                </div>
                <div className="p-6">

                </div>
                <p className="text-big text-white dark:text-neutral-200">
                  David Goggins
                </p>
                <p className="text-base text-white pb-6 font-light w-4/5 mx-auto dark:text-neutral-200">
                  Tough and rude,
                  In his manner characteristic of seals
                </p>
              </Link>

              <Link href="/Bruce" className={`hover:scale-105 transitions-[grayscale] transitions-[background] 
                ease-in-out duration-100   flex flex-col p-4 gap-4 w-[450px] h-[600px]
                text-center text-3xl font-bold  rounded-xl button drop-shadow-2xl davidButton bg-gradient-to-tr border-2 border-yellow-300 bg-[rgba(0,0,0,0.5)] text-white hover:bg-black`}>
                <div className="w-full overflow-hidden rounded">
                  <Image
                    src="/bruceL.jpg" width={500} height={500}
                    className="grayscale p-6 hover:grayscale-0 " />
                </div>
                <div className="p-6">

                </div>
                <p className="text-big text-white dark:text-neutral-200">
                  Bruce Lee
                </p>
                <p className="text-base text-white pb-6 font-light w-4/5 mx-auto dark:text-neutral-200">
                  Energetic, straightforward, philosophical and inspiring
                </p>
              </Link>
            </div>
          </div>
        </div>


      </>
    ) : (
      <Landing />
    )
  );
}
