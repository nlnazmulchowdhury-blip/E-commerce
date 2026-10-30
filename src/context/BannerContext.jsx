import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_BANNERS } from '../data/banners';

const BannerContext = createContext(null);

const BANNER_KEY = 'cakehaus_banners_v1';

const seed = () => DEFAULT_BANNERS.map((b) => ({ ...b }));

function loadBanners() {
  try {
    const raw = localStorage.getItem(BANNER_KEY);
    if (!raw) return seed();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : seed();
  } catch {
    return seed();
  }
}

export function BannerProvider({ children }) {
  const [banners, setBanners] = useState(loadBanners);

  useEffect(() => {
    localStorage.setItem(BANNER_KEY, JSON.stringify(banners));
  }, [banners]);

  useEffect(() => {
    const sync = (event) => {
      if (event.key !== BANNER_KEY || !event.newValue) return;
      try {
        const parsed = JSON.parse(event.newValue);
        if (!Array.isArray(parsed)) return;
        setBanners((prev) => (JSON.stringify(prev) === event.newValue ? prev : parsed));
      } catch {
        /* ignore malformed payload from another tab */
      }
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const addBanner = useCallback((banner) => {
    setBanners((list) => [...list, banner]);
  }, []);

  const updateBanner = useCallback((id, patch) => {
    setBanners((list) => list.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  }, []);

  const deleteBanner = useCallback((id) => {
    setBanners((list) => list.filter((b) => b.id !== id));
  }, []);

  const toggleBanner = useCallback((id) => {
    setBanners((list) => list.map((b) => (b.id === id ? { ...b, active: !b.active } : b)));
  }, []);

  const moveBanner = useCallback((id, dir) => {
    setBanners((list) => {
      const from = list.findIndex((b) => b.id === id);
      const to = from + dir;
      if (from < 0 || to < 0 || to >= list.length) return list;
      const next = [...list];
      [next[from], next[to]] = [next[to], next[from]];
      return next;
    });
  }, []);

  const resetBanners = useCallback(() => setBanners(seed()), []);

  const value = useMemo(
    () => ({
      banners,
      activeBanners: banners.filter((b) => b.active),
      addBanner,
      updateBanner,
      deleteBanner,
      toggleBanner,
      moveBanner,
      resetBanners,
    }),
    [banners, addBanner, updateBanner, deleteBanner, toggleBanner, moveBanner, resetBanners],
  );

  return <BannerContext.Provider value={value}>{children}</BannerContext.Provider>;
}

export function useBanners() {
  const ctx = useContext(BannerContext);
  if (!ctx) throw new Error('useBanners must be used inside BannerProvider');
  return ctx;
}
