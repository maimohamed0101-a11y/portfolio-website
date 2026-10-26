/* Hand-drawn style annotations. All decorative, hidden from assistive tech. */

type P = { className?: string };

export function Squiggle({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 300 24" fill="none" aria-hidden="true" preserveAspectRatio="none">
      <path
        d="M3 15c18-9 30-9 44 0s28 9 44 0 30-9 46 0 28 9 44 0 30-9 46 0 28 8 40 1 20-7 30-3"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Arrow({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 120 80" fill="none" aria-hidden="true">
      <path
        d="M6 10c22 2 52 8 70 26 10 10 15 22 16 34"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M78 58l14 14 10-18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Scribble({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 200 80" fill="none" aria-hidden="true" preserveAspectRatio="none">
      <path
        d="M120 8C70 2 14 12 8 38s58 36 108 32 78-18 74-38S122 4 84 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Star({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      <path
        d="M20 0c1.6 10.4 5.6 16.8 20 20-14.4 3.2-18.4 9.6-20 20-1.6-10.4-5.6-16.8-20-20C14.4 16.8 18.4 10.4 20 0z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Shape({ shape, className }: P & { shape: "circle" | "square" | "triangle" }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      {shape === "circle" && <circle cx="24" cy="24" r="22" fill="currentColor" />}
      {shape === "square" && <rect x="4" y="4" width="40" height="40" fill="currentColor" />}
      {shape === "triangle" && <path d="M24 3l22 40H2z" fill="currentColor" />}
    </svg>
  );
}
