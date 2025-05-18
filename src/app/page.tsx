
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/setup');
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <p>Loading Roll For It! Companion...</p>
      {/* Optional: Add a loading spinner or a nicer loading message */}
    </div>
  );
}
