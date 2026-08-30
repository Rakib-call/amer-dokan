import React from "react";
import { Shirt, Footprints, Watch, Tag } from "lucide-react";

export const CATEGORY_META = {
  cloth: { label: "কাপড়", icon: Shirt },
  shoe: { label: "জুতা", icon: Footprints },
  watch: { label: "ঘড়ি", icon: Watch },
  other: { label: "অন্যান্য", icon: Tag },
};

export const money = (n) => `৳${Number(n).toLocaleString("en-US")}`;

export function TagLabel({ children, tone = "default" }) {
  const tones = {
    default: "bg-navy text-cream",
    offer: "bg-brick text-cream",
    ghost: "bg-cream text-navy border border-navy/20",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs tracking-wide font-medium rounded-sm ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function PriceTag({ price, offerPrice, size = "md" }) {
  const big = size === "lg" ? "text-2xl" : "text-lg";
  return (
    <div className="flex items-baseline gap-2 font-mono">
      <span className={`${big} font-semibold text-navy`}>{money(offerPrice ?? price)}</span>
      {offerPrice != null && (
        <span className="text-sm text-navy/40 line-through">{money(price)}</span>
      )}
    </div>
  );
}

export function Loader({ label = "লোড হচ্ছে…" }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-navy border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-navy/60">{label}</p>
      </div>
    </div>
  );
}
