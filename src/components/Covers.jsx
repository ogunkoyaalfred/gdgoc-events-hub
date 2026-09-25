// One small SVG per category. Each is drawn on the same 220 x 96 canvas,
// so they all crop and scale the same way inside the card.
const Svg = ({ children }) => (
  <svg
    viewBox="0 0 220 96"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
    className="h-full w-full"
  >
    {children}
  </svg>
)

function WebCover() {
  return (
    <Svg>
      <rect x="50" y="16" width="120" height="90" rx="6" fill="#E6F1FB" stroke="#378ADD" strokeWidth="1.5" />
      <path d="M50 22a6 6 0 0 1 6-6h108a6 6 0 0 1 6 6v8H50z" fill="#85B7EB" />
      <circle cx="60" cy="23" r="2" fill="#E6F1FB" />
      <circle cx="68" cy="23" r="2" fill="#E6F1FB" />
      <circle cx="76" cy="23" r="2" fill="#E6F1FB" />
      <rect x="60" y="40" width="50" height="8" rx="2" fill="#85B7EB" />
      <rect x="118" y="40" width="42" height="8" rx="4" fill="#378ADD" />
      <rect x="60" y="54" width="90" height="6" rx="2" fill="#B5D4F4" />
      <rect x="60" y="66" width="70" height="6" rx="2" fill="#B5D4F4" />
    </Svg>
  )
}

function MobileCover() {
  return (
    <Svg>
      <circle cx="38" cy="30" r="15" fill="#97C459" />
      <circle cx="188" cy="66" r="22" fill="#97C459" />
      <rect x="85" y="10" width="50" height="100" rx="10" fill="#EAF3DE" stroke="#639922" strokeWidth="1.5" />
      <rect x="100" y="16" width="20" height="4" rx="2" fill="#97C459" />
      <rect x="94" y="30" width="16" height="16" rx="4" fill="#97C459" />
      <rect x="114" y="30" width="16" height="16" rx="4" fill="#639922" />
      <rect x="94" y="52" width="16" height="16" rx="4" fill="#639922" />
      <rect x="114" y="52" width="16" height="16" rx="4" fill="#97C459" />
    </Svg>
  )
}

function CloudCover() {
  return (
    <Svg>
      <circle cx="98" cy="50" r="20" fill="#FAEEDA" />
      <circle cx="122" cy="40" r="26" fill="#FAEEDA" />
      <circle cx="148" cy="52" r="18" fill="#FAEEDA" />
      <rect x="92" y="52" width="72" height="20" rx="10" fill="#FAEEDA" />
      <circle cx="36" cy="22" r="9" fill="#EF9F27" />
      <circle cx="48" cy="20" r="11" fill="#EF9F27" />
      <rect x="28" y="24" width="32" height="8" rx="4" fill="#EF9F27" />
      <circle cx="190" cy="20" r="5" fill="#EF9F27" />
    </Svg>
  )
}

function AiMlCover() {
  return (
    <Svg>
      <path
        d="M50 24L110 14M50 24L110 46M50 48L110 14M50 48L110 46M50 48L110 78M50 72L110 46M50 72L110 78M110 14L170 36M110 46L170 36M110 46L170 60M110 78L170 60"
        stroke="#F0997B"
        strokeWidth="1.5"
        fill="none"
      />
      <g fill="#FAECE7" stroke="#D85A30" strokeWidth="1.5">
        <circle cx="50" cy="24" r="7" />
        <circle cx="50" cy="48" r="7" />
        <circle cx="50" cy="72" r="7" />
        <circle cx="110" cy="14" r="7" />
        <circle cx="110" cy="46" r="7" />
        <circle cx="110" cy="78" r="7" />
        <circle cx="170" cy="36" r="7" />
        <circle cx="170" cy="60" r="7" />
      </g>
    </Svg>
  )
}

function DesignCover() {
  return (
    <Svg>
      <circle cx="72" cy="46" r="28" fill="#7F77DD" />
      <rect x="102" y="20" width="48" height="48" rx="4" fill="#EEEDFE" />
      <circle cx="126" cy="44" r="11" fill="#AFA9EC" />
      <polygon points="152,74 178,28 204,74" fill="#534AB7" />
    </Svg>
  )
}

function CareerCover() {
  return (
    <Svg>
      <rect x="56" y="66" width="30" height="40" rx="4" fill="#E1F5EE" />
      <rect x="90" y="48" width="30" height="58" rx="4" fill="#5DCAA5" />
      <rect x="124" y="30" width="30" height="76" rx="4" fill="#1D9E75" />
      <rect x="158" y="12" width="30" height="94" rx="4" fill="#0F6E56" />
      <circle cx="32" cy="24" r="8" fill="#5DCAA5" />
    </Svg>
  )
}

// Used when an event has a category we have not drawn yet
function FallbackCover() {
  return (
    <Svg>
      <circle cx="70" cy="48" r="26" fill="#D4D4D8" />
      <rect x="104" y="24" width="46" height="46" rx="6" fill="#F4F4F5" />
      <circle cx="176" cy="60" r="14" fill="#A1A1AA" />
    </Svg>
  )
}

export const Covers = {
  Web: WebCover,
  Mobile: MobileCover,
  Cloud: CloudCover,
  'AI/ML': AiMlCover,
  Design: DesignCover,
  Career: CareerCover,
}

export { FallbackCover }
