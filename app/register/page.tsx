import { Suspense } from 'react';
import { RegisterClient } from '@/components/store/RegisterClient';

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <RegisterClient />
    </Suspense>
  );
}