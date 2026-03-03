"use client";
import { useState, useEffect } from "react";
import {
  PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer
} from "recharts";
import {
  Upload, FileSpreadsheet, Palette, LayoutTemplate, FileText,
  Download, Sparkles, ChevronRight, Check, Eye, Type,
  BarChart3, TrendingUp, MessageSquare, Users, Globe, Plus, RefreshCw
} from "lucide-react";

/* ───────── SAMPLE DATA ───────── */
const SAMPLE_RAW = [
  { Fecha: "2026-01-26", Fuente: "X", Autor: "AlejoMVendrell", Sentimiento: "Negativo", Alcance: 260, Likes: 0, Comentarios: 0, Compartidos: 0 },
  { Fecha: "2026-01-26", Fuente: "TikTok", Autor: "opiniones221", Sentimiento: "Neutro", Alcance: 1615, Likes: 17, Comentarios: 0, Compartidos: 0 },
  { Fecha: "2026-01-26", Fuente: "X", Autor: "CPJannyBarrera", Sentimiento: "Positivo", Alcance: 245, Likes: 0, Comentarios: 0, Compartidos: 0 },
  { Fecha: "2026-01-26", Fuente: "X", Autor: "josecarloe2", Sentimiento: "Negativo", Alcance: 120, Likes: 0, Comentarios: 0, Compartidos: 0 },
  { Fecha: "2026-01-26", Fuente: "X", Autor: "gobaborazari", Sentimiento: "Positivo", Alcance: 73, Likes: 2, Comentarios: 0, Compartidos: 0 },
  { Fecha: "2026-01-27", Fuente: "Facebook", Autor: "La Verdad", Sentimiento: "Negativo", Alcance: 45200, Likes: 120, Comentarios: 45, Compartidos: 30 },
  { Fecha: "2026-01-27", Fuente: "X", Autor: "Reporte_Indigo", Sentimiento: "Negativo", Alcance: 89000, Likes: 340, Comentarios: 89, Compartidos: 156 },
  { Fecha: "2026-01-27", Fuente: "Facebook", Autor: "CODIGO ROJO", Sentimiento: "Negativo", Alcance: 32000, Likes: 89, Comentarios: 34, Compartidos: 21 },
  { Fecha: "2026-01-27", Fuente: "Instagram", Autor: "sonora.hoy", Sentimiento: "Neutro", Alcance: 12300, Likes: 234, Comentarios: 12, Compartidos: 5 },
  { Fecha: "2026-01-27", Fuente: "X", Autor: "AlfonsoDurazo", Sentimiento: "Positivo", Alcance: 156000, Likes: 890, Comentarios: 123, Compartidos: 234 },
  { Fecha: "2026-01-28", Fuente: "Facebook", Autor: "La 4TV", Sentimiento: "Positivo", Alcance: 28000, Likes: 567, Comentarios: 78, Compartidos: 45 },
  { Fecha: "2026-01-28", Fuente: "X", Autor: "ImagenTVMex", Sentimiento: "Negativo", Alcance: 234000, Likes: 1200, Comentarios: 345, Compartidos: 567 },
  { Fecha: "2026-01-28", Fuente: "TikTok", Autor: "elimparcialcom", Sentimiento: "Neutro", Alcance: 8900, Likes: 123, Comentarios: 23, Compartidos: 12 },
  { Fecha: "2026-01-28", Fuente: "Facebook", Autor: "Alfonso Durazo", Sentimiento: "Positivo", Alcance: 67000, Likes: 1340, Comentarios: 156, Compartidos: 89 },
  { Fecha: "2026-01-28", Fuente: "X", Autor: "JLozanoA", Sentimiento: "Negativo", Alcance: 45000, Likes: 234, Comentarios: 67, Compartidos: 89 },
  { Fecha: "2026-01-29", Fuente: "Instagram", Autor: "rsonorafm", Sentimiento: "Positivo", Alcance: 15600, Likes: 456, Comentarios: 34, Compartidos: 23 },
  { Fecha: "2026-01-29", Fuente: "Facebook", Autor: "CODIGO ROJO", Sentimiento: "Negativo", Alcance: 41000, Likes: 167, Comentarios: 56, Compartidos: 34 },
  { Fecha: "2026-01-29", Fuente: "X", Autor: "nacholozano", Sentimiento: "Negativo", Alcance: 23000, Likes: 89, Comentarios: 23, Compartidos: 45 },
  { Fecha: "2026-01-29", Fuente: "X", Autor: "AlfonsoDurazo", Sentimiento: "Positivo", Alcance: 178000, Likes: 1023, Comentarios: 189, Compartidos: 312 },
  { Fecha: "2026-01-29", Fuente: "Facebook", Autor: "La Verdad", Sentimiento: "Neutro", Alcance: 34000, Likes: 78, Comentarios: 23, Compartidos: 12 },
  { Fecha: "2026-01-30", Fuente: "X", Autor: "Reporte_Indigo", Sentimiento: "Negativo", Alcance: 112000, Likes: 567, Comentarios: 134, Compartidos: 234 },
  { Fecha: "2026-01-30", Fuente: "Facebook", Autor: "nota.central", Sentimiento: "Neutro", Alcance: 19000, Likes: 45, Comentarios: 12, Compartidos: 8 },
  { Fecha: "2026-01-30", Fuente: "Instagram", Autor: "elmitotero_mx", Sentimiento: "Negativo", Alcance: 9800, Likes: 189, Comentarios: 34, Compartidos: 12 },
  { Fecha: "2026-01-30", Fuente: "X", Autor: "AlfonsoDurazo", Sentimiento: "Positivo", Alcance: 145000, Likes: 934, Comentarios: 145, Compartidos: 278 },
  { Fecha: "2026-01-30", Fuente: "TikTok", Autor: "eduardo.db28", Sentimiento: "Positivo", Alcance: 5600, Likes: 89, Comentarios: 12, Compartidos: 7 },
  { Fecha: "2026-01-31", Fuente: "Facebook", Autor: "La 4TV", Sentimiento: "Positivo", Alcance: 31000, Likes: 623, Comentarios: 89, Compartidos: 56 },
  { Fecha: "2026-01-31", Fuente: "X", Autor: "roycampose", Sentimiento: "Neutro", Alcance: 8900, Likes: 23, Comentarios: 5, Compartidos: 3 },
  { Fecha: "2026-01-31", Fuente: "Facebook", Autor: "Alfonso Durazo", Sentimiento: "Positivo", Alcance: 72000, Likes: 1567, Comentarios: 178, Compartidos: 98 },
  { Fecha: "2026-01-31", Fuente: "X", Autor: "JLozanoA", Sentimiento: "Negativo", Alcance: 56000, Likes: 312, Comentarios: 89, Compartidos: 123 },
  { Fecha: "2026-01-31", Fuente: "Instagram", Autor: "andreadelamorac", Sentimiento: "Neutro", Alcance: 4500, Likes: 67, Comentarios: 8, Compartidos: 3 },
  { Fecha: "2026-02-01", Fuente: "Facebook", Autor: "La Verdad", Sentimiento: "Negativo", Alcance: 52000, Likes: 145, Comentarios: 67, Compartidos: 45 },
  { Fecha: "2026-02-01", Fuente: "X", Autor: "AlfonsoDurazo", Sentimiento: "Positivo", Alcance: 189000, Likes: 1123, Comentarios: 201, Compartidos: 345 },
  { Fecha: "2026-02-01", Fuente: "TikTok", Autor: "fyp.lab", Sentimiento: "Neutro", Alcance: 7200, Likes: 56, Comentarios: 9, Compartidos: 4 },
  { Fecha: "2026-02-01", Fuente: "Facebook", Autor: "CODIGO ROJO", Sentimiento: "Negativo", Alcance: 38000, Likes: 134, Comentarios: 45, Compartidos: 28 },
];

/* ───────── TYPES ───────── */
interface DataRow {
  Fecha: string; Fuente: string; Autor: string; Sentimiento: string;
  Alcance: number; Likes: number; Comentarios: number; Compartidos: number;
}
interface Brand {
  name: string; primaryColor: string; secondaryColor: string; accentColor: string;
  positiveColor: string; negativeColor: string; neutralColor: string;
  chartColors: string[]; titleFont: string; bodyFont: string;
}
interface Template {
  id: string; name: string; sections: string[]; description: string;
}
interface ProcessedData {
  totalMenciones: number; totalAlcance: number; totalInteracciones: number;
  autoresUnicos: number;
  sentCounts: { Positivo: number; Negativo: number; Neutro: number };
  trendData: { date: string; total: number; Positivo: number; Negativo: number; Neutro: number }[];
  fuenteData: { fuente: string; Positivo: number; Negativo: number; Neutro: number; total: number }[];
  topAutores: { autor: string; menciones: number; alcance: number; fuente: string }[];
}

/* ───────── PROCESSING ───────── */
function processData(raw: DataRow[]): ProcessedData {
  const totalMenciones = raw.length;
  const totalAlcance = raw.reduce((s, r) => s + (r.Alcance || 0), 0);
  const totalInteracciones = raw.reduce((s, r) => s + (r.Likes || 0) + (r.Comentarios || 0) + (r.Compartidos || 0), 0);
  const autoresUnicos = new Set(raw.map(r => r.Autor)).size;
  const sentCounts = { Positivo: 0, Negativo: 0, Neutro: 0 };
  raw.forEach(r => { if (r.Sentimiento in sentCounts) sentCounts[r.Sentimiento as keyof typeof sentCounts]++; });
  const dateMap: Record<string, { date: string; total: number; Positivo: number; Negativo: number; Neutro: number }> = {};
  raw.forEach(r => {
    const d = r.Fecha?.substring(0, 10);
    if (!d) return;
    if (!dateMap[d]) dateMap[d] = { date: d, total: 0, Positivo: 0, Negativo: 0, Neutro: 0 };
    dateMap[d].total++;
    if (r.Sentimiento === "Positivo" || r.Sentimiento === "Negativo" || r.Sentimiento === "Neutro") dateMap[d][r.Sentimiento]++;  });
  const trendData = Object.values(dateMap).sort((a, b) => a.date.localeCompare(b.date));
  const fuenteMap: Record<string, { fuente: string; Positivo: number; Negativo: number; Neutro: number; total: number }> = {};
  raw.forEach(r => {
    if (!fuenteMap[r.Fuente]) fuenteMap[r.Fuente] = { fuente: r.Fuente, Positivo: 0, Negativo: 0, Neutro: 0, total: 0 };
    fuenteMap[r.Fuente].total++;
if (r.Sentimiento === "Positivo" || r.Sentimiento === "Negativo" || r.Sentimiento === "Neutro") fuenteMap[r.Fuente][r.Sentimiento]++;  });
  const fuenteData = Object.values(fuenteMap).sort((a, b) => b.total - a.total);
  const autorMap: Record<string, { autor: string; menciones: number; alcance: number; fuente: string }> = {};
  raw.forEach(r => {
    if (!autorMap[r.Autor]) autorMap[r.Autor] = { autor: r.Autor, menciones: 0, alcance: 0, fuente: r.Fuente };
    autorMap[r.Autor].menciones++;
    autorMap[r.Autor].alcance += r.Alcance || 0;
  });
  const topAutores = Object.values(autorMap).sort((a, b) => b.menciones - a.menciones).slice(0, 10);
  return { totalMenciones, totalAlcance, totalInteracciones, autoresUnicos, sentCounts, trendData, fuenteData, topAutores };
}

function formatNum(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return String(n);
}

/* ───────── AI TEXTS ───────── */
const AI_ANALYSES = {
  resumen: (d: ProcessedData) => `El analisis de las ${d.totalMenciones} publicaciones durante el periodo revela una conversacion publica activa con un alcance total de ${formatNum(d.totalAlcance)} impresiones y ${formatNum(d.totalInteracciones)} interacciones. El sentimiento negativo representa el ${((d.sentCounts.Negativo / d.totalMenciones) * 100).toFixed(0)}% del total, mientras que el positivo alcanza el ${((d.sentCounts.Positivo / d.totalMenciones) * 100).toFixed(0)}%. Se identificaron ${d.autoresUnicos} lideres de opinion activos en la conversacion.`,
  sentimiento: (d: ProcessedData) => `El sentimiento negativo es predominante con ${((d.sentCounts.Negativo / d.totalMenciones) * 100).toFixed(0)}% del total de menciones. La combinacion de sentimiento negativo y neutro supera significativamente al positivo, indicando areas de oportunidad para mejorar la percepcion publica.`,
  tendencia: (d: ProcessedData) => {
    const maxDay = d.trendData.reduce((max, day) => day.total > max.total ? day : max, d.trendData[0]);
    return `Se observa un pico significativo el ${maxDay?.date} con ${maxDay?.total} menciones, representando la mayor concentracion de actividad en el periodo.`;
  },
  fuentes: (d: ProcessedData) => `${d.fuenteData[0]?.fuente} lidera como principal fuente de conversacion con ${d.fuenteData[0]?.total} menciones, seguido por ${d.fuenteData[1]?.fuente || "otras plataformas"}.`,
};

/* ───────── DEFAULTS ───────── */
const DEFAULT_BRAND: Brand = {
  name: "GDP Monitoreo", primaryColor: "#1a1a2e", secondaryColor: "#16213e",
  accentColor: "#0f3460", positiveColor: "#10b981", negativeColor: "#ef4444",
  neutralColor: "#94a3b8", chartColors: ["#3b82f6", "#8b5cf6", "#f59e0b", "#ec4899", "#14b8a6"],
  titleFont: "'Outfit', sans-serif", bodyFont: "'DM Sans', sans-serif",
};

const DEFAULT_TEMPLATES: Template[] = [
  { id: "social-listening", name: "Social Listening Completo", sections: ["kpis", "resumen", "tendencia", "sentimiento", "fuentes", "autores"], description: "Reporte completo con KPIs, sentimiento, tendencias y lideres" },
  { id: "resumen-ejecutivo", name: "Resumen Ejecutivo", sections: ["kpis", "resumen", "sentimiento"], description: "Version resumida con KPIs y sentimiento" },
  { id: "tendencias", name: "Analisis de Tendencias", sections: ["kpis", "tendencia", "fuentes", "autores"], description: "Enfocado en tendencias y distribucion por fuente" },
];

/* ───────── COMPONENTS ───────── */
function KPICard({ title, value, icon, color, brand }: { title: string; value: string | number; icon: React.ReactNode; color: string; brand: Brand }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 flex-1 min-w-[160px] hover:-translate-y-0.5 hover:shadow-lg transition-all" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
      <div className="flex justify-between items-center mb-2.5">
        <span className="text-xs text-gray-400 font-medium" style={{ fontFamily: brand.bodyFont }}>{title}</span>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: color + "18" }}>{icon}</div>
      </div>
      <div className="text-3xl font-bold" style={{ color: brand.primaryColor, fontFamily: brand.titleFont }}>{value}</div>
    </div>
  );
}

function SentimentDonut({ data, brand }: { data: ProcessedData["sentCounts"]; brand: Brand }) {
  const total = data.Positivo + data.Negativo + data.Neutro;
  const chartData = [
    { name: "Negativo", value: data.Negativo, color: brand.negativeColor },
    { name: "Positivo", value: data.Positivo, color: brand.positiveColor },
    { name: "Neutro", value: data.Neutro, color: brand.neutralColor },
  ];
  return (
    <div className="flex items-center gap-8 justify-center flex-wrap">
      <PieChart width={260} height={260}>
        <Pie data={chartData} cx={130} cy={130} innerRadius={65} outerRadius={110} paddingAngle={3} dataKey="value" stroke="none">
          {chartData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
        </Pie>
      </PieChart>
      <div className="flex flex-col gap-3.5">
        {chartData.map((item, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-sm" style={{ background: item.color }} />
            <div>
              <div className="text-sm font-semibold text-gray-700" style={{ fontFamily: brand.bodyFont }}>{item.name}</div>
              <div className="text-xl font-bold" style={{ color: item.color, fontFamily: brand.titleFont }}>{((item.value / total) * 100).toFixed(0)}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrendChart({ data, brand }: { data: ProcessedData["trendData"]; brand: Brand }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={(v: string) => v.substring(5)} />
        <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
        <Tooltip contentStyle={{ borderRadius: 10, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }} />
        <Legend />
        <Line type="monotone" dataKey="total" stroke={brand.chartColors[0]} strokeWidth={3} dot={{ fill: brand.chartColors[0], r: 4 }} name="Total" />
        <Line type="monotone" dataKey="Positivo" stroke={brand.positiveColor} strokeWidth={2} dot={false} name="Positivo" />
        <Line type="monotone" dataKey="Negativo" stroke={brand.negativeColor} strokeWidth={2} dot={false} name="Negativo" />
      </LineChart>
    </ResponsiveContainer>
  );
}

function SourceChart({ data, brand }: { data: ProcessedData["fuenteData"]; brand: Brand }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="fuente" tick={{ fontSize: 12, fill: "#64748b" }} />
        <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
        <Tooltip contentStyle={{ borderRadius: 10, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }} />
        <Legend />
        <Bar dataKey="Positivo" fill={brand.positiveColor} radius={[4, 4, 0, 0]} name="Positivo" />
        <Bar dataKey="Negativo" fill={brand.negativeColor} radius={[4, 4, 0, 0]} name="Negativo" />
        <Bar dataKey="Neutro" fill={brand.neutralColor} radius={[4, 4, 0, 0]} name="Neutro" />
      </BarChart>
    </ResponsiveContainer>
  );
}

function AuthorTable({ data, brand }: { data: ProcessedData["topAutores"]; brand: Brand }) {
  const srcColors: Record<string, string> = { X: "#3b82f6", Facebook: "#8b5cf6", Instagram: "#f59e0b", TikTok: "#ec4899" };
  return (
    <div className="overflow-x-auto">
      <table className="w-full" style={{ borderCollapse: "separate", borderSpacing: "0 5px", fontFamily: brand.bodyFont }}>
        <thead>
          <tr>
            {["Autor", "Fuente", "Menciones", "Alcance"].map(h => (
              <th key={h} className="px-3.5 py-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              <td className="px-3.5 py-2.5 font-semibold text-gray-800 rounded-l-lg">{row.autor}</td>
              <td className="px-3.5 py-2.5">
                <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: (srcColors[row.fuente] || "#888") + "18", color: srcColors[row.fuente] || "#888" }}>{row.fuente}</span>
              </td>
              <td className="px-3.5 py-2.5 font-bold" style={{ color: brand.primaryColor }}>{row.menciones}</td>
              <td className="px-3.5 py-2.5 text-gray-500 rounded-r-lg">{formatNum(row.alcance)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AITextBlock({ text, brand, loading }: { text: string; brand: Brand; loading: boolean }) {
  return (
    <div className="rounded-xl p-4" style={{ background: "linear-gradient(135deg, #f0f9ff 0%, #f5f3ff 100%)", borderLeft: `4px solid ${brand.accentColor}` }}>
      <div className="flex items-center gap-1.5 mb-2">
        <Sparkles size={14} color={brand.accentColor} />
        <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: brand.accentColor }}>Analisis Inteligente</span>
      </div>
      {loading ? (
        <div className="flex gap-1.5 py-2">
          {[0, 1, 2].map(i => <div key={i} className="w-2 h-2 rounded-full" style={{ background: brand.accentColor, animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />)}
        </div>
      ) : (
        <p className="text-sm leading-relaxed text-gray-700" style={{ fontFamily: brand.bodyFont }}>{text}</p>
      )}
    </div>
  );
}

function ReportSection({ title, icon, children, brand }: { title: string; icon: React.ReactNode; children: React.ReactNode; brand: Brand }) {
  return (
    <div className="bg-white rounded-2xl p-7 border border-gray-100" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: brand.accentColor + "12" }}>{icon}</div>
        <h2 className="text-lg font-bold" style={{ color: brand.primaryColor, fontFamily: brand.titleFont }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <input type="color" value={value} onChange={e => onChange(e.target.value)} className="w-8 h-8 border-2 border-gray-200 rounded-md cursor-pointer p-0" />
      <div>
        <div className="text-[11px] font-medium text-gray-500">{label}</div>
        <div className="text-[10px] text-gray-400 font-mono">{value}</div>
      </div>
    </div>
  );
}

/* ───────── MAIN PAGE ───────── */
export default function Home() {
  const [view, setView] = useState("home");
  const [processedData, setProcessedData] = useState<ProcessedData | null>(null);
  const [brand, setBrand] = useState<Brand>(DEFAULT_BRAND);
  const [templates] = useState<Template[]>(DEFAULT_TEMPLATES);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(DEFAULT_TEMPLATES[0]);
  const [reportTitle, setReportTitle] = useState("Social Listening Sonora");
  const [reportSubject, setReportSubject] = useState("Alfonso Durazo");
  const [reportPeriod, setReportPeriod] = useState("26 de enero al 01 de febrero 2026");
  const [aiLoading, setAiLoading] = useState(false);
  const [showExport, setShowExport] = useState(false);

  useEffect(() => { setProcessedData(processData(SAMPLE_RAW)); }, []);

  const updateBrand = (key: keyof Brand, value: string | string[]) => setBrand(prev => ({ ...prev, [key]: value }));
  const pd = processedData;

  const navItems = [
    { id: "home", icon: <BarChart3 size={18} />, label: "Inicio" },
    { id: "upload", icon: <Upload size={18} />, label: "Subir Datos" },
    { id: "templates", icon: <LayoutTemplate size={18} />, label: "Plantillas" },
    { id: "brandkit", icon: <Palette size={18} />, label: "Identidad" },
    { id: "preview", icon: <Eye size={18} />, label: "Reporte" },
  ];

  const SECTION_LABELS: Record<string, string> = { kpis: "KPIs", resumen: "Resumen Ejecutivo", tendencia: "Tendencias", sentimiento: "Sentimiento", fuentes: "Fuentes", autores: "Lideres" };

  return (
    <div className="flex h-screen overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif", background: "#f8f9fb" }}>

      {/* SIDEBAR */}
      <div className="w-[220px] flex flex-col flex-shrink-0 py-5" style={{ background: "linear-gradient(180deg, #0f172a, #1e293b)" }}>
        <div className="px-5 mb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-[34px] h-[34px] rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}>
              <FileText size={16} color="white" />
            </div>
            <div>
              <div className="text-[15px] font-bold text-white" style={{ fontFamily: "'Outfit'" }}>ReportAI</div>
              <div className="text-[9px] text-gray-400 tracking-widest">GENERADOR DE REPORTES</div>
            </div>
          </div>
        </div>
        <nav className="flex-1">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setView(item.id)}
              className="flex items-center gap-2.5 w-full px-5 py-2.5 border-none cursor-pointer text-[13px] text-left transition-all"
              style={{
                background: view === item.id ? "rgba(59,130,246,0.15)" : "transparent",
                color: view === item.id ? "#60a5fa" : "#94a3b8",
                fontWeight: view === item.id ? 600 : 400,
                fontFamily: "'DM Sans'",
                borderRight: view === item.id ? "3px solid #3b82f6" : "3px solid transparent",
              }}>
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        <div className="px-5">
          <div className="p-3.5 rounded-lg" style={{ background: "rgba(59,130,246,0.08)" }}>
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles size={12} color="#60a5fa" />
              <span className="text-[10px] font-semibold text-blue-400">IA Integrada</span>
            </div>
            <p className="text-[10px] text-gray-400 leading-snug">Textos de analisis generados automaticamente</p>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 overflow-auto">

        {/* HOME */}
        {view === "home" && (
          <div className="p-10 max-w-[860px] mx-auto" style={{ animation: "fadeIn 0.3s ease" }}>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-1.5" style={{ fontFamily: "'Outfit'" }}>Bienvenido a ReportAI</h1>
            <p className="text-[15px] text-gray-500 mb-9 leading-relaxed">Genera reportes profesionales con graficas inteligentes y analisis por IA.</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Upload size={22} color="white" />, title: "Subir Datos", desc: "Carga tu archivo Excel", v: "upload", g: "linear-gradient(135deg,#3b82f6,#2563eb)" },
                { icon: <LayoutTemplate size={22} color="white" />, title: "Plantillas", desc: "Elige la estructura del reporte", v: "templates", g: "linear-gradient(135deg,#8b5cf6,#7c3aed)" },
                { icon: <Palette size={22} color="white" />, title: "Identidad", desc: "Colores, tipografia y logo", v: "brandkit", g: "linear-gradient(135deg,#f59e0b,#d97706)" },
                { icon: <Eye size={22} color="white" />, title: "Ver Reporte", desc: "Previsualiza y exporta", v: "preview", g: "linear-gradient(135deg,#10b981,#059669)" },
              ].map((c, i) => (
                <button key={i} onClick={() => setView(c.v)} className="flex items-start gap-3.5 p-6 bg-white border border-gray-100 rounded-2xl cursor-pointer text-left hover:-translate-y-0.5 hover:shadow-lg transition-all">
                  <div className="w-[46px] h-[46px] rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: c.g }}>{c.icon}</div>
                  <div>
                    <div className="text-[15px] font-bold text-gray-900 mb-0.5" style={{ fontFamily: "'Outfit'" }}>{c.title}</div>
                    <div className="text-xs text-gray-500">{c.desc}</div>
                  </div>
                </button>
              ))}
            </div>
            {pd && (
              <div className="mt-8 p-5 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center gap-1.5 mb-1">
                  <Check size={14} color="#10b981" />
                  <span className="text-xs font-semibold text-green-600">Datos cargados</span>
                </div>
                <p className="text-xs text-gray-500">
                  Datos de ejemplo: <strong>{pd.totalMenciones} menciones</strong> del periodo {reportPeriod}.{" "}
                  <span className="text-blue-500 cursor-pointer font-semibold" onClick={() => setView("preview")}>Ver reporte →</span>
                </p>
              </div>
            )}
          </div>
        )}

        {/* UPLOAD */}
        {view === "upload" && (
          <div className="p-10 max-w-[660px] mx-auto" style={{ animation: "fadeIn 0.3s ease" }}>
            <h1 className="text-2xl font-extrabold text-gray-900 mb-1.5" style={{ fontFamily: "'Outfit'" }}>Subir Datos</h1>
            <p className="text-sm text-gray-500 mb-7">Carga tu archivo Excel con los datos de monitoreo</p>
            <div onClick={() => { setAiLoading(true); setTimeout(() => { setProcessedData(processData(SAMPLE_RAW)); setAiLoading(false); setView("preview"); }, 1200); }}
              className="border-2 border-dashed border-gray-300 rounded-2xl py-12 px-8 text-center bg-white cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
                <FileSpreadsheet size={28} color="#3b82f6" />
              </div>
              <div className="text-[15px] font-bold text-gray-900 mb-1.5" style={{ fontFamily: "'Outfit'" }}>Arrastra tu archivo Excel aqui</div>
              <div className="text-xs text-gray-400 mb-4">o haz clic para seleccionar</div>
              <div className="inline-block px-5 py-2 rounded-lg text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg,#3b82f6,#2563eb)" }}>Seleccionar Archivo</div>
            </div>
            <div className="mt-6 bg-white rounded-xl p-5 border border-gray-100">
              <div className="text-sm font-bold text-gray-900 mb-2.5" style={{ fontFamily: "'Outfit'" }}>Formato esperado:</div>
              <div className="flex flex-wrap gap-1.5">
                {["Fecha", "Fuente", "Autor", "Sentimiento", "Alcance", "Likes", "Comentarios", "Compartidos"].map(col => (
                  <span key={col} className="px-2.5 py-1 bg-gray-100 rounded-lg text-[11px] text-gray-500">{col}</span>
                ))}
              </div>
            </div>
            <div className="mt-5 grid gap-2.5">
              <input value={reportTitle} onChange={e => setReportTitle(e.target.value)} placeholder="Titulo del reporte" className="px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-400" />
              <input value={reportSubject} onChange={e => setReportSubject(e.target.value)} placeholder="Sujeto" className="px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-400" />
              <input value={reportPeriod} onChange={e => setReportPeriod(e.target.value)} placeholder="Periodo" className="px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-400" />
            </div>
          </div>
        )}

        {/* TEMPLATES */}
        {view === "templates" && (
          <div className="p-10 max-w-[740px] mx-auto" style={{ animation: "fadeIn 0.3s ease" }}>
            <div className="flex justify-between items-center mb-7">
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900 mb-1" style={{ fontFamily: "'Outfit'" }}>Plantillas</h1>
                <p className="text-sm text-gray-500">Elige la estructura de tu reporte</p>
              </div>
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white border-none cursor-pointer" style={{ background: "linear-gradient(135deg,#3b82f6,#2563eb)" }}>
                <Plus size={14} /> Nueva
              </button>
            </div>
            <div className="grid gap-3.5">
              {templates.map(tmpl => (
                <div key={tmpl.id} onClick={() => setSelectedTemplate(tmpl)}
                  className="p-5 bg-white rounded-xl cursor-pointer transition-all"
                  style={{
                    border: selectedTemplate.id === tmpl.id ? "2px solid #3b82f6" : "1px solid #f0f0f0",
                    boxShadow: selectedTemplate.id === tmpl.id ? "0 0 0 3px rgba(59,130,246,0.1)" : "none",
                  }}>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[15px] font-bold text-gray-900" style={{ fontFamily: "'Outfit'" }}>{tmpl.name}</span>
                        {selectedTemplate.id === tmpl.id && <span className="px-2 py-0.5 bg-blue-500 text-white rounded-full text-[10px] font-semibold">Activa</span>}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">{tmpl.description}</div>
                    </div>
                    <ChevronRight size={18} color="#94a3b8" />
                  </div>
                  <div className="flex gap-1.5 mt-3 flex-wrap">
                    {tmpl.sections.map(s => (
                      <span key={s} className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-gray-100 text-gray-500">{SECTION_LABELS[s]}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BRAND KIT */}
        {view === "brandkit" && (
          <div className="p-10 max-w-[740px] mx-auto" style={{ animation: "fadeIn 0.3s ease" }}>
            <h1 className="text-2xl font-extrabold text-gray-900 mb-1" style={{ fontFamily: "'Outfit'" }}>Identidad Corporativa</h1>
            <p className="text-sm text-gray-500 mb-7">Personaliza los colores y tipografia</p>
            <div className="grid gap-5">
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <Palette size={16} color="#3b82f6" />
                  <span className="text-sm font-bold text-gray-900" style={{ fontFamily: "'Outfit'" }}>Colores del Reporte</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <ColorInput label="Primario" value={brand.primaryColor} onChange={v => updateBrand("primaryColor", v)} />
                  <ColorInput label="Secundario" value={brand.secondaryColor} onChange={v => updateBrand("secondaryColor", v)} />
                  <ColorInput label="Acento" value={brand.accentColor} onChange={v => updateBrand("accentColor", v)} />
                  <ColorInput label="Positivo" value={brand.positiveColor} onChange={v => updateBrand("positiveColor", v)} />
                  <ColorInput label="Negativo" value={brand.negativeColor} onChange={v => updateBrand("negativeColor", v)} />
                  <ColorInput label="Neutro" value={brand.neutralColor} onChange={v => updateBrand("neutralColor", v)} />
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 size={16} color="#8b5cf6" />
                  <span className="text-sm font-bold text-gray-900" style={{ fontFamily: "'Outfit'" }}>Colores de Graficas</span>
                </div>
                <div className="flex gap-3.5 flex-wrap">
                  {brand.chartColors.map((c, i) => (
                    <ColorInput key={i} label={`Color ${i + 1}`} value={c} onChange={v => { const nc = [...brand.chartColors]; nc[i] = v; updateBrand("chartColors", nc); }} />
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <Type size={16} color="#f59e0b" />
                  <span className="text-sm font-bold text-gray-900" style={{ fontFamily: "'Outfit'" }}>Tipografia</span>
                </div>
                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-[11px] font-medium text-gray-500 block mb-1.5">Titulos</label>
                    <select value={brand.titleFont} onChange={e => updateBrand("titleFont", e.target.value)} className="w-full px-2.5 py-2 rounded-lg border border-gray-200 text-sm">
                      <option value="'Outfit', sans-serif">Outfit</option>
                      <option value="'Montserrat', sans-serif">Montserrat</option>
                      <option value="'Poppins', sans-serif">Poppins</option>
                    </select>
                    <div className="mt-2 text-xl font-bold" style={{ fontFamily: brand.titleFont, color: brand.primaryColor }}>Titulo Ejemplo</div>
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-gray-500 block mb-1.5">Cuerpo</label>
                    <select value={brand.bodyFont} onChange={e => updateBrand("bodyFont", e.target.value)} className="w-full px-2.5 py-2 rounded-lg border border-gray-200 text-sm">
                      <option value="'DM Sans', sans-serif">DM Sans</option>
                      <option value="'Lato', sans-serif">Lato</option>
                      <option value="'Nunito', sans-serif">Nunito</option>
                    </select>
                    <div className="mt-2 text-sm leading-relaxed text-gray-500" style={{ fontFamily: brand.bodyFont }}>Texto de ejemplo para el cuerpo.</div>
                  </div>
                </div>
              </div>
              <div className="flex gap-1.5 p-4 bg-white rounded-xl border border-gray-100">
                <span className="text-xs text-gray-500 mr-2">Preview:</span>
                {[brand.primaryColor, brand.secondaryColor, brand.accentColor, brand.positiveColor, brand.negativeColor, brand.neutralColor, ...brand.chartColors].map((c, i) => (
                  <div key={i} className="w-7 h-7 rounded-md border border-black/5" style={{ background: c }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PREVIEW */}
        {view === "preview" && pd && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-100 px-7 py-2.5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-900" style={{ fontFamily: "'Outfit'" }}>Vista Previa</span>
                <span className="px-2.5 py-1 bg-gray-100 rounded-full text-[10px] text-gray-500">{selectedTemplate.name}</span>
              </div>
              <div className="flex gap-2 relative">
                <button onClick={() => { setAiLoading(true); setTimeout(() => setAiLoading(false), 1500); }}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-gray-200 rounded-lg cursor-pointer text-xs text-gray-500">
                  <RefreshCw size={12} /> Regenerar IA
                </button>
                <button onClick={() => setShowExport(!showExport)}
                  className="flex items-center gap-1.5 px-4 py-1.5 border-none rounded-lg cursor-pointer text-xs font-semibold text-white"
                  style={{ background: "linear-gradient(135deg,#3b82f6,#2563eb)" }}>
                  <Download size={12} /> Exportar
                </button>
                {showExport && (
                  <div className="absolute top-full right-0 mt-1.5 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden min-w-[180px] z-20">
                    {[{ f: "PDF", e: "📄", d: "Documento PDF" }, { f: "Word", e: "📝", d: "Microsoft Word" }, { f: "PowerPoint", e: "📊", d: "Presentacion PPTX" }].map(exp => (
                      <button key={exp.f} onClick={() => { setShowExport(false); alert("Exportando a " + exp.f + "...\n\nEn la siguiente fase conectaremos la exportacion real."); }}
                        className="flex items-center gap-2.5 w-full px-3.5 py-2.5 border-none bg-transparent cursor-pointer text-left hover:bg-gray-50">
                        <span className="text-lg">{exp.e}</span>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{exp.f}</div>
                          <div className="text-[10px] text-gray-400">{exp.d}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="max-w-[900px] mx-auto p-7 pb-20">
              {/* Cover */}
              <div className="rounded-2xl p-12 mb-6 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${brand.primaryColor}, ${brand.secondaryColor})` }}>
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/[0.04]" />
                <div className="relative">
                  <div className="text-[11px] font-semibold text-white/40 uppercase tracking-widest mb-3.5">{reportTitle}</div>
                  <h1 className="text-4xl font-extrabold text-white mb-2.5" style={{ fontFamily: brand.titleFont }}>{reportSubject}</h1>
                  <div className="text-sm text-white/50" style={{ fontFamily: brand.bodyFont }}>Periodo: {reportPeriod}</div>
                </div>
              </div>

              <div className="grid gap-5">
                {selectedTemplate.sections.includes("kpis") && (
                  <div className="flex gap-3.5 flex-wrap">
                    <KPICard title="Menciones" value={pd.totalMenciones} icon={<MessageSquare size={16} color="#3b82f6" />} color="#3b82f6" brand={brand} />
                    <KPICard title="Impresiones" value={formatNum(pd.totalAlcance)} icon={<TrendingUp size={16} color="#8b5cf6" />} color="#8b5cf6" brand={brand} />
                    <KPICard title="Interacciones" value={formatNum(pd.totalInteracciones)} icon={<Globe size={16} color="#10b981" />} color="#10b981" brand={brand} />
                    <KPICard title="Lideres" value={pd.autoresUnicos} icon={<Users size={16} color="#f59e0b" />} color="#f59e0b" brand={brand} />
                  </div>
                )}
                {selectedTemplate.sections.includes("resumen") && (
                  <ReportSection title="Resumen Ejecutivo" icon={<FileText size={18} color={brand.accentColor} />} brand={brand}>
                    <AITextBlock text={AI_ANALYSES.resumen(pd)} brand={brand} loading={aiLoading} />
                  </ReportSection>
                )}
                {selectedTemplate.sections.includes("tendencia") && (
                  <ReportSection title="Tendencia de Conversacion" icon={<TrendingUp size={18} color={brand.accentColor} />} brand={brand}>
                    <TrendChart data={pd.trendData} brand={brand} />
                    <div className="mt-4"><AITextBlock text={AI_ANALYSES.tendencia(pd)} brand={brand} loading={aiLoading} /></div>
                  </ReportSection>
                )}
                {selectedTemplate.sections.includes("sentimiento") && (
                  <ReportSection title="Analisis de Sentimiento" icon={<MessageSquare size={18} color={brand.accentColor} />} brand={brand}>
                    <SentimentDonut data={pd.sentCounts} brand={brand} />
                    <div className="mt-5"><AITextBlock text={AI_ANALYSES.sentimiento(pd)} brand={brand} loading={aiLoading} /></div>
                  </ReportSection>
                )}
                {selectedTemplate.sections.includes("fuentes") && (
                  <ReportSection title="Distribucion por Fuente" icon={<Globe size={18} color={brand.accentColor} />} brand={brand}>
                    <SourceChart data={pd.fuenteData} brand={brand} />
                    <div className="mt-4"><AITextBlock text={AI_ANALYSES.fuentes(pd)} brand={brand} loading={aiLoading} /></div>
                  </ReportSection>
                )}
                {selectedTemplate.sections.includes("autores") && (
                  <ReportSection title="Principales Lideres de Opinion" icon={<Users size={18} color={brand.accentColor} />} brand={brand}>
                    <AuthorTable data={pd.topAutores} brand={brand} />
                  </ReportSection>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
