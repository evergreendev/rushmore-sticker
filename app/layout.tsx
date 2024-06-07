import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import sticker1 from "@/public/sticker.png";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mt. Rushmore Classic Stickers",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <div className="flex flex-wrap items-center gap-8 w-full bg-blue-900 text-white">
        <div className="flex flex-wrap items-center gap-8 w-full bg-blue-900 text-white mx-auto max-w-screen-lg shadow">
            <Link href="/">
                <Image className="w-60" src={sticker1} alt=""/>
            </Link>
            <div className="font-bold">
                <h3 className="w-full text-4xl mb-3">$5 each</h3>
                <h3 className="w-full text-4xl mb-3">3 for $13</h3>
                <h3 className="w-full text-4xl mb-3">10 for $40</h3>
            </div>
        </div>
    </div>
    {children}
    </body>
    </html>
  );
}
