"use client";

import useScroll from "@/lib/hooks/use-scroll";
import Image from "next/image";
import Link from "next/link";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";

export default function NavBar({ session }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 w-full  ${scrolled
          ? "border-b border-gray-200 bg-neutral-900/50 backdrop-blur-xl"
          : "bg-neutral-900"
          } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto text-white">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/triumph.svg"
              alt="triumph logo"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></Image>
            <p>Triumph</p>
          </Link>
          <div>
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <button
                className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                onClick={() => setShowSignInModal(true)}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
