import "./globals.css";
import localFont from "next/font/local";
import Script from "next/script";

const myFont = localFont({
  src: "./fonts/meetme.ttf",
  display: "swap",
});

export const metadata = {
  title: "초코조요!",
  description: "나만의 초콜릿을 만들어 사랑과 감사를 전하세요. 맞춤형 초콜릿 디자인으로 특별한 순간을 공유하세요.",
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
