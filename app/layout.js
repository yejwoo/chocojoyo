import "./globals.css";
import localFont from "next/font/local";
import Script from "next/script";

const myFont = localFont({
  src: "../public/fonts/meetme.ttf",
  display: "swap",
});

export const metadata = {
  title: "초코조요!",
  description: "소중한 사람에게 초콜릿을 선물해요",
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
