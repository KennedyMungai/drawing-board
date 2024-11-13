import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import ModalsProvider from "@/providers/modals-provider";
import QueryProvider from "@/providers/query-provider";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Canva Clone",
  description: "A simple feature complete canva saas clone",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <QueryProvider>
            {children}
            <Toaster />
            <ModalsProvider />
          </QueryProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
