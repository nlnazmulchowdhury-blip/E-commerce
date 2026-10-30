import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { categories as seedCategories, products as seedProducts } from '../data/products';

const CatalogContext = createContext(null);

const PRODUCT_KEY = 'cakehaus_products_v1';
const CATEGORY_KEY = 'cakehaus_categories_v1';

const seedCats = () => seedCategories.map((c) => ({ ...c }));

function loadList(key, seed, valid) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return seed();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.every(valid) ? parsed : seed();
  } catch {
    return seed();
  }
}

const isProduct = (p) => p && typeof p === 'object' && Boolean(p.id);
const isCategory = (c) => c && typeof c === 'object' && Boolean(c.slug && c.name);

function useSyncedList(key, seed, valid) {
  const [list, setList] = useState(() => loadList(key, seed, valid));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(list));
  }, [key, list]);

  useEffect(() => {
    const sync = (event) => {
      if (event.key !== key || !event.newValue) return;
      try {
        const parsed = JSON.parse(event.newValue);
        if (!Array.isArray(parsed)) return;
        setList((prev) => (JSON.stringify(prev) === event.newValue ? prev : parsed));
      } catch {
        /* ignore malformed payload from another tab */
      }
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, [key]);

  return [list, setList];
}

export function CatalogProvider({ children }) {
  const [products, setProducts] = useSyncedList(PRODUCT_KEY, () => [...seedProducts], isProduct);
  const [categories, setCategories] = useSyncedList(CATEGORY_KEY, seedCats, isCategory);

  const addProduct = useCallback(
    (product) => {
      setProducts((list) => [product, ...list]);
    },
    [setProducts],
  );

  const updateProduct = useCallback(
    (id, patch) => {
      setProducts((list) => list.map((p) => (p.id === id ? { ...p, ...patch } : p)));
    },
    [setProducts],
  );

  const deleteProduct = useCallback(
    (id) => {
      setProducts((list) => list.filter((p) => p.id !== id));
    },
    [setProducts],
  );

  const toggleStock = useCallback(
    (id) => {
      setProducts((list) => list.map((p) => (p.id === id ? { ...p, outOfStock: !p.outOfStock } : p)));
    },
    [setProducts],
  );

  const resetProducts = useCallback(() => setProducts([...seedProducts]), [setProducts]);

  const addCategory = useCallback(
    (category) => {
      setCategories((list) => [...list, category]);
    },
    [setCategories],
  );

  const updateCategory = useCallback(
    (slug, patch) => {
      setCategories((list) => list.map((c) => (c.slug === slug ? { ...c, ...patch, slug: c.slug } : c)));
    },
    [setCategories],
  );

  const deleteCategory = useCallback(
    (slug) => {
      setCategories((list) => list.filter((c) => c.slug !== slug));
    },
    [setCategories],
  );

  const moveCategory = useCallback(
    (slug, dir) => {
      setCategories((list) => {
        const from = list.findIndex((c) => c.slug === slug);
        const to = from + dir;
        if (from < 0 || to < 0 || to >= list.length) return list;
        const next = [...list];
        [next[from], next[to]] = [next[to], next[from]];
        return next;
      });
    },
    [setCategories],
  );

  const resetCategories = useCallback(() => setCategories(seedCats()), [setCategories]);

  const value = useMemo(
    () => ({
      products,
      categories,
      addProduct,
      updateProduct,
      deleteProduct,
      toggleStock,
      resetProducts,
      addCategory,
      updateCategory,
      deleteCategory,
      moveCategory,
      resetCategories,
    }),
    [
      products,
      categories,
      addProduct,
      updateProduct,
      deleteProduct,
      toggleStock,
      resetProducts,
      addCategory,
      updateCategory,
      deleteCategory,
      moveCategory,
      resetCategories,
    ],
  );

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error('useCatalog must be used inside CatalogProvider');
  return ctx;
}
