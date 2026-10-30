import { useEffect, useMemo, useState } from 'react';
import { useCatalog } from '../../context/CatalogContext';
import { useShop } from '../../context/ShopContext';
import { formatTaka, slugify } from '../../data/products';
import {
  IconBox,
  IconCheck,
  IconClose,
  IconEdit,
  IconPlus,
  IconSearch,
  IconTrash,
} from '../../components/Icons';
import ImageField from './ImageField';

const EMPTY = {
  name: '',
  bn: '',
  slug: '',
  category: '',
  image: '',
  price: '',
  oldPrice: '',
  badge: '',
  tag: '',
  desc: '',
  rating: 4.8,
  reviews: 0,
  sizes: true,
  outOfStock: false,
};

function ProductForm({ product, products, categories, onSave, onClose }) {
  const [form, setForm] = useState(() => ({
    ...EMPTY,
    category: categories[0]?.slug || '',
    ...(product || {}),
  }));
  const [slugTouched, setSlugTouched] = useState(Boolean(product));
  const [errors, setErrors] = useState({});

  const imageChoices = useMemo(
    () => Array.from(new Set(products.map((p) => p.image))).filter(Boolean).slice(0, 14),
    [products],
  );

  const change = (key, value) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (!product && key === 'name' && !slugTouched) next.slug = slugify(value);
      return next;
    });
  };

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (form.name.trim().length < 3) next.name = 'কমপক্ষে ৩ অক্ষরের প্রোডাক্ট নাম দিন';
    if (!form.bn.trim()) next.bn = 'বাংলা নাম দিন';
    if (!/^[a-z0-9-]+$/.test(form.slug)) {
      next.slug = 'slug-এ শুধু ছোট হাতের ইংরেজি অক্ষর, সংখ্যা ও হাইফেন';
    } else if (products.some((p) => (p.slug === form.slug || p.id === form.slug) && p.id !== product?.id)) {
      next.slug = 'এই slug আগেই ব্যবহার হয়েছে';
    }
    if (!Number(form.price) || Number(form.price) < 1) next.price = 'সঠিক দাম দিন';
    if (!form.category) next.category = 'ক্যাটাগরি বেছে নিন';
    if (form.oldPrice && Number(form.oldPrice) <= Number(form.price)) {
      next.oldPrice = 'আগের দাম বর্তমান দামের চেয়ে বেশি হতে হবে';
    }
    if (!form.image.trim()) next.image = 'ছবির পাথ বা URL দিন';
    if (!Number(form.rating) || Number(form.rating) < 1 || Number(form.rating) > 5) {
      next.rating = 'রেটিং ১–৫ এর মধ্যে দিন';
    }

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    onSave({
      ...(product || {}),
      id: product?.id || form.slug,
      slug: form.slug,
      name: String(form.name || '').trim(),
      bn: String(form.bn || '').trim(),
      category: form.category,
      image: String(form.image || '').trim(),
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
      badge: String(form.badge || '').trim() || null,
      tag: String(form.tag || '').trim(),
      desc: String(form.desc || '').trim(),
      rating: Number(form.rating),
      reviews: Number(form.reviews) || 0,
      sizes: form.sizes,
      outOfStock: form.outOfStock,
    });
  };

  return (
    <div className="adm-modal" role="dialog" aria-modal="true" aria-label={product ? 'প্রোডাক্ট এডিট' : 'নতুন প্রোডাক্ট'}>
      <button type="button" className="adm-modal-veil" aria-label="বন্ধ করুন" onClick={onClose} />
      <form className="adm-modal-card wide" onSubmit={submit}>
        <div className="adm-modal-head">
          <div>
            <span className="adm-chip cook">{product ? 'এডিট' : 'নতুন'}</span>
            <h2>{product ? 'প্রোডাক্ট এডিট করুন' : 'নতুন প্রোডাক্ট যোগ করুন'}</h2>
            <p>তথ্য সেভ করলে সঙ্গে সঙ্গে স্টোরে দেখা যাবে।</p>
          </div>
          <button type="button" className="adm-icon-btn" onClick={onClose} aria-label="বন্ধ করুন">
            <IconClose />
          </button>
        </div>

        <div className="adm-modal-body">
          <div className="adm-form-grid">
            <label className="adm-field">
              <span>প্রোডাক্ট নাম (English) *</span>
              <input
                className={`adm-input${errors.name ? ' has-error' : ''}`}
                value={form.name}
                onChange={(e) => change('name', e.target.value)}
                placeholder="Chocolate Truffle Cake"
              />
              {errors.name && <small className="adm-error-text">{errors.name}</small>}
            </label>

            <label className="adm-field">
              <span>বাংলা নাম *</span>
              <input
                className={`adm-input${errors.bn ? ' has-error' : ''}`}
                value={form.bn}
                onChange={(e) => change('bn', e.target.value)}
                placeholder="চকলেট ট্রাফল কেক"
              />
              {errors.bn && <small className="adm-error-text">{errors.bn}</small>}
            </label>

            <label className="adm-field">
              <span>Slug (URL) *</span>
              <input
                className={`adm-input${errors.slug ? ' has-error' : ''}`}
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  change('slug', e.target.value);
                }}
                placeholder="chocolate-truffle-cake"
              />
              <small className={errors.slug ? 'adm-error-text' : 'adm-hint'}>
                {errors.slug ||
                  (form.slug ? `/product/${form.slug}` : 'ইংরেজি নাম লিখলে অটো তৈরি হবে, না হলে নিজে লিখুন')}
              </small>
            </label>

            <label className="adm-field">
              <span>ক্যাটাগরি *</span>
              <select className="adm-select block" value={form.category} onChange={(e) => change('category', e.target.value)}>
                {product && form.category && !categories.some((c) => c.slug === form.category) && (
                  <option value={form.category}>{form.category} — মুছে ফেলা ক্যাটাগরি</option>
                )}
                {categories.length === 0 && <option value="">কোনো ক্যাটাগরি নেই</option>}
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name} — {c.bn}
                  </option>
                ))}
              </select>
              {errors.category ? (
                <small className="adm-error-text">{errors.category}</small>
              ) : (
                <small className="adm-hint">নতুন ক্যাটাগরি দরকার? সাইডবারের “ক্যাটাগরি” পেজ থেকে যোগ করুন</small>
              )}
            </label>

            <label className="adm-field">
              <span>দাম (৳) *</span>
              <input
                className={`adm-input${errors.price ? ' has-error' : ''}`}
                type="number"
                min="1"
                value={form.price}
                onChange={(e) => change('price', e.target.value)}
                placeholder="850"
              />
              {errors.price && <small className="adm-error-text">{errors.price}</small>}
            </label>

            <label className="adm-field">
              <span>আগের দাম (৳)</span>
              <input
                className={`adm-input${errors.oldPrice ? ' has-error' : ''}`}
                type="number"
                min="0"
                value={form.oldPrice ?? ''}
                onChange={(e) => change('oldPrice', e.target.value)}
                placeholder="950"
              />
              {errors.oldPrice ? (
                <small className="adm-error-text">{errors.oldPrice}</small>
              ) : (
                <small className="adm-hint">দিলে ডিসকাউন্ট ব্যাজ দেখাবে</small>
              )}
            </label>

            <label className="adm-field">
              <span>রেটিং (১–৫)</span>
              <input
                className={`adm-input${errors.rating ? ' has-error' : ''}`}
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={form.rating}
                onChange={(e) => change('rating', e.target.value)}
              />
              {errors.rating && <small className="adm-error-text">{errors.rating}</small>}
            </label>

            <label className="adm-field">
              <span>রিভিউ সংখ্যা</span>
              <input
                className="adm-input"
                type="number"
                min="0"
                value={form.reviews}
                onChange={(e) => change('reviews', e.target.value)}
              />
            </label>

            <label className="adm-field">
              <span>ব্যাজ</span>
              <input
                className="adm-input"
                value={form.badge ?? ''}
                onChange={(e) => change('badge', e.target.value)}
                placeholder="Best Seller, Premium..."
              />
            </label>

            <label className="adm-field">
              <span>ট্যাগলাইন</span>
              <input
                className="adm-input"
                value={form.tag ?? ''}
                onChange={(e) => change('tag', e.target.value)}
                placeholder="চকলেট প্রেমীদের প্রথম পছন্দ"
              />
            </label>
          </div>

          <ImageField
            label="ছবি"
            value={form.image}
            onChange={(value) => change('image', value)}
            choices={imageChoices}
            error={errors.image}
            hint="আপলোড করলে অট লিংক বসে যাবে — আগের ছবি বেছে নিতে থাম্বনেইলে ক্লিক করুন"
            placeholder="/images/cake-chocolate-truffle.webp"
          />

          {form.image && (
            <div className="adm-image-preview">
              <img src={form.image} alt="প্রিভিউ" />
              <span>প্রিভিউ</span>
            </div>
          )}

          <label className="adm-field">
            <span>বর্ণনা</span>
            <textarea
              className="adm-textarea"
              rows={4}
              value={form.desc ?? ''}
              onChange={(e) => change('desc', e.target.value)}
              placeholder="কেকের স্বাদ, উপকরণ ও বিশেষত্ব লিখুন..."
            />
          </label>

          <div className="adm-checks">
            <label className="adm-check">
              <input type="checkbox" checked={form.sizes} onChange={(e) => change('sizes', e.target.checked)} />
              <span>সাইজ অপশন (১ / ২ / ৩ পাউন্ড)</span>
            </label>
            <label className="adm-check">
              <input
                type="checkbox"
                checked={form.outOfStock}
                onChange={(e) => change('outOfStock', e.target.checked)}
              />
              <span>স্টকে নেই (অর্ডার বন্ধ)</span>
            </label>
          </div>
        </div>

        <div className="adm-modal-foot">
          <button type="button" className="adm-btn ghost sm" onClick={onClose}>
            বাতিল
          </button>
          <button type="submit" className="adm-btn primary sm">
            <IconCheck /> {product ? 'আপডেট করুন' : 'প্রোডাক্ট যোগ করুন'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function AdminProducts() {
  const { products, categories, addProduct, updateProduct, deleteProduct, toggleStock, resetProducts } = useCatalog();
  const { pushToast } = useShop();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('all');
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

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return products.filter((p) => {
      if (cat !== 'all' && p.category !== cat) return false;
      if (!needle) return true;
      return `${p.name} ${p.bn} ${p.slug}`.toLowerCase().includes(needle);
    });
  }, [products, cat, q]);

  const openNew = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (product) => {
    setEditing(product);
    setFormOpen(true);
  };

  const save = (record) => {
    if (editing) {
      updateProduct(editing.id, record);
      pushToast(`${record.name} আপডেট হয়েছে`);
    } else {
      addProduct(record);
      pushToast(`${record.name} যোগ হয়েছে`);
    }
    setFormOpen(false);
    setEditing(null);
  };

  const remove = () => {
    if (!deleteTarget) return;
    deleteProduct(deleteTarget.id);
    pushToast(`${deleteTarget.name} ডিলিট হয়েছে`, 'error');
    setDeleteTarget(null);
  };

  const reset = () => {
    resetProducts();
    setResetOpen(false);
    pushToast('সব প্রোডাক্ট ডিফল্ট তালিকায় ফিরেছে');
  };

  const categoryName = (slug) => categories.find((c) => c.slug === slug)?.name || slug;

  return (
    <div className="adm-page">
      <div className="adm-page-head">
        <div>
          <h2>
            সব প্রোডাক্ট <span className="adm-count">{products.length}</span>
          </h2>
          <p>নতুন কেক যোগ করুন, দাম বদলান, স্টক বন্ধ-চালু করুন।</p>
        </div>
        <div className="adm-page-actions">
          <button type="button" className="adm-btn ghost sm" onClick={() => setResetOpen(true)}>
            ডিফল্টে ফিরান
          </button>
          <button type="button" className="adm-btn primary sm" onClick={openNew}>
            <IconPlus /> নতুন প্রোডাক্ট
          </button>
        </div>
      </div>

      <div className="adm-toolbar">
        <label className="adm-search">
          <IconSearch />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="প্রোডাক্ট নাম বা slug..."
            aria-label="প্রোডাক্ট সার্চ"
          />
        </label>
        <select className="adm-select" value={cat} onChange={(e) => setCat(e.target.value)} aria-label="ক্যাটাগরি ফিল্টার">
          <option value="all">সব ক্যাটাগরি</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="adm-card">
          <div className="adm-empty">
            <IconBox />
            <h3>কোনো প্রোডাক্ট পাওয়া যায়নি</h3>
            <p>{products.length === 0 ? 'সব প্রোডাক্ট মুছে ফেলা হয়েছে।' : 'সার্চ বা ক্যাটাগরি বদলে দেখুন।'}</p>
            {products.length === 0 ? (
              <button type="button" className="adm-btn primary sm" onClick={() => setResetOpen(true)}>
                ডিফল্ট প্রোডাক্ট ফিরিয়ে আনুন
              </button>
            ) : (
              <button type="button" className="adm-btn primary sm" onClick={openNew}>
                <IconPlus /> নতুন প্রোডাক্ট
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="adm-card flush">
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>প্রোডাক্ট</th>
                  <th>ক্যাটাগরি</th>
                  <th>দাম</th>
                  <th>রেটিং</th>
                  <th>স্টক</th>
                  <th aria-label="অ্যাকশন" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="adm-product-cell">
                        <img src={product.image} alt="" />
                        <div>
                          <b>{product.name}</b>
                          <small>{product.bn}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="adm-cat-pill">{categoryName(product.category)}</span>
                    </td>
                    <td>
                      <b>{formatTaka(product.price)}</b>
                      {product.oldPrice && <small className="adm-cell-sub del">{formatTaka(product.oldPrice)}</small>}
                    </td>
                    <td>
                      <span className="adm-rating">
                        ★ {product.rating}
                        <small>({product.reviews})</small>
                      </span>
                    </td>
                    <td>
                      <div className="adm-stock-cell">
                        <button
                          type="button"
                          role="switch"
                          aria-checked={!product.outOfStock}
                          aria-label={`${product.name} স্টক`}
                          className={`adm-switch${product.outOfStock ? '' : ' on'}`}
                          onClick={() => {
                            toggleStock(product.id);
                            pushToast(
                              product.outOfStock ? `${product.name} স্টকে যোগ হয়েছে` : `${product.name} স্টক বন্ধ`,
                            );
                          }}
                        >
                          <span />
                        </button>
                        <small>{product.outOfStock ? 'স্টকে নেই' : 'স্টকে আছে'}</small>
                      </div>
                    </td>
                    <td>
                      <div className="adm-row-actions">
                        <button
                          type="button"
                          className="adm-icon-btn"
                          onClick={() => openEdit(product)}
                          aria-label={`${product.name} এডিট`}
                          title="এডিট"
                        >
                          <IconEdit />
                        </button>
                        <button
                          type="button"
                          className="adm-icon-btn danger"
                          onClick={() => setDeleteTarget(product)}
                          aria-label={`${product.name} ডিলিট`}
                          title="ডিলিট"
                        >
                          <IconTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {formOpen && (
        <ProductForm
          key={editing?.id || 'new'}
          product={editing}
          products={products}
          categories={categories}
          onSave={save}
          onClose={() => {
            setFormOpen(false);
            setEditing(null);
          }}
        />
      )}

      {deleteTarget && (
        <div className="adm-modal" role="dialog" aria-modal="true" aria-label="প্রোডাক্ট ডিলিট">
          <button type="button" className="adm-modal-veil" aria-label="বন্ধ করুন" onClick={() => setDeleteTarget(null)} />
          <div className="adm-modal-card narrow">
            <div className="adm-modal-head">
              <div>
                <span className="adm-chip danger">ডিলিট</span>
                <h2>প্রোডাক্ট মুছবেন?</h2>
                <p>{deleteTarget.name} স্থায়ীভাবে স্টোর থেকে মুছে যাবে।</p>
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
                <h2>ডিফল্ট তালিকায় ফিরবেন?</h2>
                <p>আপনার যোগ করা বা এডিট করা সব পরিবর্তন মুছে ১৬টি ডিফল্ট কেক ফিরে আসবে।</p>
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
