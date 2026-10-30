const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export const IconSearch = (p) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4 4" />
  </svg>
);

export const IconCart = (p) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}>
    <path d="M3 4h2.2l2.2 11.2a1.6 1.6 0 0 0 1.6 1.3h8.2a1.6 1.6 0 0 0 1.6-1.2L20.5 8H6" />
    <circle cx="9.5" cy="20" r="1.3" />
    <circle cx="17.5" cy="20" r="1.3" />
  </svg>
);

export const IconUser = (p) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}>
    <circle cx="12" cy="8" r="3.6" />
    <path d="M5 20c.6-3.6 3.4-5.6 7-5.6s6.4 2 7 5.6" />
  </svg>
);

export const IconHeart = (p) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}>
    <path d="M12 20s-7.6-4.7-7.6-9.6A4.3 4.3 0 0 1 12 7.8a4.3 4.3 0 0 1 7.6 2.6C19.6 15.3 12 20 12 20Z" />
  </svg>
);

export const IconChevron = (p) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}>
    <path d="m7 10 5 5 5-5" />
  </svg>
);

export const IconArrow = (p) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}>
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
);

export const IconStar = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5Z" />
  </svg>
);

export const IconTruck = (p) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}>
    <path d="M3 6h11v10H3zM14 9h4l3 3v4h-7" />
    <circle cx="7" cy="18" r="1.6" />
    <circle cx="17.5" cy="18" r="1.6" />
  </svg>
);

export const IconLeaf = (p) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}>
    <path d="M20 4C10 4 4 8 4 15a5 5 0 0 0 5 5c7 0 11-6 11-16Z" />
    <path d="M4 20c2-5 5.5-8 10-10" />
  </svg>
);

export const IconShield = (p) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}>
    <path d="M12 3 5 6v5.5c0 4.6 3 7.7 7 9.5 4-1.8 7-4.9 7-9.5V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const IconCash = (p) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}>
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <circle cx="12" cy="12" r="2.6" />
    <path d="M6 10v4M18 10v4" />
  </svg>
);

export const IconTrash = (p) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}>
    <path d="M4 7h16M9 7V4.8h6V7M6 7l1 12.2A1.8 1.8 0 0 0 8.8 21h6.4a1.8 1.8 0 0 0 1.8-1.8L18 7" />
  </svg>
);

export const IconPlus = (p) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconMinus = (p) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}>
    <path d="M5 12h14" />
  </svg>
);

export const IconClose = (p) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const IconCheck = (p) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </svg>
);

export const IconWhatsapp = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 2.2A9.7 9.7 0 0 0 3.6 16.8L2.2 21.8l5.1-1.3A9.7 9.7 0 1 0 12 2.2Zm0 1.8a7.9 7.9 0 0 1 6.7 12.1 7.9 7.9 0 0 1-11.5 1.6l-.4-.3-3 .8.8-2.9-.3-.4A7.9 7.9 0 0 1 12 4Zm-3.1 3.9c-.2 0-.5.1-.7.4-.3.3-.9 1-.9 2.1 0 1.2.8 2.4 1 2.6.2.2 1.7 2.7 4.2 3.7 2.1.8 2.5.7 3 .6.5 0 1.5-.6 1.7-1.2.2-.6.2-1.2.2-1.3-.1-.1-.2-.2-.5-.3l-1.7-.8c-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2-1.2a7.7 7.7 0 0 1-1.4-1.8c-.2-.3 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5 0-.2 0-.3 0-.4L9.6 9c-.2-.4-.4-.4-.6-.4Z" />
  </svg>
);

export const IconCake = (p) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}>
    <path d="M4.5 20.5h15" />
    <path d="M6 20.5v-5.2c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v5.2" />
    <path d="M6 16.4c1 .8 2 .8 3 0s2-.8 3 0 2 .8 3 0 2-.8 3 0" />
    <path d="M8.5 13.3V9.5h7v3.8" />
    <path d="M12 6.4V4.2" />
    <path d="M12 2.6c.7.7.7 1.4 0 1.8-.7-.4-.7-1.1 0-1.8Z" fill="currentColor" stroke="none" />
  </svg>
);

export const IconGrid = (p) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.6" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.6" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.6" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.6" />
  </svg>
);

export const IconSettings = (p) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M19.4 14.4a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5v.3a2 2 0 1 1-4 0v-.2a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.2a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.2a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1h.3a2 2 0 1 1 0 4h-.2a1.6 1.6 0 0 0-1.5 1Z" />
  </svg>
);

export const IconTag = (p) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}>
    <path d="M12.6 3.5H20a.5.5 0 0 1 .5.5v7.4a2 2 0 0 1-.6 1.4l-7.4 7.4a2 2 0 0 1-2.8 0l-5.4-5.4a2 2 0 0 1 0-2.8l7.4-7.4a2 2 0 0 1 1.3-.5Z" />
    <circle cx="16" cy="8" r="1.4" />
  </svg>
);

export const IconBox = (p) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}>
    <path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z" />
    <path d="m4 7 8 4 8-4M12 11v10" />
  </svg>
);

export const IconLogout = (p) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}>
    <path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" />
    <path d="M10 8l-4 4 4 4M6 12h10" />
  </svg>
);

export const IconEdit = (p) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}>
    <path d="M4 20h4.5L19 9.5a2.1 2.1 0 0 0-3-3L5.5 17 4 20Z" />
    <path d="m14 6 3 3" />
  </svg>
);

export const IconEye = (p) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const IconTrendUp = (p) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}>
    <path d="M3 17.5 9 11l4 4 7.5-7.5" />
    <path d="M15 7.5h5.5V13" />
  </svg>
);

export const IconImage = (p) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}>
    <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
    <circle cx="9" cy="10" r="1.6" />
    <path d="m5 18 4.6-4.6 3.2 3.2 2.6-2.6L19 17.4" />
  </svg>
);

export const IconUpload = (p) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}>
    <path d="M12 16.5V4.5" />
    <path d="m7.5 9 4.5-4.5L16.5 9" />
    <path d="M4 15.5v2.5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2.5" />
  </svg>
);

export const IconMessage = (p) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}>
    <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H9l-4 4v-4H6.5A2.5 2.5 0 0 1 4 13.5v-7Z" />
    <path d="M8 9h8M8 12h5" />
  </svg>
);

export const IconMessenger = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path
      fillRule="evenodd"
      d="M12 2.6c-5.4 0-9.7 4-9.7 9 0 2.7 1.3 5.2 3.5 6.8v3.1c0 .4.4.6.7.4l2.6-1.5c.9.2 1.9.4 2.9.4 5.4 0 9.7-4 9.7-9.2S17.4 2.6 12 2.6Zm5.6 6.9-4.7 5c-.3.3-.8.3-1.1 0l-2.1-1.9-3.5 2.9c-.3.2-.7-.1-.5-.4l4.7-5c.3-.3.8-.3 1.1 0l2.2 2 3.4-3c.3-.2.7.1.5.4Z"
    />
  </svg>
);

export const IconFacebook = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M13.5 21v-7h2.6l.4-3h-3V9.1c0-.9.3-1.5 1.6-1.5H16.6V5c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.1H7.8v3h2.6v7h3.1Z" />
  </svg>
);

export const IconInstagram = (p) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1.05" fill="currentColor" stroke="none" />
  </svg>
);

export const IconTiktok = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M14.2 3h2.5c.2 1.7 1.2 3 2.9 3.3v2.5c-1.2 0-2.3-.4-3.2-1v5.4a5.2 5.2 0 1 1-4.6-5.2v2.7a2.6 2.6 0 1 0 2.1 2.5V3Z" />
  </svg>
);

export const IconYoutube = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path
      fillRule="evenodd"
      d="M21.6 7.6a2.8 2.8 0 0 0-2-2C17.9 5.2 12 5.2 12 5.2s-5.9 0-7.6.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2 12a29 29 0 0 0 .4 4.4 2.8 2.8 0 0 0 2 2c1.7.4 7.6.4 7.6.4s5.9 0 7.6-.4a2.8 2.8 0 0 0 2-2A29 29 0 0 0 22 12a29 29 0 0 0-.4-4.4ZM10 15.2V8.8L15.5 12 10 15.2Z"
    />
  </svg>
);

export const IconShare = (p) => (
  <svg viewBox="0 0 24 24" {...base} aria-hidden="true" {...p}>
    <circle cx="18" cy="5.5" r="2.5" />
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="18" cy="18.5" r="2.5" />
    <path d="m8.2 10.7 7.6-4M8.2 13.3l7.6 4" />
  </svg>
);
