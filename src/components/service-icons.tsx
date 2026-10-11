/**
 * Simple line icons for each service, keyed by the `icon` field in
 * site.config.ts. Shared between the homepage services grid, the services
 * index, and each service's own page — one set of paths, several renderers.
 */
export const serviceIcons: Record<string, React.ReactNode> = {
  stump: (
    <>
      <ellipse cx="12" cy="8" rx="5" ry="2.5" />
      <path d="M7 8v6c0 1.9 2.2 3.4 5 3.4s5-1.5 5-3.4V8" />
      <path d="M7 14c-1.5.8-2.5 1.9-3 3M17 14c1.5.8 2.5 1.9 3 3M3 21h18" />
    </>
  ),
  design: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 10h18M10 10v10" />
      <circle cx="15.5" cy="15" r="2" />
    </>
  ),
  brush: (
    <>
      <path d="M12 21v-6" />
      <path d="M12 15c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5-2.7 5-6 5z" />
      <path d="M4 21h16" />
    </>
  ),
  storm: <path d="M13 2 5 13h6l-2 9 9-12h-6z" />,
  leaves: (
    <>
      <path d="M6 18c8 2.5 13-2.5 13-11 0 0-9.5-2-12.5 4.5C5 14.5 6 18 6 18z" />
      <path d="M4 20c2.5-3.5 5-6 8.5-7.5" />
    </>
  ),
  beds: (
    <>
      <path d="M3 10c3-2 6-2 9 0s6 2 9 0" />
      <path d="M3 15c3-2 6-2 9 0s6 2 9 0" />
      <path d="M3 20h18" />
    </>
  ),
  wash: (
    <>
      <path d="M16 3s5 5.4 5 8.8a5 5 0 0 1-10 0C11 8.4 16 3 16 3z" />
      <path d="M3 7h5M2 12h5M3 17h5" />
    </>
  ),
};

/** A standard 24x24 stroke icon from the map above, sized by `className`. */
export function ServiceIcon({
  icon,
  className,
}: {
  icon: string;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {serviceIcons[icon]}
    </svg>
  );
}
