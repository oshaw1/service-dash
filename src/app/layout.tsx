import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Activity, Home, Plus, Settings } from "lucide-react";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Service-dash",
  description: "Monitor your network services and their status",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen  flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="w-full md:w-40 bg-card border-r border-border flex flex-col">
            <div className="flex items-center justify-center">
              <img src="/images/logo.svg" alt="Logo" className=" h-14 w-14" />
            </div>
            <div className="p-2 flex justify-center">
              <h1 className="ml-2 text-lg font-bold">Service-dash</h1>
            </div>
            <nav className="flex flex-col flex-grow px-2 py-4">
              <div>
                <Link
                  href="/"
                  className="flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </div>
              <div className="mt-auto">
                <Link
                  href="/settings"
                  className="flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </div>
            </nav>
          </aside>
          {/* Main content */}
          <main className="flex-1">
            <div className="p-4 sm:p-6 md:p-8">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
