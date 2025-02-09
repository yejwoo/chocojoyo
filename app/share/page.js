"use client";

import CustomLoading from '@/components/CustomLoading';
import ShareLayout from '@/components/ShareLayout';
import { Suspense } from 'react';
export default function SharePage() {
  return (
    <Suspense fallback={CustomLoading}>
      <ShareLayout />
    </Suspense>
  );
}
