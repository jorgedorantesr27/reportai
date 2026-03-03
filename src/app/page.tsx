"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer
} from "recharts";
import {
  Upload, FileSpreadsheet, Palette, FileText,
  Download, Sparkles, Eye,
  BarChart3, TrendingUp, MessageSquare, Users, Globe,
  RefreshCw, Minus,
  Target, Lightbulb, ThumbsUp, ThumbsDown, LayoutTemplate, DollarSign,
  Newspaper, Radio, Tv, Monitor, BookOpen
} from "lucide-react";
import * as XLSX from "xlsx";

/* ═══════ SOCIAL ICONS SVG ═══════ */
function IconX() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>; }
function IconFB() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>; }
function IconIG() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>; }
function IconTT() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.43v-7.15a8.16 8.16 0 005.58 2.2v-3.4a4.85 4.85 0 01-1-.18z"/></svg>; }
function IconYT() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>; }

const socialIcons: Record<string, React.ReactNode> = { X: <IconX />, Facebook: <IconFB />, Instagram: <IconIG />, TikTok: <IconTT />, YouTube: <IconYT /> };
const mediaIcons: Record<string, React.ReactNode> = { "Periódico": <Newspaper size={16} color="white" />, Internet: <Monitor size={16} color="white" />, Radio: <Radio size={16} color="white" />, "Televisión": <Tv size={16} color="white" />, Revista: <BookOpen size={16} color="white" /> };
const srcC: Record<string, string> = { X: "#000000", Facebook: "#1877f2", Instagram: "#e4405f", TikTok: "#010101", YouTube: "#ff0000", "Periódico": "#8b5cf6", Internet: "#3b82f6", Radio: "#f59e0b", "Televisión": "#ec4899", Revista: "#14b8a6" };
const VALID_MEDIA_TYPES = ["Periódico", "Revista", "Televisión", "Radio", "Internet"];
const VALID_SOCIAL = ["X", "Facebook", "Instagram", "TikTok", "YouTube"];

/* ═══════ TYPES ═══════ */
interface SocialRow { Fecha: string; Fuente: string; Autor: string; Sentimiento: string; Alcance: number; Likes: number; Comentarios: number; Compartidos: number; Contenido: string; Link: string; Seguidores: number; }
interface MediaRow { Titulo: string; Texto: string; Autor: string; Fecha: string; Medio: string; TipoMedio: string; Sentimiento: string; Alcance: number; Tier: string; Costo: number; Link: string; }
interface Brand { name: string; primaryColor: string; secondaryColor: string; accentColor: string; positiveColor: string; negativeColor: string; neutralColor: string; chartColors: string[]; titleFont: string; bodyFont: string; }
interface TrendRow { date: string; total: number; Positivo: number; Negativo: number; Neutro: number; [key: string]: string | number; }
interface FuenteRow { fuente: string; Positivo: number; Negativo: number; Neutro: number; total: number; }
interface KpiFuente { fuente: string; menciones: number; interacciones: number; impresiones: number; lideres: number; costo: number; }
interface MencionTop { autor: string; contenido: string; link: string; fuente: string; alcance: number; }
interface PData {
  dataType: "social" | "media"; totalMenciones: number; totalAlcance: number; totalInteracciones: number; autoresUnicos: number; totalCosto: number;
  sentCounts: { Positivo: number; Negativo: number; Neutro: number }; sentNeto: number;
  trendData: TrendRow[]; fuenteData: FuenteRow[]; kpiByFuente: KpiFuente[];
  topPositivas: MencionTop[]; topNegativas: MencionTop[];
  rawRows: (SocialRow | MediaRow)[];
}

/* ═══════ PROCESSING ═══════ */
function processSocial(rows: SocialRow[]): PData {
  const filtered = rows.filter(r => VALID_SOCIAL.includes(r.Fuente));
  const n = filtered.length;
  const alc = filtered.reduce((s, r) => s + (r.Alcance || 0), 0);
  const inter = filtered.reduce((s, r) => s + (r.Likes || 0) + (r.Comentarios || 0) + (r.Compartidos || 0), 0);
  const uniq = new Set(filtered.map(r => r.Autor)).size;
  const sc: { Positivo: number; Negativo: number; Neutro: number } = { Positivo: 0, Negativo: 0, Neutro: 0 };
  filtered.forEach(r => { if (r.Sentimiento === "Positivo" || r.Sentimiento === "Negativo" || r.Sentimiento === "Neutro") sc[r.Sentimiento]++; });
  const sn = n > 0 ? ((sc.Positivo - sc.Negativo) / n) * 100 : 0;

  const dm: Record<string, TrendRow> = {};
  filtered.forEach(r => {
    const d = r.Fecha?.substring(0, 10); if (!d) return;
    if (!dm[d]) { const entry: TrendRow = { date: d, total: 0, Positivo: 0, Negativo: 0, Neutro: 0 }; VALID_SOCIAL.forEach(s => { entry[s] = 0; }); dm[d] = entry; }
    dm[d].total++;
    if (r.Sentimiento === "Positivo" || r.Sentimiento === "Negativo" || r.Sentimiento === "Neutro") (dm[d][r.Sentimiento] as number)++;
    if (VALID_SOCIAL.includes(r.Fuente)) (dm[d][r.Fuente] as number)++;
  });
  const td = Object.values(dm).sort((a, b) => a.date.localeCompare(b.date));

  const fm: Record<string, FuenteRow> = {};
  filtered.forEach(r => { const f = r.Fuente; if (!fm[f]) fm[f] = { fuente: f, Positivo: 0, Negativo: 0, Neutro: 0, total: 0 }; fm[f].total++; if (r.Sentimiento === "Positivo" || r.Sentimiento === "Negativo" || r.Sentimiento === "Neutro") fm[f][r.Sentimiento]++; });
  const fd = Object.values(fm).sort((a, b) => b.total - a.total);

  const km: Record<string, { fuente: string; menciones: number; interacciones: number; impresiones: number; autores: Set<string> }> = {};
  filtered.forEach(r => { const f = r.Fuente; if (!km[f]) km[f] = { fuente: f, menciones: 0, interacciones: 0, impresiones: 0, autores: new Set() }; km[f].menciones++; km[f].interacciones += (r.Likes || 0) + (r.Comentarios || 0) + (r.Compartidos || 0); km[f].impresiones += r.Alcance || 0; km[f].autores.add(r.Autor); });
  const kf = Object.values(km).map(k => ({ fuente: k.fuente, menciones: k.menciones, interacciones: k.interacciones, impresiones: k.impresiones, lideres: k.autores.size, costo: 0 })).sort((a, b) => b.menciones - a.menciones);

  const seen = new Set<string>();
  const tp = filtered.filter(r => r.Sentimiento === "Positivo").sort((a, b) => (b.Alcance || 0) - (a.Alcance || 0)).filter(r => { const k = r.Autor + r.Contenido; if (seen.has(k)) return false; seen.add(k); return true; }).slice(0, 4).map(r => ({ autor: r.Autor, contenido: r.Contenido || "", link: r.Link || "", fuente: r.Fuente, alcance: r.Alcance || 0 }));
  const seen2 = new Set<string>();
  const tn = filtered.filter(r => r.Sentimiento === "Negativo").sort((a, b) => (b.Alcance || 0) - (a.Alcance || 0)).filter(r => { const k = r.Autor + r.Contenido; if (seen2.has(k)) return false; seen2.add(k); return true; }).slice(0, 4).map(r => ({ autor: r.Autor, contenido: r.Contenido || "", link: r.Link || "", fuente: r.Fuente, alcance: r.Alcance || 0 }));

  return { dataType: "social", totalMenciones: n, totalAlcance: alc, totalInteracciones: inter, autoresUnicos: uniq, totalCosto: 0, sentCounts: sc, sentNeto: sn, trendData: td, fuenteData: fd, kpiByFuente: kf, topPositivas: tp, topNegativas: tn, rawRows: filtered };
}

function processMedia(rows: MediaRow[]): PData {
  const filtered = rows.filter(r => VALID_MEDIA_TYPES.includes(r.TipoMedio));
  const n = filtered.length;
  const alc = filtered.reduce((s, r) => s + (r.Alcance || 0), 0);
  const costTotal = filtered.reduce((s, r) => s + (r.Costo || 0), 0);
  const uniq = new Set(filtered.map(r => r.Medio)).size;
  const sc: { Positivo: number; Negativo: number; Neutro: number } = { Positivo: 0, Negativo: 0, Neutro: 0 };
  filtered.forEach(r => { if (r.Sentimiento === "Positivo" || r.Sentimiento === "Negativo" || r.Sentimiento === "Neutro") sc[r.Sentimiento]++; });
  const sn = n > 0 ? ((sc.Positivo - sc.Negativo) / n) * 100 : 0;

  const dm: Record<string, TrendRow> = {};
  filtered.forEach(r => {
    const d = r.Fecha?.substring(0, 10); if (!d) return;
    if (!dm[d]) { const entry: TrendRow = { date: d, total: 0, Positivo: 0, Negativo: 0, Neutro: 0 }; VALID_MEDIA_TYPES.forEach(t => { entry[t] = 0; }); dm[d] = entry; }
    dm[d].total++;
    if (r.Sentimiento === "Positivo" || r.Sentimiento === "Negativo" || r.Sentimiento === "Neutro") (dm[d][r.Sentimiento] as number)++;
    if (VALID_MEDIA_TYPES.includes(r.TipoMedio)) (dm[d][r.TipoMedio] as number)++;
  });
  const td = Object.values(dm).sort((a, b) => a.date.localeCompare(b.date));

  const fm: Record<string, FuenteRow> = {};
  filtered.forEach(r => { const f = r.TipoMedio; if (!fm[f]) fm[f] = { fuente: f, Positivo: 0, Negativo: 0, Neutro: 0, total: 0 }; fm[f].total++; if (r.Sentimiento === "Positivo" || r.Sentimiento === "Negativo" || r.Sentimiento === "Neutro") fm[f][r.Sentimiento]++; });
  const fd = Object.values(fm).sort((a, b) => b.total - a.total);

  const km: Record<string, { fuente: string; menciones: number; impresiones: number; costo: number; autores: Set<string> }> = {};
  filtered.forEach(r => { const f = r.TipoMedio; if (!km[f]) km[f] = { fuente: f, menciones: 0, impresiones: 0, costo: 0, autores: new Set() }; km[f].menciones++; km[f].impresiones += r.Alcance || 0; km[f].costo += r.Costo || 0; km[f].autores.add(r.Medio); });
  const kf = Object.values(km).map(k => ({ fuente: k.fuente, menciones: k.menciones, interacciones: 0, impresiones: k.impresiones, lideres: k.autores.size, costo: k.costo })).sort((a, b) => b.menciones - a.menciones);

  const seen = new Set<string>();
  const tp = filtered.filter(r => r.Sentimiento === "Positivo").sort((a, b) => (b.Alcance || 0) - (a.Alcance || 0)).filter(r => { const k = r.Medio + r.Titulo; if (seen.has(k)) return false; seen.add(k); return true; }).slice(0, 4).map(r => ({ autor: r.Medio, contenido: r.Titulo || (r.Texto ? r.Texto.substring(0, 200) : ""), link: r.Link || "", fuente: r.TipoMedio, alcance: r.Alcance || 0 }));
  const seen2 = new Set<string>();
  const tn = filtered.filter(r => r.Sentimiento === "Negativo").sort((a, b) => (b.Alcance || 0) - (a.Alcance || 0)).filter(r => { const k = r.Medio + r.Titulo; if (seen2.has(k)) return false; seen2.add(k); return true; }).slice(0, 4).map(r => ({ autor: r.Medio, contenido: r.Titulo || (r.Texto ? r.Texto.substring(0, 200) : ""), link: r.Link || "", fuente: r.TipoMedio, alcance: r.Alcance || 0 }));

  return { dataType: "media", totalMenciones: n, totalAlcance: alc, totalInteracciones: 0, autoresUnicos: uniq, totalCosto: costTotal, sentCounts: sc, sentNeto: sn, trendData: td, fuenteData: fd, kpiByFuente: kf, topPositivas: tp, topNegativas: tn, rawRows: filtered };
}

function fmt(n: number): string { if (n >= 1e6) return (n / 1e6).toFixed(1) + "M"; if (n >= 1e3) return (n / 1e3).toFixed(1) + "K"; return String(n); }
function fmtMoney(n: number): string { if (n >= 1e6) return "$" + (n / 1e6).toFixed(1) + "M"; if (n >= 1e3) return "$" + (n / 1e3).toFixed(1) + "K"; return "$" + n.toLocaleString(); }

/* ═══════ EXCEL PARSER ═══════ */
function parseExcel(file: File): Promise<{ social: SocialRow[]; media: MediaRow[] }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const wb = XLSX.read(data, { type: "array" });
        const social: SocialRow[] = []; const media: MediaRow[] = [];
        wb.SheetNames.forEach(name => {
          const json = XLSX.utils.sheet_to_json(wb.Sheets[name]) as Record<string, unknown>[];
          if (!json.length) return;
          const cols = Object.keys(json[0]);
          const isMedia = cols.some(c => c.toLowerCase().includes("tipo de medio") || c.toLowerCase().includes("tier"));
          const isSocial = cols.some(c => c.toLowerCase().includes("plataforma") || c.toLowerCase().includes("me gusta"));
          if (isMedia && !isSocial) {
            json.forEach(row => {
              const mf = row["Fecha"]; let mfs = "";
              if (typeof mf === "number") { const dd = XLSX.SSF.parse_date_code(mf); mfs = dd.y + "-" + String(dd.m).padStart(2, "0") + "-" + String(dd.d).padStart(2, "0"); } else { mfs = String(mf || "").substring(0, 10); }
              media.push({ Titulo: String(row["Titulo"] || row["Título"] || ""), Texto: String(row["Texto"] || ""), Autor: String(row["Autor"] || ""), Fecha: mfs, Medio: String(row["Nombre del Medio"] || ""), TipoMedio: String(row["Tipo de Medio"] || ""), Sentimiento: String(row["Sentimiento"] || ""), Alcance: Number(row["Alcance"] || 0), Tier: String(row["Tier"] || ""), Costo: Number(row["Costo"] || 0), Link: String(row["Link de Nota"] || row["Link URL Medio"] || "") }); });
          } else if (isSocial) {
            json.forEach(row => {
              const f = row["Fecha"]; let fs = "";
              if (typeof f === "number") { const d = XLSX.SSF.parse_date_code(f); fs = d.y + "-" + String(d.m).padStart(2, "0") + "-" + String(d.d).padStart(2, "0"); } else { fs = String(f || "").substring(0, 10); }
              social.push({ Fecha: fs, Fuente: String(row["Plataforma"] || row["Fuente"] || ""), Autor: String(row["Usuario"] || row["Autor"] || ""), Sentimiento: String(row["Sentimiento (Red Social)"] || row["Sentimiento"] || ""), Alcance: Number(row["Seguidores del Autor"] || row["Alcance"] || 0), Likes: Number(row["Me Gusta / Likes"] || row["Likes"] || 0), Comentarios: Number(row["Comentarios"] || 0), Compartidos: Number(row["Compartidos"] || 0), Contenido: String(row["Contenido"] || ""), Link: String(row["Link URL Medio"] || ""), Seguidores: Number(row["Seguidores del Autor"] || 0) });
            });
          }
        });
        resolve({ social, media });
      } catch (err) { reject(err); }
    };
    reader.onerror = reject; reader.readAsArrayBuffer(file);
  });
}

/* ═══════ AI TEXTS ═══════ */
function aiResumen(d: PData): string {
  const t = d.dataType === "social" ? "publicaciones en redes sociales" : "notas en medios tradicionales";
  const pp = d.totalMenciones > 0 ? ((d.sentCounts.Positivo / d.totalMenciones) * 100).toFixed(0) : "0";
  const np = d.totalMenciones > 0 ? ((d.sentCounts.Negativo / d.totalMenciones) * 100).toFixed(0) : "0";
  const up = d.totalMenciones > 0 ? ((d.sentCounts.Neutro / d.totalMenciones) * 100).toFixed(0) : "0";
  const tf = d.fuenteData[0];
  return "Durante el periodo se registraron " + d.totalMenciones + " " + t + " con alcance de " + fmt(d.totalAlcance) + " impresiones" + (d.dataType === "social" ? " y " + fmt(d.totalInteracciones) + " interacciones" : " y un costo estimado de " + fmtMoney(d.totalCosto)) + ". Sentimiento: " + pp + "% positivo, " + np + "% negativo y " + up + "% neutro (Neto: " + d.sentNeto.toFixed(1) + "%). " + (tf ? tf.fuente + " concentra " + tf.total + " menciones." : "") + " Se identificaron " + d.autoresUnicos + " " + (d.dataType === "social" ? "autores" : "medios") + ".";
}
function aiPicos(d: PData): string {
  if (!d.trendData.length) return "Sin datos suficientes.";
  const mx = d.trendData.reduce((m, x) => x.total > m.total ? x : m, d.trendData[0]);
  const lb = d.dataType === "social" ? "publicaciones" : "notas";
  return "Pico maximo el " + mx.date + " con " + mx.total + " " + lb + ", sugiriendo un evento detonador (anuncio, nota viral o comunicado).";
}
function aiSent(d: PData): string {
  const dom = d.sentCounts.Positivo > d.sentCounts.Negativo ? "positivo" : d.sentCounts.Negativo > d.sentCounts.Positivo ? "negativo" : "equilibrado";
  return "Sentimiento " + dom + " predomina. " + (dom === "positivo" ? "Recepcion favorable; monitorear menciones negativas." : dom === "negativo" ? "Requiere atencion en estrategia de comunicacion." : "Conversacion polarizada; monitoreo constante.") + " Sentimiento Neto: " + d.sentNeto.toFixed(1) + "%.";
}
function aiFuentes(d: PData): string {
  const t = d.fuenteData[0]; if (!t) return "";
  return t.fuente + " lidera con " + t.total + " menciones (" + (d.totalMenciones > 0 ? ((t.total / d.totalMenciones) * 100).toFixed(0) : "0") + "%). " + (d.fuenteData.length > 1 ? "Seguido por " + d.fuenteData[1].fuente + " con " + d.fuenteData[1].total + "." : "");
}
function aiTendSent(d: PData): string {
  if (!d.trendData.length) return "";
  const l = d.trendData[d.trendData.length - 1]; const f = d.trendData[0];
  return "Evolucion: " + (l.Positivo > f.Positivo ? "tendencia ascendente en positivas" : "estabilidad en positivas") + ". " + (l.Negativo > f.Negativo ? "Negativas en incremento." : "Negativas estables o en descenso.");
}
function aiTemas(d: PData): { tema: string; detalle: string; link: string }[] {
  const links = d.rawRows.map(r => { if ("Link" in r) return (r as SocialRow).Link || (r as MediaRow).Link || ""; return ""; }).filter(Boolean);
  return [
    { tema: "Tematica principal", detalle: "De " + d.totalMenciones + " menciones, la mayoria gira en torno al tema central monitoreado.", link: links[0] || "" },
    { tema: "Narrativa secundaria", detalle: "Conversacion complementaria que agrega contexto o debate adicional.", link: links[1] || "" },
    { tema: "Aspectos operativos", detalle: "Parte de la audiencia se enfoca en aspectos practicos y logisticos.", link: links[2] || "" },
  ];
}

/* ═══════ DEFAULTS ═══════ */
const DB: Brand = { name: "GDP Monitoreo", primaryColor: "#1a1a2e", secondaryColor: "#16213e", accentColor: "#0f3460", positiveColor: "#10b981", negativeColor: "#ef4444", neutralColor: "#94a3b8", chartColors: ["#3b82f6", "#8b5cf6", "#f59e0b", "#ec4899", "#14b8a6"], titleFont: "'Outfit', sans-serif", bodyFont: "'DM Sans', sans-serif" };

/* ═══════ CUSTOM LABEL FOR BAR ═══════ */


/* ═══════ COMPONENTS ═══════ */
function KPI({ title, value, icon, color, brand }: { title: string; value: string | number; icon: React.ReactNode; color: string; brand: Brand }) {
  return (<div className="bg-white rounded-2xl p-4 border border-gray-100 flex-1 min-w-[160px]" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}><div className="flex justify-between items-center mb-1.5"><span className="text-[10px] text-gray-400 font-medium">{title}</span><div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: color + "18" }}>{icon}</div></div><div className="text-2xl font-bold" style={{ color: brand.primaryColor, fontFamily: brand.titleFont }}>{value}</div></div>);
}

function Donut(pp: { data: { Positivo: number; Negativo: number; Neutro: number }; brand: Brand; title?: string }) {
  const total = pp.data.Positivo + pp.data.Negativo + pp.data.Neutro;
  if (total === 0) return null;
  const cd = [
    { name: "Positivo", value: pp.data.Positivo, color: pp.brand.positiveColor },
    { name: "Negativo", value: pp.data.Negativo, color: pp.brand.negativeColor },
    { name: "Neutro", value: pp.data.Neutro, color: pp.brand.neutralColor },
  ];
  return (
    <div className="flex flex-col items-center">
      {pp.title && <div className="text-xs font-bold text-gray-700 mb-1.5">{pp.title}</div>}
      <PieChart width={160} height={160}>
        <Pie data={cd} cx={80} cy={80} innerRadius={35} outerRadius={68} paddingAngle={3} dataKey="value" stroke="none">
          {cd.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
        </Pie>
        <text x={80} y={77} textAnchor="middle" dominantBaseline="central" fontSize={16} fontWeight={700} fill="#1a1a2e">{total}</text>
        <text x={80} y={93} textAnchor="middle" dominantBaseline="central" fontSize={9} fill="#94a3b8">notas</text>
      </PieChart>
      <div className="flex gap-2 mt-1.5">
        {cd.map((item, idx) => (
          <div key={idx} className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm" style={{ background: item.color }} />
            <span className="text-[10px] font-bold" style={{ color: item.color }}>
              {item.value} ({((item.value / total) * 100).toFixed(0)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIBlock({ text, brand, loading }: { text: string; brand: Brand; loading: boolean }) {
  return (<div className="rounded-xl p-4" style={{ background: "linear-gradient(135deg, #f0f9ff 0%, #f5f3ff 100%)", borderLeft: "4px solid " + brand.accentColor }}><div className="flex items-center gap-1.5 mb-2"><Sparkles size={13} color={brand.accentColor} /><span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: brand.accentColor }}>Analisis IA</span></div>{loading ? <div className="flex gap-1.5 py-2">{[0, 1, 2].map(i => <div key={i} className="w-2 h-2 rounded-full" style={{ background: brand.accentColor, animation: "pulse 1.2s ease-in-out " + (i * 0.2) + "s infinite" }} />)}</div> : <p className="text-sm leading-relaxed text-gray-700">{text}</p>}</div>);
}

function Sec({ title, icon, children, brand }: { title: string; icon: React.ReactNode; children: React.ReactNode; brand: Brand }) {
  return (<div className="bg-white rounded-2xl p-6 border border-gray-100" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}><div className="flex items-center gap-2.5 mb-5"><div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: brand.accentColor + "12" }}>{icon}</div><h2 className="text-base font-bold" style={{ color: brand.primaryColor, fontFamily: brand.titleFont }}>{title}</h2></div>{children}</div>);
}

function MenCard({ autor, contenido, link, fuente, alcance, brand, tipo }: { autor: string; contenido: string; link: string; fuente: string; alcance: number; brand: Brand; tipo: "positivo" | "negativo" }) {
  const c = tipo === "positivo" ? brand.positiveColor : brand.negativeColor;
  return (<div className="rounded-xl p-3.5 border" style={{ borderColor: c + "30", background: c + "06" }}><div className="flex justify-between items-start mb-1.5"><div className="flex items-center gap-1.5">{tipo === "positivo" ? <ThumbsUp size={12} color={c} /> : <ThumbsDown size={12} color={c} />}<span className="text-xs font-bold text-gray-800">{autor}</span></div><span className="text-[9px] px-2 py-0.5 rounded-full font-medium" style={{ background: c + "18", color: c }}>{fuente}</span></div><p className="text-[11px] text-gray-600 leading-relaxed mb-1.5">{contenido.substring(0, 160)}{contenido.length > 160 ? "..." : ""}</p><div className="flex justify-between items-center">{link && link !== "undefined" && <a href={link} target="_blank" rel="noopener noreferrer" className="text-[10px] font-semibold" style={{ color: brand.accentColor }}>Ver original</a>}<span className="text-[9px] text-gray-400">{fmt(alcance)} alcance</span></div></div>);
}

function CInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (<div className="flex items-center gap-2"><input type="color" value={value} onChange={e => onChange(e.target.value)} className="w-8 h-8 border-2 border-gray-200 rounded-md cursor-pointer p-0" /><div><div className="text-[11px] font-medium text-gray-500">{label}</div><div className="text-[9px] text-gray-400 font-mono">{value}</div></div></div>);
}

/* ═══════ MAIN ═══════ */
export default function Home() {
  const [view, setView] = useState("home");
  const [pd, setPd] = useState<PData | null>(null);
  const [brand, setBrand] = useState<Brand>(DB);
  const [reportTitle, setReportTitle] = useState("Reporte de Monitoreo");
  const [reportSubject, setReportSubject] = useState("");
  const [reportPeriod, setReportPeriod] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [tab, setTab] = useState<"social" | "media">("social");
  const [sData, setSData] = useState<SocialRow[]>([]);
  const [mData, setMData] = useState<MediaRow[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const ub = (k: keyof Brand, v: string | string[]) => setBrand(p => ({ ...p, [k]: v }));
  const sw = useCallback((t: "social" | "media") => { setTab(t); if (t === "social" && sData.length) setPd(processSocial(sData)); else if (t === "media" && mData.length) setPd(processMedia(mData)); }, [sData, mData]);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return; setUploadStatus("Procesando...");
    try {
      const { social, media } = await parseExcel(f);
      // REPLACE data, not append
      setSData(social);
      setMData(media);
      const parts: string[] = [];
      if (social.length) parts.push(social.length + " redes sociales");
      if (media.length) parts.push(media.length + " medios tradicionales");
      setUploadStatus(parts.length ? "Cargados: " + parts.join(" y ") : "Sin datos validos");
      if (social.length) { setPd(processSocial(social)); setTab("social"); }
      else if (media.length) { setPd(processMedia(media)); setTab("media"); }
    } catch { setUploadStatus("Error al procesar."); }
    if (fileRef.current) fileRef.current.value = "";
  };

  useEffect(() => { if (sData.length && tab === "social") setPd(processSocial(sData)); else if (mData.length && tab === "media") setPd(processMedia(mData)); }, [sData, mData, tab]);

  const navItems = [
    { id: "home", icon: <BarChart3 size={18} />, label: "Inicio" },
    { id: "upload", icon: <Upload size={18} />, label: "Subir Datos" },
    { id: "brandkit", icon: <Palette size={18} />, label: "Identidad" },
    { id: "preview", icon: <Eye size={18} />, label: "Reporte" },
  ];

  return (
    <div className="flex h-screen overflow-hidden" style={{ fontFamily: "'DM Sans',sans-serif", background: "#f8f9fb" }}>
      {/* Sidebar */}
      <div className="w-[220px] flex flex-col flex-shrink-0 py-5" style={{ background: "linear-gradient(180deg,#0f172a,#1e293b)" }}>
        <div className="px-5 mb-8"><div className="flex items-center gap-2.5"><div className="w-[34px] h-[34px] rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#3b82f6,#8b5cf6)" }}><FileText size={16} color="white" /></div><div><div className="text-[15px] font-bold text-white" style={{ fontFamily: "'Outfit'" }}>ReportAI</div><div className="text-[9px] text-gray-400 tracking-widest">GENERADOR DE REPORTES</div></div></div></div>
        <nav className="flex-1">{navItems.map(i => (<button key={i.id} onClick={() => setView(i.id)} className="flex items-center gap-2.5 w-full px-5 py-2.5 border-none cursor-pointer text-[13px] text-left transition-all" style={{ background: view === i.id ? "rgba(59,130,246,0.15)" : "transparent", color: view === i.id ? "#60a5fa" : "#94a3b8", fontWeight: view === i.id ? 600 : 400, fontFamily: "'DM Sans'", borderRight: view === i.id ? "3px solid #3b82f6" : "3px solid transparent" }}>{i.icon} {i.label}</button>))}</nav>
        {(sData.length > 0 || mData.length > 0) && <div className="px-5 mb-3"><div className="text-[10px] text-gray-500 mb-1 uppercase tracking-wider font-semibold">Datos</div>{sData.length > 0 && <div className="text-[11px] text-green-400">{sData.length} redes sociales</div>}{mData.length > 0 && <div className="text-[11px] text-blue-400">{mData.length} medios tradicionales</div>}</div>}
        <div className="px-5"><div className="p-3 rounded-lg" style={{ background: "rgba(59,130,246,0.08)" }}><div className="flex items-center gap-1.5 mb-1"><Sparkles size={12} color="#60a5fa" /><span className="text-[10px] font-semibold text-blue-400">IA Integrada</span></div><p className="text-[10px] text-gray-400 leading-snug">Analisis automaticos</p></div></div>
      </div>

      <div className="flex-1 overflow-auto">
        {/* HOME */}
        {view === "home" && (<div className="p-10 max-w-[860px] mx-auto" style={{ animation: "fadeIn 0.3s ease" }}><h1 className="text-3xl font-extrabold text-gray-900 mb-1.5" style={{ fontFamily: "'Outfit'" }}>Bienvenido a ReportAI</h1><p className="text-[15px] text-gray-500 mb-9">Genera reportes de monitoreo con analisis por IA.</p><div className="grid grid-cols-2 gap-4">{[{ icon: <Upload size={22} color="white" />, t: "Subir Datos", d: "Excel de redes o medios", v: "upload", g: "linear-gradient(135deg,#3b82f6,#2563eb)" },{ icon: <Palette size={22} color="white" />, t: "Identidad", d: "Colores y tipografia", v: "brandkit", g: "linear-gradient(135deg,#f59e0b,#d97706)" },{ icon: <Eye size={22} color="white" />, t: "Ver Reporte", d: "Secciones completas", v: "preview", g: "linear-gradient(135deg,#10b981,#059669)" },{ icon: <LayoutTemplate size={22} color="white" />, t: "Doble universo", d: "Redes sociales + medios", v: "upload", g: "linear-gradient(135deg,#8b5cf6,#7c3aed)" }].map((c, i) => (<button key={i} onClick={() => setView(c.v)} className="flex items-start gap-3.5 p-6 bg-white border border-gray-100 rounded-2xl cursor-pointer text-left hover:-translate-y-0.5 hover:shadow-lg transition-all"><div className="w-[46px] h-[46px] rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: c.g }}>{c.icon}</div><div><div className="text-[15px] font-bold text-gray-900 mb-0.5" style={{ fontFamily: "'Outfit'" }}>{c.t}</div><div className="text-xs text-gray-500">{c.d}</div></div></button>))}</div></div>)}
        {/* UPLOAD */}
        {view === "upload" && (<div className="p-10 max-w-[660px] mx-auto" style={{ animation: "fadeIn 0.3s ease" }}><h1 className="text-2xl font-extrabold text-gray-900 mb-1" style={{ fontFamily: "'Outfit'" }}>Subir Datos</h1><p className="text-sm text-gray-500 mb-7">Carga tu archivo Excel. Deteccion automatica de redes sociales y medios tradicionales.</p><input ref={fileRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={handleFile} /><div onClick={() => fileRef.current?.click()} className="border-2 border-dashed border-gray-300 rounded-2xl py-12 px-8 text-center bg-white cursor-pointer hover:border-blue-400 transition-all"><div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4"><FileSpreadsheet size={28} color="#3b82f6" /></div><div className="text-[15px] font-bold text-gray-900 mb-1" style={{ fontFamily: "'Outfit'" }}>Selecciona tu archivo Excel</div><div className="text-xs text-gray-400 mb-4">.xlsx o .xls</div><div className="inline-block px-5 py-2 rounded-lg text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg,#3b82f6,#2563eb)" }}>Seleccionar</div></div>{uploadStatus && <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200"><p className="text-sm text-blue-700 font-medium">{uploadStatus}</p></div>}<div className="mt-6 grid gap-2.5"><input value={reportTitle} onChange={e => setReportTitle(e.target.value)} placeholder="Titulo del reporte" className="px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-400" /><input value={reportSubject} onChange={e => setReportSubject(e.target.value)} placeholder="Sujeto monitoreado" className="px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-400" /><input value={reportPeriod} onChange={e => setReportPeriod(e.target.value)} placeholder="Periodo" className="px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-400" /></div>{(sData.length > 0 || mData.length > 0) && <button onClick={() => setView("preview")} className="mt-5 w-full py-3 rounded-xl text-sm font-bold text-white border-none cursor-pointer" style={{ background: "linear-gradient(135deg,#10b981,#059669)" }}>Ver Reporte</button>}</div>)}
        {/* BRAND */}
        {view === "brandkit" && (<div className="p-10 max-w-[740px] mx-auto" style={{ animation: "fadeIn 0.3s ease" }}><h1 className="text-2xl font-extrabold text-gray-900 mb-7" style={{ fontFamily: "'Outfit'" }}>Identidad Corporativa</h1><div className="bg-white rounded-xl p-6 border border-gray-100"><div className="grid grid-cols-3 gap-4"><CInput label="Primario" value={brand.primaryColor} onChange={v => ub("primaryColor", v)} /><CInput label="Secundario" value={brand.secondaryColor} onChange={v => ub("secondaryColor", v)} /><CInput label="Acento" value={brand.accentColor} onChange={v => ub("accentColor", v)} /><CInput label="Positivo" value={brand.positiveColor} onChange={v => ub("positiveColor", v)} /><CInput label="Negativo" value={brand.negativeColor} onChange={v => ub("negativeColor", v)} /><CInput label="Neutro" value={brand.neutralColor} onChange={v => ub("neutralColor", v)} /></div></div></div>)}

        {/* ═══════ REPORT ═══════ */}
        {view === "preview" && pd && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-100 px-7 py-2.5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                {sData.length > 0 && mData.length > 0 && (<div className="flex bg-gray-100 rounded-lg p-0.5"><button onClick={() => sw("social")} className="px-3 py-1 rounded-md text-[11px] font-semibold border-none cursor-pointer" style={{ background: tab === "social" ? "white" : "transparent", color: tab === "social" ? "#3b82f6" : "#94a3b8" }}>Redes Sociales</button><button onClick={() => sw("media")} className="px-3 py-1 rounded-md text-[11px] font-semibold border-none cursor-pointer" style={{ background: tab === "media" ? "white" : "transparent", color: tab === "media" ? "#8b5cf6" : "#94a3b8" }}>Medios</button></div>)}
                <span className="text-sm font-bold text-gray-900">{pd.totalMenciones} menciones</span>
              </div>
              <div className="flex gap-2 relative">
                <button onClick={() => { setAiLoading(true); setTimeout(() => setAiLoading(false), 1500); }} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg cursor-pointer text-xs text-gray-500"><RefreshCw size={12} /> Regenerar</button>
                <button onClick={() => setShowExport(!showExport)} className="flex items-center gap-1.5 px-4 py-1.5 border-none rounded-lg cursor-pointer text-xs font-semibold text-white" style={{ background: "linear-gradient(135deg,#3b82f6,#2563eb)" }}><Download size={12} /> Exportar</button>
                {showExport && <div className="absolute top-full right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden min-w-[140px] z-20">{["PDF", "Word", "PPT"].map(f => <button key={f} onClick={() => { setShowExport(false); alert(f + " - Siguiente fase"); }} className="w-full px-3 py-2 border-none bg-transparent cursor-pointer text-left hover:bg-gray-50 text-sm text-gray-700">{f}</button>)}</div>}
              </div>
            </div>

            <div className="max-w-[940px] mx-auto p-7 pb-20 grid gap-5">
              {/* Cover */}
              <div className="rounded-2xl p-10 relative overflow-hidden" style={{ background: "linear-gradient(135deg," + brand.primaryColor + "," + brand.secondaryColor + ")" }}>
                <div className="text-[11px] font-semibold text-white/40 uppercase tracking-widest mb-3">{reportTitle}</div>
                <h1 className="text-3xl font-extrabold text-white mb-2" style={{ fontFamily: brand.titleFont }}>{reportSubject || "Sujeto Monitoreado"}</h1>
                <div className="text-sm text-white/50">{reportPeriod && ("Periodo: " + reportPeriod)}</div>
                <div className="mt-3"><span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-white/10 text-white/70">{pd.dataType === "social" ? "Redes Sociales" : "Medios Tradicionales"} — {pd.totalMenciones} menciones</span></div>
              </div>

              {/* ══════ SOCIAL ══════ */}
              {pd.dataType === "social" && (<>
                {/* S1. KPIs */}
                <Sec title="1. Indicadores Clave por Red Social" icon={<BarChart3 size={18} color={brand.accentColor} />} brand={brand}>
                  <div className="flex gap-3 flex-wrap mb-4">
                    <KPI title="Menciones" value={pd.totalMenciones} icon={<MessageSquare size={14} color="#3b82f6" />} color="#3b82f6" brand={brand} />
                    <KPI title="Impresiones" value={fmt(pd.totalAlcance)} icon={<TrendingUp size={14} color="#8b5cf6" />} color="#8b5cf6" brand={brand} />
                    <KPI title="Interacciones" value={fmt(pd.totalInteracciones)} icon={<Globe size={14} color="#10b981" />} color="#10b981" brand={brand} />
                    <KPI title="Lideres" value={pd.autoresUnicos} icon={<Users size={14} color="#f59e0b" />} color="#f59e0b" brand={brand} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">{pd.kpiByFuente.map((k, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-3.5 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: srcC[k.fuente] || brand.chartColors[i % 5] }}>{socialIcons[k.fuente] || <span className="text-white text-[10px] font-bold">{k.fuente.substring(0, 2)}</span>}</div>
                      <div className="flex-1"><div className="text-sm font-bold text-gray-800">{k.fuente}</div><div className="flex gap-3 mt-0.5"><span className="text-[10px] text-gray-500"><strong>{k.menciones}</strong> menciones</span><span className="text-[10px] text-gray-500"><strong>{fmt(k.impresiones)}</strong> impresiones</span><span className="text-[10px] text-gray-500"><strong>{fmt(k.interacciones)}</strong> interacciones</span><span className="text-[10px] text-gray-500"><strong>{k.lideres}</strong> lideres</span></div></div>
                    </div>
                  ))}</div>
                </Sec>
                {/* S2. Distribucion por Red (moved here) */}
                <Sec title="2. Distribucion por Red Social" icon={<Globe size={18} color={brand.accentColor} />} brand={brand}>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={pd.fuenteData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="fuente" tick={{ fontSize: 12, fill: "#64748b" }} />
                      <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
                      <Tooltip />
                      <Bar dataKey="total" radius={[6, 6, 0, 0]} name="Total" label={{ position: "top", fill: "#64748b", fontSize: 12, fontWeight: 700 }}>
                        {pd.fuenteData.map((e, i) => <Cell key={i} fill={srcC[e.fuente] || brand.chartColors[i % 5]} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="mt-4"><AIBlock text={aiFuentes(pd)} brand={brand} loading={aiLoading} /></div>
                </Sec>
                {/* S3. Resumen */}
                <Sec title="3. Resumen Ejecutivo" icon={<FileText size={18} color={brand.accentColor} />} brand={brand}><AIBlock text={aiResumen(pd)} brand={brand} loading={aiLoading} /></Sec>
                {/* S4. Temas */}
                <Sec title="4. Temas Clave Destacados" icon={<Lightbulb size={18} color={brand.accentColor} />} brand={brand}><div className="grid gap-3">{aiTemas(pd).map((t, i) => (<div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100"><div className="flex items-center gap-2 mb-2"><div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white" style={{ background: brand.chartColors[i] }}>{i + 1}</div><span className="text-sm font-bold text-gray-800">{t.tema}</span></div><p className="text-xs text-gray-600 leading-relaxed mb-1.5">{t.detalle}</p>{t.link && t.link !== "undefined" && <a href={t.link} target="_blank" rel="noopener noreferrer" className="text-[10px] font-semibold" style={{ color: brand.accentColor }}>Ver fuente</a>}</div>))}</div></Sec>
                {/* S5. Tendencia + per-network */}
                <Sec title="5. Tendencia de Conversacion" icon={<TrendingUp size={18} color={brand.accentColor} />} brand={brand}>
                  <div className="text-xs font-bold text-gray-500 mb-2">Total</div>
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={pd.trendData}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="date" tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={(v: string) => v.substring(5)} /><YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} /><Tooltip /><Line type="monotone" dataKey="total" stroke={brand.chartColors[0]} strokeWidth={3} dot={{ fill: brand.chartColors[0], r: 4 }} name="Total" /></LineChart>
                  </ResponsiveContainer>
                  <div className="text-xs font-bold text-gray-500 mt-5 mb-2">Por Red Social</div>
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={pd.trendData}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="date" tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={(v: string) => v.substring(5)} /><YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} /><Tooltip /><Legend />
                      {VALID_SOCIAL.map(s => <Line key={s} type="monotone" dataKey={s} stroke={srcC[s] || "#999"} strokeWidth={2} dot={{ r: 3 }} />)}
                    </LineChart>
                  </ResponsiveContainer>
                </Sec>
                {/* S6. Picos */}
                <Sec title="6. Causas de Picos Detectados" icon={<Target size={18} color={brand.accentColor} />} brand={brand}><AIBlock text={aiPicos(pd)} brand={brand} loading={aiLoading} /></Sec>
                {/* S7. KPIs Sentimiento */}
                <Sec title="7. Indicadores de Sentimiento" icon={<BarChart3 size={18} color={brand.accentColor} />} brand={brand}><div className="flex gap-3 flex-wrap"><KPI title="Positivas" value={pd.sentCounts.Positivo} icon={<ThumbsUp size={14} color={brand.positiveColor} />} color={brand.positiveColor} brand={brand} /><KPI title="Negativas" value={pd.sentCounts.Negativo} icon={<ThumbsDown size={14} color={brand.negativeColor} />} color={brand.negativeColor} brand={brand} /><KPI title="Neutras" value={pd.sentCounts.Neutro} icon={<Minus size={14} color={brand.neutralColor} />} color={brand.neutralColor} brand={brand} /><KPI title="Sent. Neto" value={pd.sentNeto.toFixed(1) + "%"} icon={<BarChart3 size={14} color={pd.sentNeto >= 0 ? brand.positiveColor : brand.negativeColor} />} color={pd.sentNeto >= 0 ? brand.positiveColor : brand.negativeColor} brand={brand} /></div></Sec>
                {/* S8. Sentimiento */}
                <Sec title="8. Analisis de Sentimiento" icon={<MessageSquare size={18} color={brand.accentColor} />} brand={brand}>
                  <div className="flex justify-center mb-4"><Donut data={pd.sentCounts} brand={brand} title="General" /></div>
                  <AIBlock text={aiSent(pd)} brand={brand} loading={aiLoading} />
                  <div className="mt-5"><div className="text-sm font-bold text-gray-700 mb-3">Por Red Social</div><div className="flex flex-wrap gap-5 justify-center">{pd.fuenteData.map((f, i) => <Donut key={i} data={{ Positivo: f.Positivo, Negativo: f.Negativo, Neutro: f.Neutro }} brand={brand} title={f.fuente} />)}</div></div>
                </Sec>
                {/* S9. Tendencia Sentimiento */}
                <Sec title="9. Tendencia del Sentimiento" icon={<TrendingUp size={18} color={brand.accentColor} />} brand={brand}><ResponsiveContainer width="100%" height={260}><LineChart data={pd.trendData}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="date" tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={(v: string) => v.substring(5)} /><YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} /><Tooltip /><Legend /><Line type="monotone" dataKey="Positivo" stroke={brand.positiveColor} strokeWidth={2.5} dot={{ r: 3 }} /><Line type="monotone" dataKey="Negativo" stroke={brand.negativeColor} strokeWidth={2.5} dot={{ r: 3 }} /><Line type="monotone" dataKey="Neutro" stroke={brand.neutralColor} strokeWidth={2.5} dot={{ r: 3 }} /></LineChart></ResponsiveContainer><div className="mt-4"><AIBlock text={aiTendSent(pd)} brand={brand} loading={aiLoading} /></div></Sec>
                {/* S10. Menciones */}
                <Sec title="10. Menciones Populares por Sentimiento" icon={<MessageSquare size={18} color={brand.accentColor} />} brand={brand}><div className="grid grid-cols-2 gap-5"><div><div className="flex items-center gap-2 mb-3"><ThumbsUp size={14} color={brand.positiveColor} /><span className="text-sm font-bold" style={{ color: brand.positiveColor }}>Top 4 Positivas</span></div><div className="grid gap-2">{pd.topPositivas.length ? pd.topPositivas.map((m, i) => <MenCard key={i} {...m} brand={brand} tipo="positivo" />) : <p className="text-xs text-gray-400">Sin menciones positivas</p>}</div></div><div><div className="flex items-center gap-2 mb-3"><ThumbsDown size={14} color={brand.negativeColor} /><span className="text-sm font-bold" style={{ color: brand.negativeColor }}>Top 4 Negativas</span></div><div className="grid gap-2">{pd.topNegativas.length ? pd.topNegativas.map((m, i) => <MenCard key={i} {...m} brand={brand} tipo="negativo" />) : <p className="text-xs text-gray-400">Sin menciones negativas</p>}</div></div></div></Sec>
              </>)}

              {/* ══════ MEDIA ══════ */}
              {pd.dataType === "media" && (<>
                {/* M1. KPIs */}
                <Sec title="1. Indicadores Clave por Tipo de Medio" icon={<BarChart3 size={18} color={brand.accentColor} />} brand={brand}>
                  <div className="flex gap-3 flex-wrap mb-4">
                    <KPI title="Total Noticias" value={pd.totalMenciones} icon={<MessageSquare size={14} color="#3b82f6" />} color="#3b82f6" brand={brand} />
                    <KPI title="Alcance Total" value={fmt(pd.totalAlcance)} icon={<TrendingUp size={14} color="#8b5cf6" />} color="#8b5cf6" brand={brand} />
                    <KPI title="Costo Total" value={fmtMoney(pd.totalCosto)} icon={<DollarSign size={14} color="#10b981" />} color="#10b981" brand={brand} />
                    <KPI title="Medios" value={pd.autoresUnicos} icon={<Users size={14} color="#f59e0b" />} color="#f59e0b" brand={brand} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">{pd.kpiByFuente.map((k, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-3.5 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: srcC[k.fuente] || brand.chartColors[i % 5] }}>{mediaIcons[k.fuente] || <span className="text-white text-[10px] font-bold">{k.fuente.substring(0, 3)}</span>}</div>
                      <div className="flex-1"><div className="text-sm font-bold text-gray-800">{k.fuente}</div><div className="flex gap-3 mt-0.5"><span className="text-[10px] text-gray-500"><strong>{k.menciones}</strong> notas</span><span className="text-[10px] text-gray-500"><strong>{fmt(k.impresiones)}</strong> alcance</span><span className="text-[10px] text-gray-500"><strong>{fmtMoney(k.costo)}</strong> costo</span><span className="text-[10px] text-gray-500"><strong>{k.lideres}</strong> medios</span></div></div>
                    </div>
                  ))}</div>
                </Sec>
                {/* M2. Resumen */}
                <Sec title="2. Resumen Ejecutivo" icon={<FileText size={18} color={brand.accentColor} />} brand={brand}><AIBlock text={aiResumen(pd)} brand={brand} loading={aiLoading} /></Sec>
                {/* M3. Distribucion */}
                <Sec title="3. Distribucion por Tipo de Medio" icon={<Globe size={18} color={brand.accentColor} />} brand={brand}>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={pd.fuenteData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="fuente" tick={{ fontSize: 12, fill: "#64748b" }} />
                      <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
                      <Tooltip />
                      <Bar dataKey="total" radius={[6, 6, 0, 0]} name="Total" label={{ position: "top", fill: "#64748b", fontSize: 12, fontWeight: 700 }}>
                        {pd.fuenteData.map((e, i) => <Cell key={i} fill={srcC[e.fuente] || brand.chartColors[i % 5]} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="mt-4"><AIBlock text={aiFuentes(pd)} brand={brand} loading={aiLoading} /></div>
                </Sec>
                {/* M4. Trafico */}
                <Sec title="4. Trafico de Informacion" icon={<TrendingUp size={18} color={brand.accentColor} />} brand={brand}>
                  <div className="text-xs font-bold text-gray-500 mb-2">Total de notas</div>
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={pd.trendData} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={(v: string) => v.substring(5)} />
                      <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} allowDecimals={false} />
                      <Tooltip />
                      <Line type="monotone" dataKey="total" stroke={brand.chartColors[0]} strokeWidth={3} dot={{ fill: brand.chartColors[0], r: 5 }} name="Total" />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="text-xs font-bold text-gray-500 mt-5 mb-2">Por tipo de medio</div>
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={pd.trendData} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={(v: string) => v.substring(5)} />
                      <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} allowDecimals={false} />
                      <Tooltip />
                      <Legend />
                      {VALID_MEDIA_TYPES.map(t => <Line key={t} type="monotone" dataKey={t} stroke={srcC[t] || "#999"} strokeWidth={2} dot={{ r: 4 }} />)}
                    </LineChart>
                  </ResponsiveContainer>
                </Sec>
                {/* M5. Picos */}
                <Sec title="5. Causas de Picos Detectados" icon={<Target size={18} color={brand.accentColor} />} brand={brand}><AIBlock text={aiPicos(pd)} brand={brand} loading={aiLoading} /></Sec>
                {/* M6. Temas */}
                <Sec title="6. Temas Clave Destacados" icon={<Lightbulb size={18} color={brand.accentColor} />} brand={brand}><div className="grid gap-3">{aiTemas(pd).map((t, i) => (<div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100"><div className="flex items-center gap-2 mb-2"><div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white" style={{ background: brand.chartColors[i] }}>{i + 1}</div><span className="text-sm font-bold text-gray-800">{t.tema}</span></div><p className="text-xs text-gray-600 leading-relaxed mb-1.5">{t.detalle}</p>{t.link && t.link !== "undefined" && <a href={t.link} target="_blank" rel="noopener noreferrer" className="text-[10px] font-semibold" style={{ color: brand.accentColor }}>Ver fuente</a>}</div>))}</div></Sec>
                {/* M7. KPIs Sentimiento */}
                <Sec title="7. Indicadores de Sentimiento" icon={<BarChart3 size={18} color={brand.accentColor} />} brand={brand}><div className="flex gap-3 flex-wrap"><KPI title="Positivas" value={pd.sentCounts.Positivo} icon={<ThumbsUp size={14} color={brand.positiveColor} />} color={brand.positiveColor} brand={brand} /><KPI title="Negativas" value={pd.sentCounts.Negativo} icon={<ThumbsDown size={14} color={brand.negativeColor} />} color={brand.negativeColor} brand={brand} /><KPI title="Neutras" value={pd.sentCounts.Neutro} icon={<Minus size={14} color={brand.neutralColor} />} color={brand.neutralColor} brand={brand} /><KPI title="Sent. Neto" value={pd.sentNeto.toFixed(1) + "%"} icon={<BarChart3 size={14} color={pd.sentNeto >= 0 ? brand.positiveColor : brand.negativeColor} />} color={pd.sentNeto >= 0 ? brand.positiveColor : brand.negativeColor} brand={brand} /></div></Sec>
                {/* M8. Sentimiento */}
                <Sec title="8. Analisis de Sentimiento" icon={<MessageSquare size={18} color={brand.accentColor} />} brand={brand}>
                  <div className="flex justify-center mb-4"><Donut data={pd.sentCounts} brand={brand} title="General" /></div>
                  <AIBlock text={aiSent(pd)} brand={brand} loading={aiLoading} />
                  <div className="mt-5"><div className="text-sm font-bold text-gray-700 mb-3">Por Tipo de Medio</div><div className="flex flex-wrap gap-5 justify-center">{pd.fuenteData.map((f, i) => <Donut key={i} data={{ Positivo: f.Positivo, Negativo: f.Negativo, Neutro: f.Neutro }} brand={brand} title={f.fuente} />)}</div></div>
                </Sec>
                {/* M9. Tendencia Sentimiento */}
                <Sec title="9. Tendencia del Sentimiento" icon={<TrendingUp size={18} color={brand.accentColor} />} brand={brand}>
                  <ResponsiveContainer width="100%" height={260}>
                    <LineChart data={pd.trendData} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={(v: string) => v.substring(5)} />
                      <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} allowDecimals={false} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="Positivo" stroke={brand.positiveColor} strokeWidth={2.5} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="Negativo" stroke={brand.negativeColor} strokeWidth={2.5} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="Neutro" stroke={brand.neutralColor} strokeWidth={2.5} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="mt-4"><AIBlock text={aiTendSent(pd)} brand={brand} loading={aiLoading} /></div>
                </Sec>
                {/* M10. Menciones */}
                <Sec title="10. Menciones Populares por Sentimiento" icon={<MessageSquare size={18} color={brand.accentColor} />} brand={brand}><div className="grid grid-cols-2 gap-5"><div><div className="flex items-center gap-2 mb-3"><ThumbsUp size={14} color={brand.positiveColor} /><span className="text-sm font-bold" style={{ color: brand.positiveColor }}>Top 4 Positivas</span></div><div className="grid gap-2">{pd.topPositivas.length ? pd.topPositivas.map((m, i) => <MenCard key={i} {...m} brand={brand} tipo="positivo" />) : <p className="text-xs text-gray-400">Sin notas positivas</p>}</div></div><div><div className="flex items-center gap-2 mb-3"><ThumbsDown size={14} color={brand.negativeColor} /><span className="text-sm font-bold" style={{ color: brand.negativeColor }}>Top 4 Negativas</span></div><div className="grid gap-2">{pd.topNegativas.length ? pd.topNegativas.map((m, i) => <MenCard key={i} {...m} brand={brand} tipo="negativo" />) : <p className="text-xs text-gray-400">Sin notas negativas</p>}</div></div></div></Sec>
              </>)}
            </div>
          </div>
        )}
        {view === "preview" && !pd && (<div className="p-10 text-center"><p className="text-gray-500">Sube un archivo Excel para generar el reporte.</p><button onClick={() => setView("upload")} className="mt-4 px-5 py-2 rounded-lg text-sm font-semibold text-white border-none cursor-pointer" style={{ background: "linear-gradient(135deg,#3b82f6,#2563eb)" }}>Subir Datos</button></div>)}
      </div>
    </div>
  );
}
