import React, { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Check } from "lucide-react";

// Comprehensive country list with proper flags
const COUNTRIES = [
  { code: "+1", name: "United States", flag: "🇺🇸", search: "us usa united states america" },
  { code: "+1", name: "Canada", flag: "🇨🇦", search: "ca can canada" },
  { code: "+20", name: "Egypt", flag: "🇪🇬", search: "eg egypt" },
  { code: "+27", name: "South Africa", flag: "🇿🇦", search: "za south africa" },
  { code: "+30", name: "Greece", flag: "🇬🇷", search: "gr greece" },
  { code: "+31", name: "Netherlands", flag: "🇳🇱", search: "nl netherlands holland" },
  { code: "+32", name: "Belgium", flag: "🇧🇪", search: "be belgium" },
  { code: "+33", name: "France", flag: "🇫🇷", search: "fr france" },
  { code: "+34", name: "Spain", flag: "🇪🇸", search: "es spain" },
  { code: "+36", name: "Hungary", flag: "🇭🇺", search: "hu hungary" },
  { code: "+39", name: "Italy", flag: "🇮🇹", search: "it italy" },
  { code: "+40", name: "Romania", flag: "🇷🇴", search: "ro romania" },
  { code: "+41", name: "Switzerland", flag: "🇨🇭", search: "ch switzerland" },
  { code: "+43", name: "Austria", flag: "🇦🇹", search: "at austria" },
  { code: "+44", name: "United Kingdom", flag: "🇬🇧", search: "gb uk united kingdom britain" },
  { code: "+45", name: "Denmark", flag: "🇩🇰", search: "dk denmark" },
  { code: "+46", name: "Sweden", flag: "🇸🇪", search: "se sweden" },
  { code: "+47", name: "Norway", flag: "🇳🇴", search: "no norway" },
  { code: "+48", name: "Poland", flag: "🇵🇱", search: "pl poland" },
  { code: "+49", name: "Germany", flag: "🇩🇪", search: "de germany deutschland" },
  { code: "+51", name: "Peru", flag: "🇵🇪", search: "pe peru" },
  { code: "+52", name: "Mexico", flag: "🇲🇽", search: "mx mexico" },
  { code: "+53", name: "Cuba", flag: "🇨🇺", search: "cu cuba" },
  { code: "+54", name: "Argentina", flag: "🇦🇷", search: "ar argentina" },
  { code: "+55", name: "Brazil", flag: "🇧🇷", search: "br brazil brasil" },
  { code: "+56", name: "Chile", flag: "🇨🇱", search: "cl chile" },
  { code: "+57", name: "Colombia", flag: "🇨🇴", search: "co colombia" },
  { code: "+58", name: "Venezuela", flag: "🇻🇪", search: "ve venezuela" },
  { code: "+60", name: "Malaysia", flag: "🇲🇾", search: "my malaysia" },
  { code: "+61", name: "Australia", flag: "🇦🇺", search: "au australia" },
  { code: "+62", name: "Indonesia", flag: "🇮🇩", search: "id indonesia" },
  { code: "+63", name: "Philippines", flag: "🇵🇭", search: "ph philippines" },
  { code: "+64", name: "New Zealand", flag: "🇳🇿", search: "nz new zealand" },
  { code: "+65", name: "Singapore", flag: "🇸🇬", search: "sg singapore" },
  { code: "+66", name: "Thailand", flag: "🇹🇭", search: "th thailand" },
  { code: "+81", name: "Japan", flag: "🇯🇵", search: "jp japan" },
  { code: "+82", name: "South Korea", flag: "🇰🇷", search: "kr korea south" },
  { code: "+84", name: "Vietnam", flag: "🇻🇳", search: "vn vietnam" },
  { code: "+86", name: "China", flag: "🇨🇳", search: "cn china" },
  { code: "+90", name: "Turkey", flag: "🇹🇷", search: "tr turkey turkiye" },
  { code: "+91", name: "India", flag: "🇮🇳", search: "in india" },
  { code: "+92", name: "Pakistan", flag: "🇵🇰", search: "pk pakistan" },
  { code: "+93", name: "Afghanistan", flag: "🇦🇫", search: "af afghanistan" },
  { code: "+94", name: "Sri Lanka", flag: "🇱🇰", search: "lk sri lanka" },
  { code: "+95", name: "Myanmar", flag: "🇲🇲", search: "mm myanmar burma" },
  { code: "+98", name: "Iran", flag: "🇮🇷", search: "ir iran" },
  { code: "+212", name: "Morocco", flag: "🇲🇦", search: "ma morocco" },
  { code: "+213", name: "Algeria", flag: "🇩🇿", search: "dz algeria" },
  { code: "+216", name: "Tunisia", flag: "🇹🇳", search: "tn tunisia" },
  { code: "+218", name: "Libya", flag: "🇱🇾", search: "ly libya" },
  { code: "+220", name: "Gambia", flag: "🇬🇲", search: "gm gambia" },
  { code: "+221", name: "Senegal", flag: "🇸🇳", search: "sn senegal" },
  { code: "+222", name: "Mauritania", flag: "🇲🇷", search: "mr mauritania" },
  { code: "+223", name: "Mali", flag: "🇲🇱", search: "ml mali" },
  { code: "+224", name: "Guinea", flag: "🇬🇳", search: "gn guinea" },
  { code: "+225", name: "Ivory Coast", flag: "🇨🇮", search: "ci ivory coast" },
  { code: "+226", name: "Burkina Faso", flag: "🇧🇫", search: "bf burkina faso" },
  { code: "+227", name: "Niger", flag: "🇳🇪", search: "ne niger" },
  { code: "+228", name: "Togo", flag: "🇹🇬", search: "tg togo" },
  { code: "+229", name: "Benin", flag: "🇧🇯", search: "bj benin" },
  { code: "+230", name: "Mauritius", flag: "🇲🇺", search: "mu mauritius" },
  { code: "+231", name: "Liberia", flag: "🇱🇷", search: "lr liberia" },
  { code: "+232", name: "Sierra Leone", flag: "🇸🇱", search: "sl sierra leone" },
  { code: "+233", name: "Ghana", flag: "🇬🇭", search: "gh ghana" },
  { code: "+234", name: "Nigeria", flag: "🇳🇬", search: "ng nigeria" },
  { code: "+235", name: "Chad", flag: "🇹🇩", search: "td chad" },
  { code: "+236", name: "Central African Republic", flag: "🇨🇫", search: "cf central african republic" },
  { code: "+237", name: "Cameroon", flag: "🇨🇲", search: "cm cameroon" },
  { code: "+238", name: "Cape Verde", flag: "🇨🇻", search: "cv cape verde" },
  { code: "+249", name: "Sudan", flag: "🇸🇩", search: "sd sudan" },
  { code: "+252", name: "Somalia", flag: "🇸🇴", search: "so somalia" },
  { code: "+253", name: "Djibouti", flag: "🇩🇯", search: "dj djibouti" },
  { code: "+357", name: "Cyprus", flag: "🇨🇾", search: "cy cyprus" },
  { code: "+880", name: "Bangladesh", flag: "🇧🇩", search: "bd bangladesh" },
  { code: "+960", name: "Maldives", flag: "🇲🇻", search: "mv maldives" },
  { code: "+961", name: "Lebanon", flag: "🇱🇧", search: "lb lebanon" },
  { code: "+962", name: "Jordan", flag: "🇯🇴", search: "jo jordan" },
  { 
    code: "+963", 
    name: "Syria", 
    search: "sy syria",
    // Custom SVG for the Syrian Revolution Flag (Green, White, Black with 3 Red Stars)
    flag: "data:image/svg+xml,%3Csvg viewBox='0 0 900 600' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='900' height='200' fill='%23007A3D'/%3E%3Crect y='200' width='900' height='200' fill='%23FFFFFF'/%3E%3Crect y='400' width='900' height='200' fill='%23000000'/%3E%3Cg fill='%23CE1126'%3E%3Cpath d='M225,230 l15,45 h48 l-38,28 l14,45 l-39,-28 l-39,28 l14,-45 l-38,-28 h48 z'/%3E%3Cpath d='M450,230 l15,45 h48 l-38,28 l14,45 l-39,-28 l-39,28 l14,-45 l-38,-28 h48 z'/%3E%3Cpath d='M675,230 l15,45 h48 l-38,28 l14,45 l-39,-28 l-39,28 l14,-45 l-38,-28 h48 z'/%3E%3C/g%3E%3C/svg%3E",
    isSvg: true
  }, 
  { code: "+964", name: "Iraq", flag: "🇮🇶", search: "iq iraq" },
  { code: "+965", name: "Kuwait", flag: "🇰🇼", search: "kw kuwait" },
  { code: "+966", name: "Saudi Arabia", flag: "🇸🇦", search: "sa saudi arabia" },
  { code: "+967", name: "Yemen", flag: "🇾🇪", search: "ye yemen" },
  { code: "+968", name: "Oman", flag: "🇴🇲", search: "om oman" },
  // Completed Palestine
  { code: "+970", name: "Palestine", flag: "🇵🇸", search: "ps palestine" },
  { code: "+971", name: "United Arab Emirates", flag: "🇦🇪", search: "ae uae united arab emirates" },
  { code: "+972", name: "Israel", flag: "🇮🇱", search: "il israel" },
  { code: "+973", name: "Bahrain", flag: "🇧🇭", search: "bh bahrain" },
  { code: "+974", name: "Qatar", flag: "🇶🇦", search: "qa qatar" },
];

const PhoneInput = ({ value, onChange, phoneCode, onPhoneCodeChange, placeholder = "555 123 4567", className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(
    COUNTRIES.find(c => c.code === phoneCode) || COUNTRIES.find(c => c.code === "+1")
  );
  const dropdownRef = useRef(null);

  // Update selected country when phoneCode prop changes
  useEffect(() => {
    const country = COUNTRIES.find(c => c.code === phoneCode);
    if (country) {
      setSelectedCountry(country);
    }
  }, [phoneCode]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter countries based on search
  const filteredCountries = COUNTRIES.filter((country) =>
    country.search.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.code.includes(searchQuery)
  );

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    if (onPhoneCodeChange) {
      onPhoneCodeChange(country.code);
    }
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
        <div className={`flex relative ${className}`}>
          {/* Country Selector Button */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-between gap-2 rounded-l-xl border border-white/10 bg-white/[0.02] px-3 py-3 hover:bg-white/[0.04] focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/50 transition-colors w-[110px]"
            >
              <span className="flex items-center gap-2 text-base">
                {selectedCountry.isSvg ? (
                  <img src={selectedCountry.flag} alt={selectedCountry.name} className="w-[1.25em] h-[1em] inline-block rounded-[2px] shadow-sm object-cover" />
                ) : (
                  <span className="text-lg leading-none">{selectedCountry.flag}</span>
                )}
                <span className="text-white text-sm font-medium">{selectedCountry.code}</span>
              </span>
              <ChevronDown className="w-4 h-4 text-white/60" />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute top-full left-0 mt-1 w-72 bg-[#0a0a0a] border border-white/10 rounded-lg shadow-lg z-50 overflow-hidden">
                {/* Search Input */}
                <div className="p-2 border-b border-white/10">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                    <input
                      type="text"
                      className="w-full pl-9 pr-3 py-2 bg-white/[0.02] border border-white/10 rounded-md text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 focus:border-cyan-400/60"
                      placeholder="Search country or code..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                  </div>
                </div>

                {/* Country List */}
                <div className="max-h-60 overflow-y-auto">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country, index) => (
                      <button
                        key={`${country.code}-${index}`}
                        onClick={() => handleCountrySelect(country)}
                        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-white/[0.04] text-left transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {country.isSvg ? (
                            <img src={country.flag} alt={country.name} className="w-[1.25em] h-[1em] inline-block rounded-[2px] shadow-sm object-cover" />
                          ) : (
                            <span className="text-lg leading-none">{country.flag}</span>
                          )}
                          <span className="text-sm text-white">{country.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-white/60 font-medium">{country.code}</span>
                          {selectedCountry.name === country.name && (
                            <Check className="w-4 h-4 text-cyan-400" />
                          )}
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-white/60 text-center">
                      No countries found.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Phone Number Input */}
          <input
            type="tel"
            className="flex-1 w-full rounded-r-xl border border-l-0 border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/50 transition-colors"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
          />
        </div>
  );
};

export default PhoneInput;