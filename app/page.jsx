import Landing from "@/components/home/landing";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    session !== null ? (
      // <Chat character="David Goggins" />
      <div className="flex gap-4">
        <Link href="/david" className={`transitions-[grayscale] transitions-[background] ease-in-out duration-100 hover:bg-neutral-200 flex flex-col p-4 gap-4 text-center text-3xl font-bold border rounded button davidButton bg-neutral-100`}>
          <div className="w-full h-64 overflow-hidden rounded">
            <Image src="/david.jpg" width={500} height={500} className="grayscale hover:grayscale-0" />
          </div>
          David Goggins
        </Link>
        <Link href="/Bruce" className={`transitions-[grayscale] transitions-[background] ease-in-out duration-100  hover:bg-neutral-200  flex flex-col p-4 gap-4 text-center text-3xl font-bold border rounded button davidButton bg-neutral-100`}>
          <div className="w-full h-64 overflow-hidden rounded">
            <Image src="/bruce1.jpg" width={500} height={500} className="grayscale hover:grayscale-0" />
          </div>
          Bruce Lee
        </Link>
      </div>

    ) : (
      <Landing />
    )
  );
}
