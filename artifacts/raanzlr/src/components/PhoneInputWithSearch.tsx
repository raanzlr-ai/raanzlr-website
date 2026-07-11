import React, { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Check } from "lucide-react";
import SyriaFlag from "./SyriaFlag";
import FlagImage from "./FlagImage";

// Flags render as flagcdn images (via FlagImage) because Unicode flag emoji
// don't display on Windows browsers. Syria keeps its custom SVG flag.
const COUNTRIES = [
  { code: "+1", name: "United States", iso: "us", search: "us usa united states" },
  { code: "+1", name: "Canada", iso: "ca", search: "ca can canada" },
  { code: "+20", name: "Egypt", iso: "eg", search: "eg egypt" },
  { code: "+31", name: "Netherlands", iso: "nl", search: "nl netherlands" },
  { code: "+33", name: "France", iso: "fr", search: "fr france" },
  { code: "+34", name: "Spain", iso: "es", search: "es spain" },
  { code: "+39", name: "Italy", iso: "it", search: "it italy" },
  { code: "+44", name: "United Kingdom", iso: "gb", search: "gb uk united kingdom" },
  { code: "+49", name: "Germany", iso: "de", search: "de germany" },
  { code: "+60", name: "Malaysia", iso: "my", search: "my malaysia" },
  { code: "+61", name: "Australia", iso: "au", search: "au australia" },
  { code: "+65", name: "Singapore", iso: "sg", search: "sg singapore" },
  { code: "+81", name: "Japan", iso: "jp", search: "jp japan" },
  { code: "+86", name: "China", iso: "cn", search: "cn china" },
  { code: "+90", name: "Turkey", iso: "tr", search: "tr turkey turkiye" },
  { code: "+91", name: "India", iso: "in", search: "in india" },
  { code: "+92", name: "Pakistan", iso: "pk", search: "pk pakistan" },
  { code: "+212", name: "Morocco", iso: "ma", search: "ma morocco" },
  { code: "+213", name: "Algeria", iso: "dz", search: "dz algeria" },
  { code: "+216", name: "Tunisia", iso: "tn", search: "tn tunisia" },
  { code: "+234", name: "Nigeria", iso: "ng", search: "ng nigeria" },
  { code: "+961", name: "Lebanon", iso: "lb", search: "lb lebanon" },
  { code: "+962", name: "Jordan", iso: "jo", search: "jo jordan" },
  { code: "+963", name: "Syria", iso: "sy", search: "sy syria" },
  { code: "+964", name: "Iraq", iso: "iq", search: "iq iraq" },
  { code: "+965", name: "Kuwait", iso: "kw", search: "kw kuwait" },
  { code: "+966", name: "Saudi Arabia", iso: "sa", search: "sa saudi arabia" },
  { code: "+967", name: "Yemen", iso: "ye", search: "ye yemen" },
  { code: "+968", name: "Oman", iso: "om", search: "om oman" },
  { code: "+970", name: "Palestine", iso: "ps", search: "ps palestine" },
  { code: "+971", name: "UAE", iso: "ae", search: "ae uae emirates" },
  { code: "+973", name: "Bahrain", iso: "bh", search: "bh bahrain" },
  { code: "+974", name: "Qatar", iso: "qa", search: "qa qatar" },
];

function CountryFlag({ iso, name, className = "w-6 h-[18px]" }: { iso: string; name: string; className?: string }) {
  if (iso === "sy") return <SyriaFlag className={className} />;
  return <FlagImage code={iso} alt={`${name} flag`} className={`${className} rounded-[2px] object-cover shrink-0`} />;
}

interface PhoneInputProps {
  value: string;
  onChange: (v: string) => void;
  phoneCode: string;
  onPhoneCodeChange: (c: string) => void;
  placeholder?: string;
  className?: string;
}

export default function PhoneInput({ value, onChange, phoneCode, onPhoneCodeChange, placeholder = "555 123 4567", className = "" }: PhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(COUNTRIES.find(c => c.code === phoneCode) || COUNTRIES[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const c = COUNTRIES.find(x => x.code === phoneCode);
    if (c) setSelected(c);
  }, [phoneCode]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = COUNTRIES.filter(c =>
    c.search.includes(search.toLowerCase()) || c.code.includes(search)
  );

  const select = (c: typeof COUNTRIES[0]) => {
    setSelected(c);
    onPhoneCodeChange(c.code);
    setIsOpen(false);
    setSearch("");
  };

  return (
    <div className={`flex relative ${className}`}>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 rounded-l-xl border border-foreground/10 bg-foreground/[0.02] px-3 py-3 hover:bg-foreground/[0.04] focus:outline-none focus:border-cyan-400/60 transition-colors w-[110px]"
        >
          <CountryFlag iso={selected.iso} name={selected.name} />
          <span className="text-foreground text-sm font-medium">{selected.code}</span>
          <ChevronDown className="w-3.5 h-3.5 text-foreground/50 ml-auto" />
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-72 bg-card border border-foreground/10 rounded-xl shadow-2xl z-50 overflow-hidden">
            <div className="p-2 border-b border-foreground/10">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
                <input
                  type="text"
                  className="w-full pl-9 pr-3 py-2 bg-foreground/[0.03] border border-foreground/10 rounded-lg text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-1 focus:ring-cyan-400/50"
                  placeholder="Search..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  autoFocus
                />
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto">
              {filtered.map((c, i) => (
                <button
                  key={`${c.code}-${i}`}
                  onClick={() => select(c)}
                  className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-foreground/[0.05] text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <CountryFlag iso={c.iso} name={c.name} />
                    <span className="text-sm text-foreground">{c.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-foreground/50">{c.code}</span>
                    {selected.name === c.name && <Check className="w-4 h-4 text-cyan-400" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <input
        type="tel"
        className="flex-1 rounded-r-xl border border-l-0 border-foreground/10 bg-foreground/[0.02] px-4 py-3 text-sm text-foreground placeholder:text-foreground/30 focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/50 transition-colors focus:outline-none"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}
