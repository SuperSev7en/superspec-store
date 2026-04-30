import { Suspense } from "react";
import { LoginClient } from "@/components/store/LoginClient";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <LoginClient />
    </Suspense>
  );
}
