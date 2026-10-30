import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { products as seedProducts } from '../data/products';

const CatalogContext = createContext(null);

const PRODUCT_KEY = 'cakehaus_products_v1';

function loadProducts() {
  try {
    const raw = localStorage.getItem(PRODUCT_KEY);
    if (!raw) return [...seedProducts];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [...seedProducts];
  } catch {
    return [...seedProducts];
  }
}

export function CatalogProvider({ children }) {
  const [products, setProducts] = useState(loadProducts);

  useEffect(() => {
    localStorage.setItem(PRODUCT_KEY, JSON.stringify(products));
  }, [products]);

  const addProduct = useCallback((product) => {
    setProducts((list) => [product, ...list]);
  }, []);

  const updateProduct = useCallback((id, patch) => {
    setProducts((list) => list.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }, []);

  const deleteProduct = useCallback((id) => {
    setProducts((list) => list.filter((p) => p.id !== id));
  }, []);

  const toggleStock = useCallback((id) => {
    setProducts((list) => list.map((p) => (p.id === id ? { ...p, outOfStock: !p.outOfStock } : p)));
  }, []);

  const resetProducts = useCallback(() => setProducts([...seedProducts]), []);

  const value = useMemo(
    () => ({ products, addProduct, updateProduct, deleteProduct, toggleStock, resetProducts }),
    [products, addProduct, updateProduct, deleteProduct, toggleStock, resetProducts],
  );

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error('useCatalog must be used inside CatalogProvider');
  return ctx;
}
