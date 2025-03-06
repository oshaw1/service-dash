import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Activity, Home, History, Plus, Settings } from "lucide-react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Service Monitor Dashboard",
  description: "Monitor your network services and their status",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <Activity className="h-8 w-8 text-blue-600" />
                <h1 className="ml-2 text-xl font-bold">Service-dash</h1>
              </div>
              <nav className="flex space-x-4">
                <Link 
                  href="/" 
                  className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
                <Link 
                  href="/" 
                  className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </nav>
            </div>
          </div>
        </header>
        <main className="flex-1 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
        <footer className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-4 text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Service Monitor
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}