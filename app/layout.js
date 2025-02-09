import "./globals.css";
import { SLOGAN } from "@/utils/constants";
import localFont from "next/font/local";
import Script from "next/script";

const myFont = localFont({
  src: "./fonts/meetme.ttf",
  display: "swap",
});

export const metadata = {
  title: "초코조요!",
  description: SLOGAN,
  // icons: {
  // 	icon: "/favicon.png",
  // },
};

export const viewport = {
  width: "device-width",
  initialScae: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={myFont.className}>
        <Script src="https://developers.kakao.com/sdk/js/kakao.js" strategy="afterInteractive" />
        {children}
      </body>
    </html>
  );
}
