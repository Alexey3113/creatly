"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TemplateGallery } from "@/components/gallery/TemplateGallery";
import { BriefScreen } from "@/components/ai/BriefScreen";
import { GenerationProgress } from "@/components/ai/GenerationProgress";
import { OnboardingWizard, type OnboardingResult } from "@/components/onboarding/OnboardingWizard";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { templates, type TemplateInfo } from "@/lib/builder/templates";

type View = "loading" | "dashboard" | "onboarding" | "gallery" | "brief" | "generating";

interface UserData {
  id: number;
  username?: string;
  firstName?: string;
  photoUrl?: string;
}

interface GeneratedSite { html: string; css: string; js: string; }

export default function DashboardPage() {
  const router = useRouter();
  const [view, setView] = useState<View>("loading");
  const [user, setUser] = useState<UserData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateInfo | null>(null);
  const [genStage, setGenStage] = useState<"transcribing" | "analyzing" | "art-direction" | "generating" | "finalizing" | "done" | "error">("transcribing");
  const [genError, setGenError] = useState("");
  const [genConcept, setGenConcept] = useState("");
  const [, setOnboardingResult] = useState<OnboardingResult | null>(null);

  useEffect(() => {
    const tg = (window as unknown as Record<string, unknown>).Telegram as Record<string, unknown> | undefined;
    const webApp = tg?.WebApp as Record<string, unknown> | undefined;

    if (webApp?.initData) {
      fetch("/api/auth/miniapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ initData: webApp.initData }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.user) { setUser(data.user); setView("dashboard"); }
          else router.replace("/auth");
        })
        .catch(() => router.replace("/auth"));
      return;
    }

    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) { setUser(data.user); setView("dashboard"); }
        else router.replace("/auth");
      })
      .catch(() => router.replace("/auth"));
  }, [router]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/auth");
  }

  function handleNewProject() {
    setView("onboarding");
  }

  function handleEditProject(id: number) {
    router.push(`/editor?project=${id}`);
  }

  function handleOnboardingComplete(result: OnboardingResult) {
    setOnboardingResult(result);
    setView("gallery");
  }

  function handleSelectTemplate(id: string) {
    setSelectedTemplate(templates.find((t) => t.id === id) || null);
    router.push(`/editor?template=${id}`);
  }

  function handleAIGenerate(id: string) {
    // id === "none" → генерация без шаблона (дизайн с нуля)
    setSelectedTemplate(id === "none" ? null : templates.find((t) => t.id === id) || null);
    setView("brief");
  }

  function handleUpload() {
    router.push("/editor?upload=1");
  }

  const handleBriefSubmit = useCallback(async (data: { audioBlob?: Blob; textBrief: string; templateId: string; scrapedData?: { title: string; description: string; headings: string[]; paragraphs: string[]; contacts: string[] } }) => {
    setView("generating");
    setGenStage("transcribing");
    setGenError("");

    let brief = data.textBrief;

    if (data.audioBlob) {
      try {
        const formData = new FormData();
        formData.append("audio", data.audioBlob, "recording.webm");
        const res = await fetch("/api/ai/transcribe", { method: "POST", body: formData });
        if (!res.ok) { setGenStage("error"); setGenError("Ошибка транскрипции (сервер вернул " + res.status + ")"); return; }
        const json = await res.json();
        if (!json.text) { setGenStage("error"); setGenError(json.error || "Ошибка транскрипции"); return; }
        brief = json.text;
      } catch (err) { setGenStage("error"); setGenError(`Ошибка: ${err}`); return; }
    }

    setGenStage("analyzing");

    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brief, templateId: data.templateId, scrapedData: data.scrapedData }),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        setGenStage("error");
        setGenError(`Ошибка подключения к AI (${res.status}): ${text.slice(0, 200)}`);
        return;
      }
      if (!res.body) { setGenStage("error"); setGenError("Ошибка подключения к AI: пустой ответ"); return; }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const msg = JSON.parse(line.slice(6));
            // "art-direction-done" несёт концепцию, но не двигает прогресс —
            // подсветку оставляем на этапе art-direction до прихода "generating".
            if (msg.stage === "art-direction-done") {
              if (msg.concept) setGenConcept(msg.concept);
            } else if (msg.stage) {
              setGenStage(msg.stage);
              if (msg.concept) setGenConcept(msg.concept);
            }
            if (msg.error) setGenError(msg.error);
            if (msg.stage === "done" && msg.result) {
              const generated = msg.result as GeneratedSite;
              sessionStorage.setItem("sb_generated", JSON.stringify(generated));
              setTimeout(() => router.push("/editor?generated=1"), 1000);
            }
          } catch {}
        }
      }
    } catch (err) { setGenStage("error"); setGenError(`Ошибка: ${err}`); }
  }, [router]);

  if (view === "loading") {
    return (
      <div className="login-screen">
        <div className="login-card" style={{ opacity: 0.5 }}>
          <div className="login-logo">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="12" fill="#6366f1" />
              <path d="M12 20l6-8h4l-6 8 6 8h-4l-6-8zm10 0l6-8h4l-6 8 6 8h-4l-6-8z" fill="#fff" fillOpacity=".9" />
            </svg>
          </div>
          <p style={{ color: "#94a3b8" }}>Загрузка...</p>
        </div>
      </div>
    );
  }

  if (view === "dashboard" && user) {
    return <Dashboard user={user} onNewProject={handleNewProject} onEditProject={handleEditProject} onLogout={handleLogout} />;
  }

  if (view === "onboarding") {
    return <OnboardingWizard onComplete={handleOnboardingComplete} onSkip={() => setView("gallery")} />;
  }

  if (view === "gallery") {
    return <TemplateGallery onSelect={handleSelectTemplate} onUpload={handleUpload} onAIGenerate={handleAIGenerate} />;
  }

  if (view === "brief") {
    return <BriefScreen template={selectedTemplate} onSubmit={handleBriefSubmit} onBack={() => setView("gallery")} />;
  }

  if (view === "generating") {
    return <GenerationProgress stage={genStage} error={genError} concept={genConcept} />;
  }

  return null;
}
