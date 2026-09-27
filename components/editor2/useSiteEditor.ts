"use client";

/**
 * Состояние редактора v2.
 *
 * Единственный источник правды — SiteDocument. Любое изменение — dispatch(ops).
 * `frameDoc` — снапшот, из которого построен iframe: текстовые правки
 * не перегружают iframe (DOM уже обновлён мостом или обновляется set-field),
 * структурные — перегружают.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { applyOps, type SiteOp } from "@/lib/site/ops";
import { createEmptyDocument, isSiteDocument, normalizeDocument } from "@/lib/site/create";
import type { SiteDocument } from "@/lib/site/types";

export interface Selection {
  blockId: string | null;
  field?: string;
  itemId?: string;
}

export interface DispatchOptions {
  /** false — не перегружать iframe (текстовые правки). По умолчанию true. */
  refresh?: boolean;
  /** false — не класть в undo-историю (сервисные операции). */
  history?: boolean;
}

const HISTORY_LIMIT = 60;

export function useSiteEditor(projectId: number | null, initialDocument?: SiteDocument | null) {
  const [doc, setDoc] = useState<SiteDocument | null>(null);
  const [frameDoc, setFrameDoc] = useState<SiteDocument | null>(null);
  const [dbId, setDbId] = useState<number | null>(projectId);
  const [loading, setLoading] = useState(true);
  const [selection, setSelection] = useState<Selection>({ blockId: null });
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);

  const undoStack = useRef<SiteDocument[]>([]);
  const redoStack = useRef<SiteDocument[]>([]);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const docRef = useRef<SiteDocument | null>(null);
  docRef.current = doc;

  // ── загрузка ──
  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!projectId) {
        const fresh = initialDocument && isSiteDocument(initialDocument) ? initialDocument : createEmptyDocument();
        if (!cancelled) { setDoc(fresh); setFrameDoc(fresh); setLoading(false); }
        return;
      }
      try {
        const res = await fetch(`/api/projects/${projectId}`);
        const data = await res.json();
        const document = data?.project?.document;
        const loaded = isSiteDocument(document) ? normalizeDocument(document) : createEmptyDocument(data?.project?.name || "Новый сайт");
        if (!cancelled) { setDoc(loaded); setFrameDoc(loaded); setDbId(projectId); setLoading(false); }
      } catch {
        if (!cancelled) { const fresh = createEmptyDocument(); setDoc(fresh); setFrameDoc(fresh); setLoading(false); }
      }
    }
    load();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- initialDocument читается только при первой загрузке
  }, [projectId]);

  // ── сохранение (debounce) ──
  const persist = useCallback(async (target: SiteDocument) => {
    setSaving(true);
    try {
      if (dbId) {
        await fetch(`/api/projects/${dbId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: target.name, document: target }),
        });
      } else {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: target.name, document: target }),
        });
        const data = await res.json();
        if (data?.project?.id) setDbId(data.project.id);
      }
      setDirty(false);
    } catch {
      // остаёмся dirty — следующая правка попробует ещё раз
    } finally {
      setSaving(false);
    }
  }, [dbId]);

  const scheduleSave = useCallback((target: SiteDocument) => {
    setDirty(true);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => persist(target), 1200);
  }, [persist]);

  // ── операции ──
  const dispatch = useCallback((ops: SiteOp[], options: DispatchOptions = {}) => {
    const current = docRef.current;
    if (!current) return { applied: 0, errors: ["no document"] };
    const result = applyOps(current, ops);
    if (result.errors.length) setLastError(result.errors.join("; "));
    if (!result.applied) return result;

    if (options.history !== false) {
      undoStack.current.push(current);
      if (undoStack.current.length > HISTORY_LIMIT) undoStack.current.shift();
      redoStack.current = [];
    }
    setDoc(result.doc);
    if (options.refresh !== false) setFrameDoc(result.doc);
    scheduleSave(result.doc);
    return result;
  }, [scheduleSave]);

  /** Полная замена документа (AI-копайлот вернул новый). */
  const replaceDocument = useCallback((next: SiteDocument) => {
    const current = docRef.current;
    if (current) {
      undoStack.current.push(current);
      redoStack.current = [];
    }
    setDoc(next);
    setFrameDoc(next);
    scheduleSave(next);
  }, [scheduleSave]);

  const undo = useCallback(() => {
    const prev = undoStack.current.pop();
    const current = docRef.current;
    if (!prev || !current) return;
    redoStack.current.push(current);
    setDoc(prev);
    setFrameDoc(prev);
    scheduleSave(prev);
  }, [scheduleSave]);

  const redo = useCallback(() => {
    const next = redoStack.current.pop();
    const current = docRef.current;
    if (!next || !current) return;
    undoStack.current.push(current);
    setDoc(next);
    setFrameDoc(next);
    scheduleSave(next);
  }, [scheduleSave]);

  const saveNow = useCallback(() => {
    const current = docRef.current;
    if (!current) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    persist(current);
  }, [persist]);

  return {
    doc, frameDoc, loading, dbId,
    selection, setSelection,
    dispatch, replaceDocument, undo, redo,
    canUndo: undoStack.current.length > 0,
    canRedo: redoStack.current.length > 0,
    dirty, saving, saveNow,
    lastError, clearError: () => setLastError(null),
  };
}
