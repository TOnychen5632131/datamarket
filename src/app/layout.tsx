import { Suspense } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { createClient } from '@/utils/supabase/server';
import { UploadModal } from '@/components/modals/UploadModal';
import { AuthModal } from '@/components/modals/AuthModal';
import { WithdrawModal } from '@/components/modals/WithdrawModal';
import { MobileRestriction } from '@/components/layout/MobileRestriction';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DataMarket - AI Training Data",
  description: "Marketplace for high-quality AI training datasets",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#f4f7f6] text-gray-900`} suppressHydrationWarning>
        <MobileRestriction isAuthenticated={!!user} />
        <Suspense fallback={<div>Loading...</div>}>
          <UploadModal />
          <AuthModal />
          <WithdrawModal />
        </Suspense>
        <div className="flex min-h-screen">
          {user && <Sidebar />}
          <div className={`flex-1 flex flex-col ${user ? 'lg:ml-[260px]' : ''} w-full`}>
            {user && <Header />}
            <main className={`flex-1 ${user ? 'px-4 md:px-8 py-6' : ''} overflow-y-auto`}>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
