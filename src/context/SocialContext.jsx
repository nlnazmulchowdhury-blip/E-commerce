import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  SOCIAL_CHANNELS,
  WHATSAPP,
  channelHref,
  phoneLabel,
  phoneTel,
} from '../data/social';

const SocialContext = createContext(null);

const SOCIAL_KEY = 'cakehaus_social_v1';

const seed = () =>
  Object.fromEntries(
    SOCIAL_CHANNELS.map((channel) => [
      channel.key,
      { value: channel.defaultValue, enabled: channel.defaultOn },
    ]),
  );

function loadSocial() {
  const base = seed();
  try {
    const raw = localStorage.getItem(SOCIAL_KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return base;
    for (const channel of SOCIAL_CHANNELS) {
      const row = parsed[channel.key];
      if (row && typeof row === 'object') {
        base[channel.key] = {
          value: String(row.value ?? base[channel.key].value),
          enabled: Boolean(row.enabled),
        };
      }
    }
    return base;
  } catch {
    return base;
  }
}

export function SocialProvider({ children }) {
  const [social, setSocial] = useState(loadSocial);

  useEffect(() => {
    localStorage.setItem(SOCIAL_KEY, JSON.stringify(social));
  }, [social]);

  useEffect(() => {
    const sync = (event) => {
      if (event.key !== SOCIAL_KEY || !event.newValue) return;
      try {
        const parsed = JSON.parse(event.newValue);
        if (!parsed || typeof parsed !== 'object') return;
        setSocial((prev) => {
          if (JSON.stringify(prev) === event.newValue) return prev;
          const next = { ...prev };
          for (const channel of SOCIAL_CHANNELS) {
            const row = parsed[channel.key];
            if (row && typeof row === 'object') {
              next[channel.key] = {
                value: String(row.value ?? prev[channel.key].value),
                enabled: Boolean(row.enabled),
              };
            }
          }
          return next;
        });
      } catch {
        /* ignore malformed payload from another tab */
      }
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const setChannel = useCallback((key, patch) => {
    setSocial((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }));
  }, []);

  const resetSocial = useCallback(() => setSocial(seed()), []);

  const value = useMemo(() => {
    const channels = SOCIAL_CHANNELS.map((channel) => {
      const row = social[channel.key];
      return { ...channel, ...row, href: row.enabled ? channelHref(channel, row.value) : '' };
    });
    const waHref =
      channelHref(WHATSAPP, social[WHATSAPP.key].value) || channelHref(WHATSAPP, WHATSAPP.defaultValue);

    return {
      social,
      channels,
      activeChannels: channels.filter((channel) => channel.enabled && channel.href),
      whatsappHref: (text) =>
        waHref ? (text ? `${waHref}?text=${encodeURIComponent(text)}` : waHref) : '',
      whatsappLabel: phoneLabel(social[WHATSAPP.key].value),
      whatsappTel: phoneTel(social[WHATSAPP.key].value),
      setChannel,
      resetSocial,
    };
  }, [social, setChannel, resetSocial]);

  return <SocialContext.Provider value={value}>{children}</SocialContext.Provider>;
}

export function useSocial() {
  const ctx = useContext(SocialContext);
  if (!ctx) throw new Error('useSocial must be used inside SocialProvider');
  return ctx;
}
