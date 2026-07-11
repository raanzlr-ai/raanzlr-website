import React, { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Check } from "lucide-react";
import SyriaFlag from "./SyriaFlag";
import FlagImage from "./FlagImage";

// Flags render as flagcdn images (via FlagImage) because Unicode flag emoji
// don't display on Windows browsers. Syria keeps its custom SVG flag.
// `hint` is a typical local mobile number, shown as the input placeholder.
const COUNTRIES = [
  { code: "+1", name: "United States", iso: "us", search: "us usa united states", hint: "201 555 0123" },
  { code: "+1", name: "Canada", iso: "ca", search: "ca can canada", hint: "416 555 0123" },
  { code: "+7", name: "Russia", iso: "ru", search: "ru russia", hint: "912 345 67 89" },
  { code: "+7", name: "Kazakhstan", iso: "kz", search: "kz kazakhstan", hint: "701 234 5678" },
  { code: "+20", name: "Egypt", iso: "eg", search: "eg egypt", hint: "100 123 4567" },
  { code: "+27", name: "South Africa", iso: "za", search: "za south africa", hint: "71 123 4567" },
  { code: "+30", name: "Greece", iso: "gr", search: "gr greece", hint: "691 234 5678" },
  { code: "+31", name: "Netherlands", iso: "nl", search: "nl netherlands", hint: "6 1234 5678" },
  { code: "+32", name: "Belgium", iso: "be", search: "be belgium", hint: "470 12 34 56" },
  { code: "+33", name: "France", iso: "fr", search: "fr france", hint: "6 12 34 56 78" },
  { code: "+34", name: "Spain", iso: "es", search: "es spain", hint: "612 34 56 78" },
  { code: "+36", name: "Hungary", iso: "hu", search: "hu hungary", hint: "20 123 4567" },
  { code: "+39", name: "Italy", iso: "it", search: "it italy", hint: "312 345 6789" },
  { code: "+40", name: "Romania", iso: "ro", search: "ro romania", hint: "712 034 567" },
  { code: "+41", name: "Switzerland", iso: "ch", search: "ch switzerland", hint: "78 123 45 67" },
  { code: "+43", name: "Austria", iso: "at", search: "at austria", hint: "664 123 456" },
  { code: "+44", name: "United Kingdom", iso: "gb", search: "gb uk united kingdom", hint: "7400 123456" },
  { code: "+45", name: "Denmark", iso: "dk", search: "dk denmark", hint: "32 12 34 56" },
  { code: "+46", name: "Sweden", iso: "se", search: "se sweden", hint: "70 123 45 67" },
  { code: "+47", name: "Norway", iso: "no", search: "no norway", hint: "406 12 345" },
  { code: "+48", name: "Poland", iso: "pl", search: "pl poland", hint: "512 345 678" },
  { code: "+49", name: "Germany", iso: "de", search: "de germany", hint: "1512 345 6789" },
  { code: "+51", name: "Peru", iso: "pe", search: "pe peru", hint: "912 345 678" },
  { code: "+52", name: "Mexico", iso: "mx", search: "mx mexico", hint: "222 123 4567" },
  { code: "+54", name: "Argentina", iso: "ar", search: "ar argentina", hint: "9 11 2345 6789" },
  { code: "+55", name: "Brazil", iso: "br", search: "br brazil", hint: "11 96123 4567" },
  { code: "+56", name: "Chile", iso: "cl", search: "cl chile", hint: "9 6123 4567" },
  { code: "+57", name: "Colombia", iso: "co", search: "co colombia", hint: "321 123 4567" },
  { code: "+58", name: "Venezuela", iso: "ve", search: "ve venezuela", hint: "412 123 4567" },
  { code: "+60", name: "Malaysia", iso: "my", search: "my malaysia", hint: "12 345 6789" },
  { code: "+61", name: "Australia", iso: "au", search: "au australia", hint: "412 345 678" },
  { code: "+62", name: "Indonesia", iso: "id", search: "id indonesia", hint: "812 345 678" },
  { code: "+63", name: "Philippines", iso: "ph", search: "ph philippines", hint: "905 123 4567" },
  { code: "+64", name: "New Zealand", iso: "nz", search: "nz new zealand", hint: "21 123 4567" },
  { code: "+65", name: "Singapore", iso: "sg", search: "sg singapore", hint: "8123 4567" },
  { code: "+66", name: "Thailand", iso: "th", search: "th thailand", hint: "81 234 5678" },
  { code: "+81", name: "Japan", iso: "jp", search: "jp japan", hint: "90 1234 5678" },
  { code: "+82", name: "South Korea", iso: "kr", search: "kr south korea", hint: "10 1234 5678" },
  { code: "+84", name: "Vietnam", iso: "vn", search: "vn vietnam", hint: "91 234 56 78" },
  { code: "+86", name: "China", iso: "cn", search: "cn china", hint: "131 2345 6789" },
  { code: "+90", name: "Turkey", iso: "tr", search: "tr turkey turkiye", hint: "501 234 5678" },
  { code: "+91", name: "India", iso: "in", search: "in india", hint: "81234 56789" },
  { code: "+92", name: "Pakistan", iso: "pk", search: "pk pakistan", hint: "301 234 5678" },
  { code: "+93", name: "Afghanistan", iso: "af", search: "af afghanistan", hint: "70 123 4567" },
  { code: "+94", name: "Sri Lanka", iso: "lk", search: "lk sri lanka", hint: "71 234 5678" },
  { code: "+98", name: "Iran", iso: "ir", search: "ir iran", hint: "912 345 6789" },
  { code: "+212", name: "Morocco", iso: "ma", search: "ma morocco", hint: "650 123 456" },
  { code: "+213", name: "Algeria", iso: "dz", search: "dz algeria", hint: "551 23 45 67" },
  { code: "+216", name: "Tunisia", iso: "tn", search: "tn tunisia", hint: "20 123 456" },
  { code: "+218", name: "Libya", iso: "ly", search: "ly libya", hint: "91 234 5678" },
  { code: "+221", name: "Senegal", iso: "sn", search: "sn senegal", hint: "70 123 45 67" },
  { code: "+222", name: "Mauritania", iso: "mr", search: "mr mauritania", hint: "22 12 34 56" },
  { code: "+225", name: "Ivory Coast", iso: "ci", search: "ci ivory coast cote divoire", hint: "01 23 45 6789" },
  { code: "+233", name: "Ghana", iso: "gh", search: "gh ghana", hint: "23 123 4567" },
  { code: "+234", name: "Nigeria", iso: "ng", search: "ng nigeria", hint: "802 123 4567" },
  { code: "+237", name: "Cameroon", iso: "cm", search: "cm cameroon", hint: "6 71 23 45 67" },
  { code: "+249", name: "Sudan", iso: "sd", search: "sd sudan", hint: "91 123 1234" },
  { code: "+251", name: "Ethiopia", iso: "et", search: "et ethiopia", hint: "91 123 4567" },
  { code: "+252", name: "Somalia", iso: "so", search: "so somalia", hint: "61 123 4567" },
  { code: "+253", name: "Djibouti", iso: "dj", search: "dj djibouti", hint: "77 83 10 01" },
  { code: "+254", name: "Kenya", iso: "ke", search: "ke kenya", hint: "712 123 456" },
  { code: "+255", name: "Tanzania", iso: "tz", search: "tz tanzania", hint: "621 234 567" },
  { code: "+256", name: "Uganda", iso: "ug", search: "ug uganda", hint: "712 345 678" },
  { code: "+352", name: "Luxembourg", iso: "lu", search: "lu luxembourg", hint: "628 123 456" },
  { code: "+353", name: "Ireland", iso: "ie", search: "ie ireland", hint: "85 012 3456" },
  { code: "+354", name: "Iceland", iso: "is", search: "is iceland", hint: "611 1234" },
  { code: "+355", name: "Albania", iso: "al", search: "al albania", hint: "67 212 3456" },
  { code: "+356", name: "Malta", iso: "mt", search: "mt malta", hint: "9696 1234" },
  { code: "+357", name: "Cyprus", iso: "cy", search: "cy cyprus", hint: "96 123 456" },
  { code: "+358", name: "Finland", iso: "fi", search: "fi finland", hint: "41 234 5678" },
  { code: "+359", name: "Bulgaria", iso: "bg", search: "bg bulgaria", hint: "48 123 456" },
  { code: "+370", name: "Lithuania", iso: "lt", search: "lt lithuania", hint: "612 34567" },
  { code: "+371", name: "Latvia", iso: "lv", search: "lv latvia", hint: "21 234 567" },
  { code: "+372", name: "Estonia", iso: "ee", search: "ee estonia", hint: "5123 4567" },
  { code: "+374", name: "Armenia", iso: "am", search: "am armenia", hint: "77 123 456" },
  { code: "+375", name: "Belarus", iso: "by", search: "by belarus", hint: "29 491 19 11" },
  { code: "+380", name: "Ukraine", iso: "ua", search: "ua ukraine", hint: "50 123 4567" },
  { code: "+381", name: "Serbia", iso: "rs", search: "rs serbia", hint: "60 123 4567" },
  { code: "+382", name: "Montenegro", iso: "me", search: "me montenegro", hint: "67 622 901" },
  { code: "+385", name: "Croatia", iso: "hr", search: "hr croatia", hint: "92 123 4567" },
  { code: "+386", name: "Slovenia", iso: "si", search: "si slovenia", hint: "31 234 567" },
  { code: "+387", name: "Bosnia & Herzegovina", iso: "ba", search: "ba bosnia herzegovina", hint: "61 123 456" },
  { code: "+389", name: "North Macedonia", iso: "mk", search: "mk north macedonia", hint: "72 345 678" },
  { code: "+420", name: "Czechia", iso: "cz", search: "cz czech czechia", hint: "601 123 456" },
  { code: "+421", name: "Slovakia", iso: "sk", search: "sk slovakia", hint: "912 123 456" },
  { code: "+852", name: "Hong Kong", iso: "hk", search: "hk hong kong", hint: "5123 4567" },
  { code: "+880", name: "Bangladesh", iso: "bd", search: "bd bangladesh", hint: "1812 345 678" },
  { code: "+886", name: "Taiwan", iso: "tw", search: "tw taiwan", hint: "912 345 678" },
  { code: "+960", name: "Maldives", iso: "mv", search: "mv maldives", hint: "771 2345" },
  { code: "+961", name: "Lebanon", iso: "lb", search: "lb lebanon", hint: "71 123 456" },
  { code: "+962", name: "Jordan", iso: "jo", search: "jo jordan", hint: "79 012 3456" },
  { code: "+963", name: "Syria", iso: "sy", search: "sy syria", hint: "944 567 890" },
  { code: "+964", name: "Iraq", iso: "iq", search: "iq iraq", hint: "791 234 5678" },
  { code: "+965", name: "Kuwait", iso: "kw", search: "kw kuwait", hint: "500 12345" },
  { code: "+966", name: "Saudi Arabia", iso: "sa", search: "sa saudi arabia", hint: "50 123 4567" },
  { code: "+967", name: "Yemen", iso: "ye", search: "ye yemen", hint: "712 345 678" },
  { code: "+968", name: "Oman", iso: "om", search: "om oman", hint: "9212 3456" },
  { code: "+970", name: "Palestine", iso: "ps", search: "ps palestine", hint: "599 123 456" },
  { code: "+971", name: "UAE", iso: "ae", search: "ae uae emirates", hint: "50 123 4567" },
  { code: "+973", name: "Bahrain", iso: "bh", search: "bh bahrain", hint: "3600 1234" },
  { code: "+974", name: "Qatar", iso: "qa", search: "qa qatar", hint: "3312 3456" },
  { code: "+977", name: "Nepal", iso: "np", search: "np nepal", hint: "984 123 4567" },
  { code: "+994", name: "Azerbaijan", iso: "az", search: "az azerbaijan", hint: "40 123 45 67" },
  { code: "+995", name: "Georgia", iso: "ge", search: "ge georgia", hint: "555 12 34 56" },
  { code: "+998", name: "Uzbekistan", iso: "uz", search: "uz uzbekistan", hint: "91 234 56 78" },
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
                  <div className="flex items-center gap-3 min-w-0">
                    <CountryFlag iso={c.iso} name={c.name} />
                    <div className="min-w-0">
                      <div className="text-sm text-foreground truncate">{c.name}</div>
                      <div className="text-[10px] text-foreground/35 truncate" dir="ltr">{c.code} {c.hint}</div>
                    </div>
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
        placeholder={selected.hint || placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}
