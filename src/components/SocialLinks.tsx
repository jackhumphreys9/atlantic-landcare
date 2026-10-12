import { site } from "@/site.config";

/** Facebook's "f" mark, in their brand blue. */
export function FacebookMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        fill="#1877F2"
        d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z"
      />
    </svg>
  );
}

/** Instagram's glyph, on its real gradient — a flat brand color reads wrong for this one. */
export function InstagramMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <defs>
        <radialGradient
          id="ig-gradient"
          cx="30%"
          cy="107%"
          r="150%"
        >
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ig-gradient)" />
      <rect
        x="4.5"
        y="4.5"
        width="15"
        height="15"
        rx="4.5"
        fill="none"
        stroke="#fff"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="3.8" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="17" cy="7" r="1.1" fill="#fff" />
    </svg>
  );
}

const platforms = [
  { href: () => site.social.facebook, Icon: FacebookMark, label: "Facebook" },
  { href: () => site.social.instagram, Icon: InstagramMark, label: "Instagram" },
] as const;

/**
 * Facebook + Instagram icon links, shared by the header, hero, and footer so
 * the two platforms are consistent everywhere they appear rather than
 * hand-rolled per section.
 */
export function SocialLinks({
  className,
  iconClassName = "h-6 w-6",
}: {
  className?: string;
  iconClassName?: string;
}) {
  return (
    <div className={className}>
      {platforms.map(({ href, Icon, label }) => (
        <a
          key={label}
          href={href()}
          target="_blank"
          rel="noreferrer"
          aria-label={`${site.name} on ${label}`}
          className="transition-transform hover:scale-110"
        >
          <Icon className={iconClassName} />
        </a>
      ))}
    </div>
  );
}
