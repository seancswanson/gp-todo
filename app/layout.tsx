import "./globals.css";
import localFont from "next/font/local";
import Link from "next/link";
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
      <body className={`${sansSerifFont.className} h-full bg-neutral-50`}>
        <header>
          <nav className="flex justify-between border-b border-black">
            <Link
              href="/"
              className={`${displayFont.className} border-r border-black px-6 pt-2 text-4xl tracking-wide`}
            >
              GP-TODO
            </Link>
            <div className="nav-actions flex items-center">
              <Link
                href="/profile"
                className="flex h-full items-center border-l border-black px-4 "
              >
                <img
                  src="https://api.dicebear.com/6.x/identicon/svg"
                  alt="avatar"
                  className="rounded-full border border-gray-500 bg-white transition-all duration-200 hover:border-black"
                  width={40}
                />
              </Link>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
