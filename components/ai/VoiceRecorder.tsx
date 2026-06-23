"use client";

import { useRef, useState, useEffect } from "react";

interface VoiceRecorderProps {
  onRecorded: (blob: Blob) => void;
}

export function VoiceRecorder({ onRecorded }: VoiceRecorderProps) {
  const [state, setState] = useState<"idle" | "recording" | "done">("idle");
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream, { mimeType: "audio/webm;codecs=opus" });
    mediaRef.current = recorder;
    chunksRef.current = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      stream.getTracks().forEach((t) => t.stop());
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      setState("done");
      onRecorded(blob);
    };

    recorder.start(250);
    setState("recording");
    setDuration(0);
    timerRef.current = setInterval(() => setDuration((d) => d + 1), 1000);
  }

  function stopRecording() {
    if (timerRef.current) clearInterval(timerRef.current);
    mediaRef.current?.stop();
  }

  function reset() {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setState("idle");
    setDuration(0);
  }

  const mins = String(Math.floor(duration / 60)).padStart(2, "0");
  const secs = String(duration % 60).padStart(2, "0");

  return (
    <div className="voice-recorder">
      {state === "idle" && (
        <button className="voice-btn voice-btn--start" type="button" onClick={startRecording}>
          <span className="voice-btn__icon">&#9679;</span>
          Начать запись
        </button>
      )}

      {state === "recording" && (
        <div className="voice-recording">
          <div className="voice-pulse" />
          <span className="voice-timer">{mins}:{secs}</span>
          <button className="voice-btn voice-btn--stop" type="button" onClick={stopRecording}>
            Остановить
          </button>
        </div>
      )}

      {state === "done" && audioUrl && (
        <div className="voice-done">
          <audio src={audioUrl} controls className="voice-audio" />
          <div className="voice-done__actions">
            <span className="voice-done__duration">{mins}:{secs}</span>
            <button className="button" type="button" onClick={reset}>Перезаписать</button>
          </div>
        </div>
      )}
    </div>
  );
}
