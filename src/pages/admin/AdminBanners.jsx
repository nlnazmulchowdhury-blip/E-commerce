import { useEffect, useState } from 'react';
import { useBanners } from '../../context/BannerContext';
import { useShop } from '../../context/ShopContext';
import { BANNER_IMAGE_CHOICES } from '../../data/banners';
import ImageField from './ImageField';
import {
  IconCheck,
  IconClose,
  IconEdit,
  IconImage,
  IconPlus,
  IconTrash,
} from '../../components/Icons';

const EMPTY = {
  eyebrow: '',
  title: '',
  highlight: '',
  desc: '',
  image: BANNER_IMAGE_CHOICES[0],
  primaryLabel: 'কেক অর্ডার করুন',
  primaryTo: '/shop',
  secondaryLabel: '',
  secondaryTo: '',
  showStats: true,
  active: true,
};

const isLink = (value) => /^(\/|https?:\/\/)/.test(String(value || '').trim());

function BannerForm({ banner, onSave, onClose }) {
  const [form, setForm] = useState(() => ({ ...EMPTY, ...(banner || {}) }));
  const [errors, setErrors] = useState({});

  const change = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!String(form.eyebrow || '').trim()) next.eyebrow = 'ছোট লেবেল লিখুন';
    if (String(form.title || '').trim().length < 3) next.title = 'কমপক্ষে ৩ অক্ষরের শিরোনাম দিন';
    if (!String(form.highlight || '').trim()) next.highlight = 'হাইলাইট শব্দ দিন';
    if (!String(form.image || '').trim()) next.image = 'ব্যানার ছবি দিন';
    if (form.primaryLabel && !isLink(form.primaryTo)) next.primaryTo = 'লিংক /shop বা https:// দিয়ে শুরু করুন';
    if (form.secondaryLabel && !isLink(form.secondaryTo)) {
      next.secondaryTo = 'লিংক /shop বা https:// দিয়ে শুরু করুন';
    }

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    onSave({
      ...(banner || {}),
      id: banner?.id || `banner-${Date.now().toString(36)}`,
      eyebrow: String(form.eyebrow || '').trim(),
      title: String(form.title || '').trim(),
      highlight: String(form.highlight || '').trim(),
      desc: String(form.desc || '').trim(),
      image: String(form.image || '').trim(),
      primaryLabel: String(form.primaryLabel || '').trim(),
      primaryTo: String(form.primaryTo || '/shop').trim(),
      secondaryLabel: String(form.secondaryLabel || '').trim(),
      secondaryTo: String(form.secondaryTo || '').trim(),
      showStats: form.showStats,
      active: form.active,
    });
  };

  return (
    <div className="adm-modal" role="dialog" aria-modal="true" aria-label={banner ? 'ব্যানার এডিট' : 'নতুন ব্যানার'}>
      <button type="button" className="adm-modal-veil" aria-label="বন্ধ করুন" onClick={onClose} />
      <form className="adm-modal-card wide" onSubmit={submit}>
        <div className="adm-modal-head">
          <div>
            <span className="adm-chip cook">{banner ? 'এডিট' : 'নতুন'}</span>
            <h2>{banner ? 'ব্যানার এডিট করুন' : 'নতুন ব্যানার যোগ করুন'}</h2>
            <p>সেভ করলে হোমের স্লাইডারে সঙ্গে সঙ্গে যোগ হবে।</p>
          </div>
          <button type="button" className="adm-icon-btn" onClick={onClose} aria-label="বন্ধ করুন">
            <IconClose />
          </button>
        </div>

        <div className="adm-modal-body">
          <div className="adm-form-grid">
            <label className="adm-field">
              <span>ছোট লেবেল *</span>
              <input
                className={`adm-input${errors.eyebrow ? ' has-error' : ''}`}
                value={form.eyebrow}
                onChange={(e) => change('eyebrow', e.target.value)}
                placeholder="ঢাকার ফ্রেশ বেকারি · ২০১৯ থেকে"
              />
              {errors.eyebrow && <small className="adm-error-text">{errors.eyebrow}</small>}
            </label>

            <label className="adm-field">
              <span>হাইলাইট শব্দ *</span>
              <input
                className={`adm-input${errors.highlight ? ' has-error' : ''}`}
                value={form.highlight}
                onChange={(e) => change('highlight', e.target.value)}
                placeholder="তাজা কেক"
              />
              {errors.highlight ? (
                <small className="adm-error-text">{errors.highlight}</small>
              ) : (
                <small className="adm-hint">শিরোনামের নিচের কমলা লাইনে দেখাবে</small>
              )}
            </label>

            <label className="adm-field">
              <span>শিরোনাম *</span>
              <input
                className={`adm-input${errors.title ? ' has-error' : ''}`}
                value={form.title}
                onChange={(e) => change('title', e.target.value)}
                placeholder="প্রতিটি আনন্দের মুহূর্তে"
              />
              {errors.title && <small className="adm-error-text">{errors.title}</small>}
            </label>

            <label className="adm-field">
              <span>প্রাইমারি বাটন</span>
              <input
                className="adm-input"
                value={form.primaryLabel}
                onChange={(e) => change('primaryLabel', e.target.value)}
                placeholder="কেক অর্ডার করুন"
              />
            </label>

            <label className="adm-field">
              <span>প্রাইমারি লিংক</span>
              <input
                className={`adm-input${errors.primaryTo ? ' has-error' : ''}`}
                value={form.primaryTo}
                onChange={(e) => change('primaryTo', e.target.value)}
                placeholder="/shop"
              />
              {errors.primaryTo && <small className="adm-error-text">{errors.primaryTo}</small>}
            </label>

            <label className="adm-field">
              <span>সেকেন্ডারি বাটন</span>
              <input
                className="adm-input"
                value={form.secondaryLabel}
                onChange={(e) => change('secondaryLabel', e.target.value)}
                placeholder="ওয়েডিং কেক (খালি রাখলে দেখাবে না)"
              />
            </label>

            <label className="adm-field">
              <span>সেকেন্ডারি লিংক</span>
              <input
                className={`adm-input${errors.secondaryTo ? ' has-error' : ''}`}
                value={form.secondaryTo}
                onChange={(e) => change('secondaryTo', e.target.value)}
                placeholder="/shop?cat=wedding"
              />
              {errors.secondaryTo && <small className="adm-error-text">{errors.secondaryTo}</small>}
            </label>
          </div>

          <ImageField
            label="ব্যানার ছবি"
            value={form.image}
            onChange={(value) => change('image', value)}
            choices={BANNER_IMAGE_CHOICES}
            error={errors.image}
            hint="আপলোড করলে অট লিংক বসে যাবে — চাইলে নিজের লিংকও বসাতে পারেন"
            placeholder="/images/hero-cakes.webp"
          />

          {form.image && (
            <div className="adm-banner-preview">
              <img src={form.image} alt="ব্যানার প্রিভিউ" />
              <div className="adm-banner-preview-copy">
                <span className="adm-chip">{form.eyebrow || 'ছোট লেবেল'}</span>
                <strong>
                  {form.title || 'শিরোনাম'} <em>{form.highlight || 'হাইলাইট'}</em>
                </strong>
                <small>{form.primaryLabel || 'বাটন'}</small>
              </div>
            </div>
          )}

          <label className="adm-field">
            <span>বর্ণনা</span>
            <textarea
              className="adm-textarea"
              rows={3}
              value={form.desc ?? ''}
              onChange={(e) => change('desc', e.target.value)}
              placeholder="ব্যানারের এক-দুই লাইনের বর্ণনা..."
            />
          </label>

          <div className="adm-checks">
            <label className="adm-check">
              <input type="checkbox" checked={form.showStats} onChange={(e) => change('showStats', e.target.checked)} />
              <span>নিচে স্ট্যাটস (৫,০০০+ কাস্টমার ইত্যাদি) দেখান</span>
            </label>
            <label className="adm-check">
              <input type="checkbox" checked={form.active} onChange={(e) => change('active', e.target.checked)} />
              <span>স্লাইডারে চালু রাখুন</span>
            </label>
          </div>
        </div>

        <div className="adm-modal-foot">
          <button type="button" className="adm-btn ghost sm" onClick={onClose}>
            বাতিল
          </button>
          <button type="submit" className="adm-btn primary sm">
            <IconCheck /> {banner ? 'আপডেট করুন' : 'ব্যানার যোগ করুন'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function AdminBanners() {
  const { banners, addBanner, updateBanner, deleteBanner, toggleBanner, moveBanner, resetBanners } = useBanners();
  const { pushToast } = useShop();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [resetOpen, setResetOpen] = useState(false);

  useEffect(() => {
    if (!formOpen && !deleteTarget && !resetOpen) return undefined;
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (deleteTarget) setDeleteTarget(null);
      else if (resetOpen) setResetOpen(false);
      else setFormOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [formOpen, deleteTarget, resetOpen]);

  const openNew = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (banner) => {
    setEditing(banner);
    setFormOpen(true);
  };

  const save = (record) => {
    if (editing) {
      updateBanner(editing.id, record);
      pushToast('ব্যানার আপডেট হয়েছে');
    } else {
      addBanner(record);
      pushToast('নতুন ব্যানার স্লাইডারে যোগ হয়েছে');
    }
    setFormOpen(false);
    setEditing(null);
  };

  const remove = () => {
    if (!deleteTarget) return;
    deleteBanner(deleteTarget.id);
    pushToast('ব্যানার ডিলিট হয়েছে', 'error');
    setDeleteTarget(null);
  };

  const reset = () => {
    resetBanners();
    setResetOpen(false);
    pushToast('ব্যানারগুলো ডিফল্টে ফিরেছে');
  };

  const activeCount = banners.filter((b) => b.active).length;

  return (
    <div className="adm-page">
      <div className="adm-page-head">
        <div>
          <h2>
            হোম ব্যানার <span className="adm-count">{banners.length}</span>
          </h2>
          <p>
            {activeCount}টি ব্যানার স্লাইডারে চালু আছে · প্রতি ৫ সেকেন্ডে নিজে নিজে বদলায়, মাউস রাখলে থেমে
            যায়।
          </p>
        </div>
        <div className="adm-page-actions">
          <button type="button" className="adm-btn ghost sm" onClick={() => setResetOpen(true)}>
            ডিফল্টে ফিরান
          </button>
          <button type="button" className="adm-btn primary sm" onClick={openNew}>
            <IconPlus /> নতুন ব্যানার
          </button>
        </div>
      </div>

      {banners.length === 0 ? (
        <div className="adm-card">
          <div className="adm-empty">
            <IconImage />
            <h3>কোনো ব্যানার নেই</h3>
            <p>হোমের স্লাইডারে দেখাতে একটি নতুন ব্যানার যোগ করুন।</p>
            <button type="button" className="adm-btn primary sm" onClick={openNew}>
              <IconPlus /> নতুন ব্যানার
            </button>
          </div>
        </div>
      ) : (
        <div className="adm-banner-list">
          {banners.map((banner, i) => (
            <article className={`adm-banner-card${banner.active ? '' : ' off'}`} key={banner.id}>
              <div className="adm-banner-thumb">
                <img src={banner.image} alt="" />
                <span className="adm-banner-order">{i + 1}</span>
              </div>

              <div className="adm-banner-info">
                <span className="adm-chip">{banner.eyebrow}</span>
                <h3>
                  {banner.title} <em>{banner.highlight}</em>
                </h3>
                {banner.desc && <p>{banner.desc}</p>}
                <div className="adm-banner-ctas">
                  {banner.primaryLabel && (
                    <span>
                      {banner.primaryLabel} <b>{banner.primaryTo}</b>
                    </span>
                  )}
                  {banner.secondaryLabel && (
                    <span>
                      {banner.secondaryLabel} <b>{banner.secondaryTo}</b>
                    </span>
                  )}
                </div>
              </div>

              <div className="adm-banner-side">
                <div className="adm-stock-cell">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={banner.active}
                    aria-label={`${banner.title} স্লাইডারে চালু`}
                    className={`adm-switch${banner.active ? ' on' : ''}`}
                    onClick={() => {
                      toggleBanner(banner.id);
                      pushToast(banner.active ? 'ব্যানার স্লাইডার থেকে বন্ধ' : 'ব্যানার স্লাইডারে চালু');
                    }}
                  >
                    <span />
                  </button>
                  <small>{banner.active ? 'চালু' : 'বন্ধ'}</small>
                </div>

                <div className="adm-row-actions">
                  <button
                    type="button"
                    className="adm-icon-btn"
                    onClick={() => moveBanner(banner.id, -1)}
                    disabled={i === 0}
                    aria-label="উপরে সরান"
                    title="উপরে"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="adm-icon-btn"
                    onClick={() => moveBanner(banner.id, 1)}
                    disabled={i === banners.length - 1}
                    aria-label="নিচে সরান"
                    title="নিচে"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    className="adm-icon-btn"
                    onClick={() => openEdit(banner)}
                    aria-label={`${banner.title} এডিট`}
                    title="এডিট"
                  >
                    <IconEdit />
                  </button>
                  <button
                    type="button"
                    className="adm-icon-btn danger"
                    onClick={() => setDeleteTarget(banner)}
                    aria-label={`${banner.title} ডিলিট`}
                    title="ডিলিট"
                  >
                    <IconTrash />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {formOpen && (
        <BannerForm
          key={editing?.id || 'new'}
          banner={editing}
          onSave={save}
          onClose={() => {
            setFormOpen(false);
            setEditing(null);
          }}
        />
      )}

      {deleteTarget && (
        <div className="adm-modal" role="dialog" aria-modal="true" aria-label="ব্যানার ডিলিট">
          <button type="button" className="adm-modal-veil" aria-label="বন্ধ করুন" onClick={() => setDeleteTarget(null)} />
          <div className="adm-modal-card narrow">
            <div className="adm-modal-head">
              <div>
                <span className="adm-chip danger">ডিলিট</span>
                <h2>ব্যানার মুছবেন?</h2>
                <p>“{deleteTarget.title} {deleteTarget.highlight}” স্লাইডার থেকে স্থায়ীভাবে মুছে যাবে।</p>
              </div>
              <button type="button" className="adm-icon-btn" onClick={() => setDeleteTarget(null)} aria-label="বন্ধ">
                <IconClose />
              </button>
            </div>
            <div className="adm-modal-foot">
              <button type="button" className="adm-btn ghost sm" onClick={() => setDeleteTarget(null)}>
                বাতিল
              </button>
              <button type="button" className="adm-btn danger sm" onClick={remove}>
                <IconTrash /> হ্যাঁ, মুছুন
              </button>
            </div>
          </div>
        </div>
      )}

      {resetOpen && (
        <div className="adm-modal" role="dialog" aria-modal="true" aria-label="ডিফল্টে ফিরান">
          <button type="button" className="adm-modal-veil" aria-label="বন্ধ করুন" onClick={() => setResetOpen(false)} />
          <div className="adm-modal-card narrow">
            <div className="adm-modal-head">
              <div>
                <span className="adm-chip warn">রিসেট</span>
                <h2>ডিফল্ট ব্যানারে ফিরবেন?</h2>
                <p>আপনার যোগ করা বা এডিট করা সব ব্যানার মুছে ৩টি ডিফল্ট ব্যানার ফিরে আসবে।</p>
              </div>
              <button type="button" className="adm-icon-btn" onClick={() => setResetOpen(false)} aria-label="বন্ধ">
                <IconClose />
              </button>
            </div>
            <div className="adm-modal-foot">
              <button type="button" className="adm-btn ghost sm" onClick={() => setResetOpen(false)}>
                বাতিল
              </button>
              <button type="button" className="adm-btn danger sm" onClick={reset}>
                রিসেট করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
