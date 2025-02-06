"use client";
import ShareLayout from '@/components/ShareLayout';
import { Suspense } from 'react';

export default function SharePage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ShareLayout />
    </Suspense>
  );
}
