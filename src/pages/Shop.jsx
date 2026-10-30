import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { IconClose, IconSearch } from '../components/Icons';
import { discountPercent } from '../data/products';
import { useCatalog } from '../context/CatalogContext';

const sorts = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'discount', label: 'Biggest Discount' },
  { value: 'rating', label: 'Top Rated' },
];

export default function Shop() {
  const { products, categories } = useCatalog();
  const [params, setParams] = useSearchParams();
  const cat = params.get('cat') || '';
  const q = params.get('q') || '';
  const sort = params.get('sort') || 'featured';
  const category = categories.find((c) => c.slug === cat);

  const list = useMemo(() => {
    let out = [...products];
    if (cat) out = out.filter((p) => p.category === cat);
    if (q) {
      const needle = q.toLowerCase();
      out = out.filter((p) => {
        const c = categories.find((x) => x.slug === p.category);
        return `${p.name} ${p.bn} ${c?.name} ${c?.bn}`.toLowerCase().includes(needle);
      });
    }
    switch (sort) {
      case 'price-low':
        out.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        out.sort((a, b) => b.price - a.price);
        break;
      case 'discount':
        out.sort((a, b) => discountPercent(b) - discountPercent(a));
        break;
      case 'rating':
        out.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return out;
  }, [cat, q, sort, products, categories]);

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    if (key === 'cat') next.delete('q');
    setParams(next, { replace: true });
  };

  return (
    <main className="shop-page">
      <div className="page-head">
        <div className="container">
          <nav className="crumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>{category ? category.name : q ? `Search: ${q}` : 'All Cakes'}</span>
          </nav>
          <h1>{category ? category.name : q ? 'সার্চ রেজাল্ট' : 'All Cakes'}</h1>
          <p>
            {category
              ? category.bn + ' — হাতে বানানো, প্রতিদিন ফ্রেশ।'
              : 'জন্মদিন, বিয়ে, অফিস পার্টি কিংবা গিফট — সব উপলক্ষের কেক এক জায়গায়।'}
          </p>
        </div>
      </div>

      <div className="container shop-layout">
        <aside className="filters">
          <h3>Categories</h3>
          <div className="filter-list">
            <button type="button" className={!cat ? 'on' : ''} onClick={() => update('cat', '')}>
              All Cakes <span>{products.length}</span>
            </button>
            {categories.map((c) => {
              const count = products.filter((p) => p.category === c.slug).length;
              return (
                <button
                  key={c.slug}
                  type="button"
                  className={cat === c.slug ? 'on' : ''}
                  onClick={() => update('cat', c.slug)}
                >
                  {c.name} <span>{count}</span>
                </button>
              );
            })}
          </div>

          <div className="filter-note">
            <strong>ফ্রেশ ডেলিভারি</strong>
            <p>ঢাকার ভিতরে ২ ঘণ্টা, ঢাকার বাইরে ২৪ ঘণ্টায় কোল্ড-চেইনে পৌঁছে যাবে।</p>
          </div>
        </aside>

        <section className="shop-main">
          <div className="shop-toolbar">
            <p>
              <b>{list.length}</b> টি কেক পাওয়া গেছে
            </p>
            <div className="sort-wrap">
              <label htmlFor="sort">Sort by</label>
              <select id="sort" value={sort} onChange={(e) => update('sort', e.target.value)}>
                {sorts.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {q && (
            <div className="search-chip-row">
              <span className="search-chip">
                <IconSearch /> “{q}”
                <button type="button" onClick={() => update('q', '')} aria-label="সার্চ মুছুন">
                  <IconClose />
                </button>
              </span>
            </div>
          )}

          {list.length === 0 ? (
            <div className="empty-results">
              <span className="empty-icon">
                <IconSearch />
              </span>
              <h2>কোনো কেক পাওয়া যায়নি</h2>
              <p>অন্য নামে সার্চ করুন অথবা সব কেক দেখুন।</p>
              <button type="button" className="btn primary" onClick={() => setParams({}, { replace: true })}>
                সব কেক দেখুন
              </button>
            </div>
          ) : (
            <div className="product-grid shop-grid">
              {list.map((p, i) => (
                <ProductCard product={p} key={p.id} index={i} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
