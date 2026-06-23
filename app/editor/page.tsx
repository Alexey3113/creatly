"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BuilderShell } from "@/components/editor/BuilderShell";
import { OnboardingTour } from "@/components/editor/OnboardingTour";
import { ToastProvider } from "@/components/editor/Toast";

interface UserData {
  id: number;
  username?: string;
  firstName?: string;
}

export default function EditorPage() {
  return (
    <Suspense fallback={<EditorLoading />}>
      <EditorPageInner />
    </Suspense>
  );
}

function EditorPageInner() {
  const router = useRouter();
  const params = useSearchParams();
  const [user, setUser] = useState<UserData | null>(null);
  const [ready, setReady] = useState(false);
  const [generatedSite, setGeneratedSite] = useState<{ html: string; css: string; js: string } | null>(null);
  const [showTour, setShowTour] = useState(false);

  const projectId = params.get("project") ? Number(params.get("project")) : null;
  const templateId = params.get("template");
  const uploadMode = params.get("upload") === "1";
  const isGenerated = params.get("generated") === "1";

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          if (isGenerated) {
            try {
              const stored = sessionStorage.getItem("sb_generated");
              if (stored) {
                setGeneratedSite(JSON.parse(stored));
                sessionStorage.removeItem("sb_generated");
              }
            } catch {}
          }
          setReady(true);
          if (!localStorage.getItem("sb_tour_done")) {
            setShowTour(true);
          }
        } else {
          router.replace("/auth");
        }
      })
      .catch(() => router.replace("/auth"));
  }, [router, isGenerated]);

  if (!ready) {
    return <EditorLoading />;
  }

  function completeTour() {
    localStorage.setItem("sb_tour_done", "1");
    setShowTour(false);
  }

  return (
    <ToastProvider>
      {showTour && <OnboardingTour onComplete={completeTour} />}
      <BuilderShell
        initialTemplateId={generatedSite ? null : templateId}
        uploadMode={uploadMode}
        generatedSite={generatedSite}
        editProjectId={projectId}
        user={user}
        onBackToGallery={() => router.push("/dashboard")}
        onBackToDashboard={() => router.push("/dashboard")}
      />
    </ToastProvider>
  );
}

function EditorLoading() {
  return (
    <div className="login-screen">
      <div className="login-card" style={{ opacity: 0.5 }}>
        <p style={{ color: "#94a3b8" }}>Загрузка редактора...</p>
      </div>
    </div>
  );
}
