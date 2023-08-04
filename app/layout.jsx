import Nav from "@/components/layout/nav";
import { authOptions } from "@/lib/authOptions";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { getServerSession } from "next-auth/next";
import Script from 'next/script';
import { Suspense } from "react";
import { inter, sfPro } from "./fonts";
import "./globals.css";

export const metadata = {
  title: "My First Project",
  description:
    "Meet your AI Jeopardy expert.",
  themeColor: "#FFF",
};

// iOS Safari viewport unit correction
const IOS_SAFARI_VIEWPORT_UNIT_CORRECTION = `
var customViewportCorrectionVariable = 'vh';

function setViewportProperty(doc) {
  var prevClientHeight;
  var customVar = '--' + ( customViewportCorrectionVariable || 'vh' );
  function handleResize() {
    var clientHeight = doc.clientHeight;
    if (clientHeight === prevClientHeight) return;
    requestAnimationFrame(function updateViewportHeight(){
      doc.style.setProperty(customVar, (clientHeight * 0.01) + 'px');
      prevClientHeight = clientHeight;
    });
  }
  handleResize();
  return handleResize;
}
window.addEventListener('resize', setViewportProperty(document.documentElement));
`;

export default async function RootLayout({
  children,
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <Script id="safari-viewport-fix">{IOS_SAFARI_VIEWPORT_UNIT_CORRECTION}</Script>
      <body className={cx(sfPro.variable, inter.variable,)}>
        {/* <div className={`<div
            class="bg-cover"
            style="background-image: url('/wall3.jpeg'); height: 400px"></div>`} */}
        {/* /> */}

        <div
  className="relative overflow-hidden rounded-lg bg-cover bg-no-repeat p-12 text-center"
  style={{ backgroundImage: `url('/sky.jpeg')`, height: '400px' }}>
  <div
    className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
    style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
    <div className="flex h-full items-center justify-center">
      <div className="text-white">
        <h2 className="mb-4 text-4xl font-semibold">Chat with a Legendary Trainer</h2>
        <h4 className="mb-6 text-xl font-semibold">Get inspired and receive advice from the strict David Goggins and wise Bruce Lee"</h4>
      </div>
    </div>
  </div>
</div>

        {/* <body className={cx(sfPro.variable, inter.variable, )}>
                <div className="fixed h-screen w-full bg-gradient-to-br from-white to-stone-900"/>
                </body> */}

        {/* <div
          class="relative max-w-xs overflow-hidden bg-cover bg-[50%] bg-no-repeat">
          <img
            src="pas.jpeg"
            class="max-w-xs" />
          <div
            class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black bg-fixed opacity-50"></div>
        </div> */}

        <Suspense fallback="...">
          <Nav />
        </Suspense>
        <main className="flex min-h-screen w-full flex-col items-center justify-center pt-16 relative  bg-gradient-to-br from-white via-indigo-200 to-black bg-center bg-no-repeat  "
        //  style={{ backgroundImage: `url('/road3.jpeg')`, backgroundSize: `cover` }}
         >
          {/* <body className={cx(sfPro.variable, inter.variable, )}>
                <div className="fixed h-screen w-full bg-gradient-to-br from-white to-stone-900"
                />
                </body> */}

          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}
