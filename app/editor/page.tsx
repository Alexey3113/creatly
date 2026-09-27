"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { EditorShell } from "@/components/editor2/EditorShell";
import type { SiteDocument } from "@/lib/site/types";

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
  const [ready, setReady] = useState(false);
  const [generatedDoc, setGeneratedDoc] = useState<SiteDocument | null>(null);

  const projectId = params.get("project") ? Number(params.get("project")) : null;
  const isGenerated = params.get("generated") === "1";

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          if (isGenerated) {
            try {
              const stored = sessionStorage.getItem("sb_generated_doc");
              if (stored) {
                setGeneratedDoc(JSON.parse(stored));
                sessionStorage.removeItem("sb_generated_doc");
              }
            } catch {}
          }
          setReady(true);
        } else {
          router.replace("/auth");
        }
      })
      .catch(() => router.replace("/auth"));
  }, [router, isGenerated]);

  if (!ready) return <EditorLoading />;

  return (
    <EditorShell
      editProjectId={projectId}
      initialDocument={generatedDoc}
      onBackToDashboard={() => router.push("/dashboard")}
    />
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
