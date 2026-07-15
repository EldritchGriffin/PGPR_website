import Link from "next/link";
import { ArrowRight, DownloadIcon } from "./Icons";

// ─── YellowBtn ────────────────────────────────────────────────────────────────
export function YellowBtn({
  label,
  onClick,
  href,
  large,
}: {
  label: string;
  onClick?: () => void;
  href?: string;
  large?: boolean;
}) {
  const cls = large
    ? "inline-flex items-center gap-5 bg-[#ffb800] rounded-[52px] pl-6 pr-[5px] py-[5px] font-bold text-[#213026] text-base hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group shrink-0"
    : "inline-flex items-center gap-3 bg-[#ffb800] rounded-full pl-5 pr-1.5 py-1.5 font-bold text-[#213026] text-sm hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group shrink-0 w-fit";
  const iconSize = large ? 18 : 15;
  const iconWrap = large
    ? "flex items-center justify-center w-16 h-16 rounded-full bg-[#f4fff8] group-hover:bg-white transition-colors shrink-0"
    : "flex items-center justify-center w-9 h-9 rounded-full bg-[#f4fff8] group-hover:bg-white transition-colors shrink-0";
  const inner = (
    <>
      <span>{label}</span>
      <span className={iconWrap}>
        <ArrowRight size={iconSize} className="transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
    </>
  );
  if (href) return <Link href={href} className={cls}>{inner}</Link>;
  return <button onClick={onClick} className={cls}>{inner}</button>;
}

// ─── WhiteBtn ─────────────────────────────────────────────────────────────────
export function WhiteBtn({
  label,
  onClick,
  href,
}: {
  label: string;
  onClick?: () => void;
  href?: string;
}) {
  const cls =
    "inline-flex items-center gap-3 bg-white/90 rounded-full pl-5 pr-1.5 py-1.5 font-bold text-[#213026] text-sm border border-white/30 hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group shrink-0 w-fit";
  const inner = (
    <>
      <span>{label}</span>
      <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#ffb800] shrink-0">
        <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
    </>
  );
  if (href) return <Link href={href} className={cls}>{inner}</Link>;
  return <button onClick={onClick} className={cls}>{inner}</button>;
}

// ─── DarkBtn (for light-background hero areas) ────────────────────────────────
export function DarkBtn({ label, href }: { label: string; href?: string }) {
  const cls =
    "inline-flex items-center gap-5 bg-[#213026] rounded-[52px] pl-6 pr-[5px] py-[5px] font-bold text-[#f4fff8] text-base hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200";
  const inner = (
    <>
      {label}
      <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#f4fff8]">
        <ArrowRight size={18} className="text-[#213026]" />
      </span>
    </>
  );
  if (href) return <Link href={href} className={cls}>{inner}</Link>;
  return <button className={cls}>{inner}</button>;
}

// ─── GhostBtn (dark-hero variant) ────────────────────────────────────────────
export function GhostBtn({ label }: { label: string }) {
  return (
    <button className="inline-flex items-center gap-3 bg-white/12 text-[#f4fff8] font-semibold text-base px-6 py-4 rounded-[52px] border border-white/25 hover:bg-white/22 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
      <DownloadIcon size={18} /> {label}
    </button>
  );
}

// ─── DarkGhostBtn (light-hero variant) ───────────────────────────────────────
export function DarkGhostBtn({ label }: { label: string }) {
  return (
    <button className="inline-flex items-center gap-3 bg-[#213026]/10 text-[#213026] font-semibold text-base px-6 py-4 rounded-[52px] border border-[#213026]/30 hover:bg-[#213026]/18 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
      <DownloadIcon size={18} /> {label}
    </button>
  );
}

// ─── MoreInfoBtn ──────────────────────────────────────────────────────────────
export function MoreInfoBtn({ accent, href, label }: { accent: string; href?: string; label: string }) {
  const inner = (
    <>
      <span>{label}</span>
      <span
        className="flex items-center justify-center w-10 h-10 rounded-full shrink-0"
        style={{ backgroundColor: accent }}
      >
        <ArrowRight size={15} />
      </span>
    </>
  );
  const cls =
    "inline-flex items-center gap-2 bg-[#f4fff8] rounded-[52px] pl-5 pr-[3px] py-[3px] h-[47px] font-bold text-[#213026] text-sm hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200";
  if (href) return <Link href={href} className={cls}>{inner}</Link>;
  return <button className={cls}>{inner}</button>;
}

// ─── TechSheetBtn ─────────────────────────────────────────────────────────────
export function TechSheetBtn({ label }: { label: string }) {
  return (
    <button className="inline-flex items-center gap-2 bg-[#f4fff8] text-[#213026] font-bold text-sm px-5 h-[47px] rounded-full shrink-0 hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
      <DownloadIcon /> {label}
    </button>
  );
}
