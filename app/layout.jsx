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
  title: "Triumph",
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
        

        <Suspense fallback="...">
          <Nav />
        </Suspense>
        <main className="flex min-h-screen w-full flex-col justify-centerr pt-16 relative h-full ">

          {children}
        </main>
        <Analytics />
      </body>
    </html>


  );
}
