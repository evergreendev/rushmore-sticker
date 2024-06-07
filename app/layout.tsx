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
    <div className="flex flex-wrap items-center w-full bg-[#ffc387] text-white">
        <div className="flex flex-wrap items-center justify-center w-full bg-[#4e8eae] text-white mx-auto max-w-screen-xl shadow">
            <h2 className="text-6xl font-bold w-full text-center mt-8 mb-6">GET YOUR LIMITED EDITION MT RUSHMORE CLASSIC STICKERS</h2>
            <Link href="/">
                <Image className="w-96 -mb-36 -mt-8" src={sticker1} alt=""/>
            </Link>
            <div className="font-bold">

                <h3 className="w-full text-6xl mb-1">$5 each</h3>
                <h3 className="w-full text-6xl mb-1">3 for $13</h3>
                <h3 className="w-full text-6xl mb-1">10 for $40</h3>
            </div>
        </div>
    </div>
    {children}
    </body>
    </html>
  );
}
