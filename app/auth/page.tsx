"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginScreen } from "@/components/auth/LoginScreen";

const BOT_USERNAME = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || "";

export default function AuthPage() {
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) router.replace("/dashboard");
      })
      .catch(() => {});
  }, [router]);

  function handleLogin() {
    router.push("/dashboard");
  }

  return <LoginScreen botUsername={BOT_USERNAME} onLogin={handleLogin} />;
}
