import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  DEFAULT_PHONE_COUNTRY,
  PHONE_COUNTRIES,
  formatCountryCompact,
  formatCountryOption,
  formatPhoneValue,
  getPhoneCountry,
  parsePhoneValue,
} from "../../data/phoneCountries";

const groupClass =
  "flex w-full items-stretch rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] text-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-royal/30";

const pickerBtnClass =
  "flex items-center gap-1 shrink-0 min-w-[5.5rem] pl-3 pr-2 py-2.5 border-0 border-r border-[var(--border)] bg-transparent text-[var(--text-primary)] text-sm cursor-pointer hover:bg-[var(--border-subtle)]/40 transition-colors";

const inputClass =
  "min-w-0 flex-1 px-4 py-2.5 border-0 bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-0";

export default function PhoneInput({
  value = "",
  onChange,
  required = false,
  disabled = false,
  id,
  name,
  placeholder = "Phone number",
  defaultCountry = DEFAULT_PHONE_COUNTRY,
}) {
  const [countryCode, setCountryCode] = useState(defaultCountry);
  const [national, setNational] = useState("");
  const [open, setOpen] = useState(false);
  const pickerRef = useRef(null);

  useEffect(() => {
    const next = parsePhoneValue(value);
    setNational(next.national);

    if (!value) {
      setCountryCode(defaultCountry);
      return;
    }

    const matching = PHONE_COUNTRIES.filter((c) => value.trim().startsWith(c.dial));
    if (matching.length === 1) {
      setCountryCode(matching[0].code);
      return;
    }

    setCountryCode((current) =>
      matching.some((c) => c.code === current) ? current : next.countryCode
    );
  }, [value, defaultCountry]);

  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (e) => {
      if (!pickerRef.current?.contains(e.target)) setOpen(false);
    };
    const onEscape = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  const selected = getPhoneCountry(countryCode);

  const emit = (code, digits) => {
    onChange?.(formatPhoneValue(code, digits));
  };

  const pickCountry = (code) => {
    setCountryCode(code);
    emit(code, national);
    setOpen(false);
  };

  return (
    <div className={`${groupClass}${disabled ? " opacity-60 pointer-events-none" : ""}`}>
      <div ref={pickerRef} className="relative shrink-0">
        <button
          type="button"
          className={pickerBtnClass}
          onClick={() => setOpen((v) => !v)}
          disabled={disabled}
          aria-label={`Country: ${selected.name}`}
          aria-expanded={open}
          aria-haspopup="listbox"
          title={selected.name}
        >
          <span className="whitespace-nowrap">{formatCountryCompact(selected)}</span>
          <ChevronDown size={14} className={`shrink-0 opacity-60 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <ul
            role="listbox"
            aria-label="Select country"
            className="absolute left-0 top-full z-50 mt-1 w-[min(100vw-2rem,18rem)] max-h-64 overflow-y-auto rounded-xl border border-[var(--border)] bg-[var(--bg-card)] shadow-lg py-1"
          >
            {PHONE_COUNTRIES.map((country) => {
              const active = country.code === countryCode;
              return (
                <li key={country.code} role="option" aria-selected={active}>
                  <button
                    type="button"
                    className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                      active
                        ? "bg-royal/10 text-[var(--text-primary)] font-medium"
                        : "text-[var(--text-secondary)] hover:bg-[var(--border-subtle)]"
                    }`}
                    onClick={() => pickCountry(country.code)}
                  >
                    {formatCountryOption(country)}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <input
        type="tel"
        id={id}
        name={name}
        required={required}
        disabled={disabled}
        value={national}
        onChange={(e) => {
          const digits = e.target.value.replace(/\D/g, "");
          setNational(digits);
          emit(countryCode, digits);
        }}
        className={inputClass}
        placeholder={placeholder}
        autoComplete="tel-national"
        inputMode="numeric"
      />
    </div>
  );
}
