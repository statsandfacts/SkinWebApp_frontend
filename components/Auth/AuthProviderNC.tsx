"use client";

import { useAuthInfo } from "@/hooks/useAuthInfo";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const publicRoutes = ["/login", "/sign-up", "/blog" ,"/blog/[id]", "/medicine/[id]"];

export function AuthProviderNC({ children }: { children: React.ReactNode }) {
  const { userId } = useAuthInfo();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isPublicRoute = publicRoutes.some((route) =>
      new RegExp(`^${route.replace("[id]", "\\d+")}$`).test(pathname)
    );

    if (!isPublicRoute) {
      if (userId) {
        router.replace("/dashboard");
      } else {
        router.replace("/");
      }
    }

  }, [userId, router, pathname]);

  return <>{children}</>;
}
