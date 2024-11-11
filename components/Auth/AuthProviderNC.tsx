"use client";

import { useAuthInfo } from "@/hooks/useAuthInfo";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AuthProviderNC({ children }: { children: React.ReactNode }) {
  const { userId } = useAuthInfo();
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      router.replace("/dashboard");
    } else {
      router.replace("/");
    }
  }, [userId, router]);

  return <>{children}</>;
}
