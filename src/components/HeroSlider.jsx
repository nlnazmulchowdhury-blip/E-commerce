import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useBanners } from '../context/BannerContext';
import { DEFAULT_BANNERS } from '../data/banners';
import { IconArrow, IconChevron } from './Icons';

const STATS = [
  { value: '৫,০০০+', label: 'হ্যাপি কাস্টমার' },
  { value: '4.9 ★', label: 'কাস্টমার রেটিং' },
  { value: '২ ঘণ্টা', label: 'ঢাকায় ডেলিভারি' },
];

const AUTOPLAY_MS = 5200;

export default function HeroSlider() {
  const { activeBanners } = useBanners();
  const slides = activeBanners.length > 0 ? activeBanners : DEFAULT_BANNERS.slice(0, 1);
  const count = slides.length;

  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduced] = useState(
    () => typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const touchX = useRef(null);

  const current = count > 0 ? index % count : 0;

  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  const goTo = useCallback(
    (next) => {
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  const paused = hovered || focused || hidden || reduced;

  useEffect(() => {
    if (paused || count < 2) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, count, current]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(current + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(current - 1);
    }
  };

  const onTouchStart = (e) => {
    touchX.current = e.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchX.current;
    const delta = endX - touchX.current;
    touchX.current = null;
    if (Math.abs(delta) < 40) return;
    goTo(delta < 0 ? current + 1 : current - 1);
  };

  return (
    <div
      className="hero hero-slider"
      aria-roledescription="ক্যারোসেল"
      aria-label="হোম ব্যানার"
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={(e) => {
        if (e.target === e.currentTarget) setFocused(true);
      }}
      onBlur={(e) => {
        if (e.target === e.currentTarget) setFocused(false);
      }}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="hero-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((banner, i) => {
          const isActive = i === current;
          return (
            <div
              className={`hero-slide${isActive ? ' is-active' : ''}`}
              key={banner.id}
              aria-hidden={!isActive}
              aria-label={`${i + 1} / ${count}`}
            >
              <img
                className="hero-bg"
                src={banner.image}
                alt={`${banner.title} ${banner.highlight}`}
                loading={i === 0 ? 'eager' : 'lazy'}
                draggable="false"
              />
              <div className="hero-copy">
                <span className="eyebrow">{banner.eyebrow}</span>
                <h1>
                  {banner.title}
                  <br />
                  <em>{banner.highlight}</em>
                </h1>
                <p>{banner.desc}</p>
                <div className="hero-cta">
                  {banner.primaryLabel && (
                    <Link className="btn dark lg" to={banner.primaryTo || '/shop'} tabIndex={isActive ? 0 : -1}>
                      {banner.primaryLabel} <IconArrow />
                    </Link>
                  )}
                  {banner.secondaryLabel && (
                    <Link className="btn ghost lg" to={banner.secondaryTo || '/shop'} tabIndex={isActive ? 0 : -1}>
                      {banner.secondaryLabel}
                    </Link>
                  )}
                </div>
                {banner.showStats && (
                  <div className="hero-stats">
                    {STATS.map((s) => (
                      <div key={s.label}>
                        <b>{s.value}</b>
                        <span>{s.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="hero-chips" aria-hidden="true">
        <span>
          <b>১০০% ফ্রেশ</b>
          <small>প্রতিদিন বেকড</small>
        </span>
        <span>
          <b>ফ্রি ডেলিভারি</b>
          <small>২৫০০৳+ অর্ডারে</small>
        </span>
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            className="hero-arrow prev"
            onClick={() => goTo(current - 1)}
            aria-label="আগের ব্যানার"
          >
            <IconChevron />
          </button>
          <button
            type="button"
            className="hero-arrow next"
            onClick={() => goTo(current + 1)}
            aria-label="পরের ব্যানার"
          >
            <IconChevron />
          </button>

          <div className="hero-dots" role="tablist" aria-label="ব্যানার বেছে নিন">
            {slides.map((banner, i) => (
              <button
                key={banner.id}
                type="button"
                role="tab"
                aria-selected={i === current}
                aria-label={`ব্যানার ${i + 1}: ${banner.title} ${banner.highlight}`}
                className={i === current ? 'on' : ''}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
