/** Small inline line icons (1.5px stroke). Decorative: always next to visible text. */
type P = {className?: string};
const base = (className = 'size-4') => ({
  className,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
});

export const IconWhatsApp = ({className}: P) => (
  <svg {...base(className)}>
    <path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4l-4.5 1.1z" />
    <path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1.2-1.6-2-1-1 .9c-1.2-.5-2.2-1.5-2.7-2.7l.9-1-1-2L9.3 8" />
  </svg>
);
export const IconPhone = ({className}: P) => (
  <svg {...base(className)}>
    <path d="M5 3.5h3.5l1.5 4-2 1.3a11 11 0 0 0 7.2 7.2l1.3-2 4 1.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.1 1.5 1.5 0 0 1 5 3.5z" />
  </svg>
);
export const IconPin = ({className}: P) => (
  <svg {...base(className)}>
    <path d="M12 21s-6.5-5.8-6.5-11a6.5 6.5 0 0 1 13 0c0 5.2-6.5 11-6.5 11z" />
    <circle cx="12" cy="10" r="2.3" />
  </svg>
);
export const IconClock = ({className}: P) => (
  <svg {...base(className)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);
export const IconArrow = ({className}: P) => (
  <svg {...base(className)}>
    <path d="M4 12h15M13.5 6.5L19 12l-5.5 5.5" />
  </svg>
);
export const IconFacebook = ({className}: P) => (
  <svg {...base(className)}>
    <path d="M14.5 8H16V4.8h-2c-2.4 0-3.6 1.5-3.6 3.8V11H8v3.2h2.4V21h3.3v-6.8h2.3l.5-3.2h-2.8V9.1c0-.7.3-1.1.8-1.1z" />
  </svg>
);
export const IconInstagram = ({className}: P) => (
  <svg {...base(className)}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="17" cy="7" r=".6" fill="currentColor" />
  </svg>
);
export const IconChevron = ({className, dir = 'right'}: P & {dir?: 'left' | 'right'}) => (
  <svg {...base(className)}>
    <path d={dir === 'right' ? 'M9 5l7 7-7 7' : 'M15 5l-7 7 7 7'} />
  </svg>
);
