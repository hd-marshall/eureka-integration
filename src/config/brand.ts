// ─────────────────────────────────────────────────────────────────────────────
// BRAND CONFIGURATION
//
// To white-label this platform for a client, change the values below.
// Then update the matching colour values in src/app/globals.css.
//
// That is all that needs to change — every component reads from here.
// ─────────────────────────────────────────────────────────────────────────────

export const brand = {
  // ── Identity ───────────────────────────────────────────────────────────────
  name:    'Eureka Integration',
  tagline: 'Precision Cutting Optimisation Software',
  domain:  'eureka-integration.com',

  // ── Contact ────────────────────────────────────────────────────────────────
  email:   'hello@eureka-integration.com',

  // ── Logo ───────────────────────────────────────────────────────────────────
  // Path relative to /public — swap for the client's logo file
  logo:    '/logo-placeholder.png',

  // ── Colours ────────────────────────────────────────────────────────────────
  // These must match the --color-brand-* values in src/app/globals.css.
  // Change both places when re-branding.
  colors: {
    navy:       '#002147',  // --color-brand-navy
    blue:       '#334771',  // --color-brand-blue
    accent:     '#1976D2',  // --color-brand-accent
    background: '#D8D1CE',  // --color-brand-background
    muted:      '#2E3A59',  // --color-brand-muted
    white:      '#FFFFFF',  // --color-brand-white
  },

  // ── Navigation ─────────────────────────────────────────────────────────────
  nav: [
    { name: 'Our Specialisation', href: '#portfolio'   },
    { name: 'The Platform',       href: '#showcase'    },
    { name: 'White Label',        href: '#white-label' },
    { name: 'Services',           href: '#services'    },
  ],

  // ── Footer links ───────────────────────────────────────────────────────────
  social: {
    github:   'https://github.com/',
    linkedin: 'https://linkedin.com/company/',
  },
} as const;
