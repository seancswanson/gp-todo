import "./globals.css";
import localFont from "next/font/local";
import Link from "next/link";
import { TiUser } from "react-icons/ti";
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
    <html lang="en" className="h-screen">
      <body className={`${sansSerifFont.className} h-full`}>
        <header>
          <nav className="border-b border-black flex justify-between">
            <Link
              href="/"
              className={`${displayFont.className} border-r border-black px-6 py-2 tracking-wide text-4xl`}
            >
              GP-TODO
            </Link>
            <div className="nav-actions flex items-center">
              <Link
                href="/profile"
                className="border-l border-black h-full flex items-center"
              >
                <TiUser size={40} />
              </Link>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
