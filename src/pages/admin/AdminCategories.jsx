import { useEffect, useMemo, useState } from 'react';
import { useCatalog } from '../../context/CatalogContext';
import { useShop } from '../../context/ShopContext';
import { slugify } from '../../data/products';
import {
  IconCheck,
  IconClose,
  IconEdit,
  IconPlus,
  IconTag,
  IconTrash,
} from '../../components/Icons';
import ImageField from './ImageField';

const EMPTY = {
  name: '',
  bn: '',
  slug: '',
  image: '',
};

function CategoryForm({ category, categories, products, onSave, onClose }) {
  const [form, setForm] = useState(() => ({ ...EMPTY, ...(category || {}) }));
  const [slugTouched, setSlugTouched] = useState(Boolean(category));
  const [errors, setErrors] = useState({});

  const imageChoices = useMemo(
    () =>
      Array.from(new Set([...categories.map((c) => c.image), ...products.map((p) => p.image)]))
        .filter(Boolean)
        .slice(0, 16),
    [categories, products],
  );

  const change = (key, value) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (!category && key === 'name' && !slugTouched) next.slug = slugify(value);
      return next;
    });
  };

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (form.name.trim().length < 2) next.name = 'কমপক্ষে ২ অক্ষরের ইংরেজি নাম দিন';
    if (!form.bn.trim()) next.bn = 'বাংলা নাম দিন';
    if (!/^[a-z0-9-]+$/.test(form.slug)) {
      next.slug = 'slug-এ শুধু ছোট হাতের ইংরেজি অক্ষর, সংখ্যা ও হাইফেন';
    } else if (categories.some((c) => c.slug === form.slug && c.slug !== category?.slug)) {
      next.slug = 'এই slug আগেই ব্যবহার হয়েছে';
    }
    if (!form.image.trim()) next.image = 'ক্যাটাগরির ছবি দিন';

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    onSave({
      slug: form.slug,
      name: String(form.name || '').trim(),
      bn: String(form.bn || '').trim(),
      image: String(form.image || '').trim(),
    });
  };

  return (
    <div className="adm-modal" role="dialog" aria-modal="true" aria-label={category ? 'ক্যাটাগরি এডিট' : 'নতুন ক্যাটাগরি'}>
      <button type="button" className="adm-modal-veil" aria-label="বন্ধ করুন" onClick={onClose} />
      <form className="adm-modal-card wide" onSubmit={submit}>
        <div className="adm-modal-head">
          <div>
            <span className="adm-chip cook">{category ? 'এডিট' : 'নতুন'}</span>
            <h2>{category ? 'ক্যাটাগরি এডিট করুন' : 'নতুন ক্যাটাগরি যোগ করুন'}</h2>
            <p>সেভ করলে হোম, নেভিগেশন, শপ ফিল্টার আর প্রোডাক্ট ফর্মে সঙ্গে সঙ্গে দেখা যাবে।</p>
          </div>
          <button type="button" className="adm-icon-btn" onClick={onClose} aria-label="বন্ধ করুন">
            <IconClose />
          </button>
        </div>

        <div className="adm-modal-body">
          <div className="adm-form-grid">
            <label className="adm-field">
              <span>ক্যাটাগরি নাম (English) *</span>
              <input
                className={`adm-input${errors.name ? ' has-error' : ''}`}
                value={form.name}
                onChange={(e) => change('name', e.target.value)}
                placeholder="Ice Cream Cakes"
              />
              {errors.name && <small className="adm-error-text">{errors.name}</small>}
            </label>

            <label className="adm-field">
              <span>বাংলা নাম *</span>
              <input
                className={`adm-input${errors.bn ? ' has-error' : ''}`}
                value={form.bn}
                onChange={(e) => change('bn', e.target.value)}
                placeholder="আইসক্রিম কেক"
              />
              {errors.bn && <small className="adm-error-text">{errors.bn}</small>}
            </label>

            <label className="adm-field">
              <span>Slug (URL) *</span>
              <input
                className={`adm-input${errors.slug ? ' has-error' : ''}`}
                value={form.slug}
                disabled={Boolean(category)}
                onChange={(e) => {
                  setSlugTouched(true);
                  change('slug', e.target.value);
                }}
                placeholder="ice-cream-cakes"
              />
              <small className={errors.slug ? 'adm-error-text' : 'adm-hint'}>
                {errors.slug ||
                  (category
                    ? 'slug পরে বদলানো যায় না — প্রোডাক্ট লিংক অটুট থাকে'
                    : form.slug
                      ? `/shop?cat=${form.slug}`
                      : 'ইংরেজি নাম লিখলে অটো তৈরি হবে')}
              </small>
            </label>
          </div>

          <ImageField
            label="ক্যাটাগরি ছবি"
            value={form.image}
            onChange={(value) => change('image', value)}
            choices={imageChoices}
            error={errors.image}
            hint="আপলোড করলে অট লিংক বসে যাবে — আগের ছবি বেছে নিতে থাম্বনেইলে ক্লিক করুন"
            placeholder="/images/cake-custom-theme.webp"
          />

          {form.image && (
            <div className="adm-cat-preview">
              <img src={form.image} alt="ক্যাটাগরি প্রিভিউ" />
              <div>
                <strong>{form.name || 'Category Name'}</strong>
                <small>{form.bn || 'বাংলা নাম'}</small>
              </div>
            </div>
          )}
        </div>

        <div className="adm-modal-foot">
          <button type="button" className="adm-btn ghost sm" onClick={onClose}>
            বাতিল
          </button>
          <button type="submit" className="adm-btn primary sm">
            <IconCheck /> {category ? 'আপডেট করুন' : 'ক্যাটাগরি যোগ করুন'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function AdminCategories() {
  const { products, categories, addCategory, updateCategory, deleteCategory, moveCategory, resetCategories } =
    useCatalog();
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

  const countOf = (slug) => products.filter((p) => p.category === slug).length;

  const openNew = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (category) => {
    setEditing(category);
    setFormOpen(true);
  };

  const save = (record) => {
    if (editing) {
      updateCategory(editing.slug, record);
      pushToast(`${record.name} ক্যাটাগরি আপডেট হয়েছে`);
    } else {
      addCategory(record);
      pushToast(`${record.name} ক্যাটাগরি যোগ হয়েছে`);
    }
    setFormOpen(false);
    setEditing(null);
  };

  const askDelete = (category) => {
    const count = countOf(category.slug);
    if (count > 0) {
      pushToast(`${category.name}-এ ${count}টি প্রোডাক্ট আছে — আগে সেগুলোর ক্যাটাগরি বদলান`, 'error');
      return;
    }
    setDeleteTarget(category);
  };

  const remove = () => {
    if (!deleteTarget) return;
    deleteCategory(deleteTarget.slug);
    pushToast(`${deleteTarget.name} ক্যাটাগরি ডিলিট হয়েছে`, 'error');
    setDeleteTarget(null);
  };

  const reset = () => {
    resetCategories();
    setResetOpen(false);
    pushToast('ক্যাটাগরিগুলো ডিফল্টে ফিরেছে');
  };

  return (
    <div className="adm-page">
      <div className="adm-page-head">
        <div>
          <h2>
            সব ক্যাটাগরি <span className="adm-count">{categories.length}</span>
          </h2>
          <p>
            নতুন ক্যাটাগরি যোগ করুন, নাম-ছবি বদলান বা সাজান — সাইটের হোম, নেভিগেশন ও শপ ফিল্টারে সঙ্গে সঙ্গে
            বদলে যাবে।
          </p>
        </div>
        <div className="adm-page-actions">
          <button type="button" className="adm-btn ghost sm" onClick={() => setResetOpen(true)}>
            ডিফল্টে ফিরান
          </button>
          <button type="button" className="adm-btn primary sm" onClick={openNew}>
            <IconPlus /> নতুন ক্যাটাগরি
          </button>
        </div>
      </div>

      {categories.length === 0 ? (
        <div className="adm-card">
          <div className="adm-empty">
            <IconTag />
            <h3>কোনো ক্যাটাগরি নেই</h3>
            <p>হোম ও শপে দেখাতে একটি নতুন ক্যাটাগরি যোগ করুন।</p>
            <button type="button" className="adm-btn primary sm" onClick={openNew}>
              <IconPlus /> নতুন ক্যাটাগরি
            </button>
          </div>
        </div>
      ) : (
        <div className="adm-cat-grid">
          {categories.map((category, i) => {
            const count = countOf(category.slug);
            return (
              <article className="adm-cat-card" key={category.slug}>
                <div className="adm-cat-thumb">
                  <img src={category.image} alt="" />
                  <span className="adm-cat-order">{i + 1}</span>
                </div>
                <div className="adm-cat-body">
                  <strong>{category.name}</strong>
                  <small>{category.bn}</small>
                  <span className="adm-cat-slug">/shop?cat={category.slug}</span>
                  <span className={`adm-chip ${count ? 'info' : 'neutral'}`}>
                    {count ? `${count} প্রোডাক্ট` : 'খালি'}
                  </span>
                </div>
                <div className="adm-cat-actions">
                  <button
                    type="button"
                    className="adm-icon-btn"
                    onClick={() => moveCategory(category.slug, -1)}
                    disabled={i === 0}
                    aria-label="উপরে সরান"
                    title="উপরে"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="adm-icon-btn"
                    onClick={() => moveCategory(category.slug, 1)}
                    disabled={i === categories.length - 1}
                    aria-label="নিচে সরান"
                    title="নিচে"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    className="adm-icon-btn"
                    onClick={() => openEdit(category)}
                    aria-label={`${category.name} এডিট`}
                    title="এডিট"
                  >
                    <IconEdit />
                  </button>
                  <button
                    type="button"
                    className="adm-icon-btn danger"
                    onClick={() => askDelete(category)}
                    aria-label={`${category.name} ডিলিট`}
                    title={count ? 'প্রোডাক্ট থাকলে ডিলিট করা যাবে না' : 'ডিলিট'}
                  >
                    <IconTrash />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {formOpen && (
        <CategoryForm
          key={editing?.slug || 'new'}
          category={editing}
          categories={categories}
          products={products}
          onSave={save}
          onClose={() => {
            setFormOpen(false);
            setEditing(null);
          }}
        />
      )}

      {deleteTarget && (
        <div className="adm-modal" role="dialog" aria-modal="true" aria-label="ক্যাটাগরি ডিলিট">
          <button type="button" className="adm-modal-veil" aria-label="বন্ধ করুন" onClick={() => setDeleteTarget(null)} />
          <div className="adm-modal-card narrow">
            <div className="adm-modal-head">
              <div>
                <span className="adm-chip danger">ডিলিট</span>
                <h2>ক্যাটাগরি মুছবেন?</h2>
                <p>“{deleteTarget.name}” হোম, নেভিগেশন ও শপ ফিল্টার থেকে মুছে যাবে।</p>
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
                <h2>ডিফল্ট ক্যাটাগরিতে ফিরবেন?</h2>
                <p>
                  আপনার যোগ করা বা এডিট করা সব ক্যাটাগরি মুছে ৮টি ডিফল্ট ক্যাটাগরি ফিরে আসবে। কাস্টম
                  ক্যাটাগরির প্রোডাক্টগুলো “All Cakes”-এ থেকে যাবে।
                </p>
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
