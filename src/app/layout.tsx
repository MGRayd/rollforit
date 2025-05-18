
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google'; // Using Inter as an example, can be Geist
import './globals.css';
import { cn } from '@/lib/utils';
import { GameProvider } from '@/contexts/GameContext';
import { Toaster } from "@/components/ui/toaster"; // For potential notifications

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans', // Changed from geist-sans to a more generic sans variable
});

// const geistMono = Geist_Mono({ // If Geist Mono is specifically needed
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

export const metadata: Metadata = {
  title: 'Roll For It! Companion',
  description: 'A digital companion for the Roll For It! board game.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
          // geistMono.variable // if geistMono is used
        )}
      >
        <GameProvider>
          <main className="container mx-auto p-4 flex-grow flex flex-col items-center">
            {children}
          </main>
          <Toaster />
        </GameProvider>
      </body>
    </html>
  );
}
