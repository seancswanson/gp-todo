import "./globals.css";
import localFont from "next/font/local";
import Link from "next/link";
// Font files can be colocated inside of `pages`
const displayFont = localFont({
  src: "./fonts/Commune-Nuit-Debout-master/fonts/webfonts/NuitDebout/Commune-Nuit_Debout_web.woff2",
});
const sansSerifFont = localFont({
  src: "./fonts/karrik_fonts-main/fonts/Web/WOFF/Karrik-Regular.woff",
});

export const metadata = {
  title: "GP-TODO",
  description: "Win the day with GP-TODO",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={sansSerifFont.className}>{children}</body>
    </html>
  );
}
