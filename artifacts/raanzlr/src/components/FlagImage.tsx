import React from "react";

interface FlagImageProps {
  /** ISO 3166-1 alpha-2 country code, e.g. "SA", "AE", "SY" — or "EU" for the EU flag */
  code: string;
  alt?: string;
  className?: string;
}

/**
 * Renders a country flag image using flagcdn.com.
 * Works consistently across all browsers and operating systems,
 * unlike Unicode flag emoji which don't render on Windows.
 */
export default function FlagImage({ code, alt = "flag", className = "w-14 h-10" }: FlagImageProps) {
  const lower = code.toLowerCase();
  // flagcdn.com uses lowercase ISO codes; EU is supported natively
  const src = `https://flagcdn.com/w80/${lower}.png`;
  const src2x = `https://flagcdn.com/w160/${lower}.png`;

  return (
    <img
      src={src}
      srcSet={`${src2x} 2x`}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
    />
  );
}
