export default function BarbellSpinner() {
  return (
    <svg
      viewBox="0 0 56 18"
      width="42"
      height="14"
      fill="currentColor"
      aria-hidden="true"
      className="animate-bounce"
    >
      {/* Left outer plate */}
      <rect x="0" y="1" width="6" height="16" rx="1.5" />
      {/* Left inner plate */}
      <rect x="7" y="3.5" width="4" height="11" rx="1" />
      {/* Bar */}
      <rect x="11" y="7" width="34" height="4" rx="2" />
      {/* Right inner plate */}
      <rect x="45" y="3.5" width="4" height="11" rx="1" />
      {/* Right outer plate */}
      <rect x="50" y="1" width="6" height="16" rx="1.5" />
    </svg>
  );
}
