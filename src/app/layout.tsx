import { Suspense } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { UploadModal } from '@/components/modals/UploadModal';
import { AuthModal } from '@/components/modals/AuthModal';
import { WithdrawModal } from '@/components/modals/WithdrawModal';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DataMarket - AI Training Data",
  description: "Marketplace for high-quality AI training datasets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#f4f7f6] text-gray-900`} suppressHydrationWarning>
        <Suspense fallback={<div>Loading...</div>}>
          <UploadModal />
          <AuthModal />
          <WithdrawModal />
        </Suspense>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 ml-[260px] flex flex-col">
            <Header />
            <main className="flex-1 px-8 py-6 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
