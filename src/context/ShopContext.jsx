import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

const ShopContext = createContext(null);

const CART_KEY = 'cakehaus_cart_v1';
const ORDER_KEY = 'cakehaus_orders_v1';

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => load(CART_KEY, []));
  const [orders, setOrders] = useState(() => load(ORDER_KEY, []));
  const [cartOpen, setCartOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(ORDER_KEY, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    const syncOrders = (event) => {
      if (event.key !== ORDER_KEY || !event.newValue) return;
      try {
        const parsed = JSON.parse(event.newValue);
        setOrders((prev) => (JSON.stringify(prev) === event.newValue ? prev : parsed));
      } catch {
        /* ignore malformed payload from another tab */
      }
    };
    window.addEventListener('storage', syncOrders);
    return () => window.removeEventListener('storage', syncOrders);
  }, []);

  const pushToast = useCallback((message, tone = 'success') => {
    const id = ++toastId.current;
    setToasts((list) => [...list.slice(-2), { id, message, tone }]);
    setTimeout(() => {
      setToasts((list) => list.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const addToCart = useCallback((product, { qty = 1, sizeIndex = 0, unitPrice, note = '' } = {}) => {
    const sizeLabel = product.sizes ? ['১ পাউন্ড', '২ পাউন্ড', '৩ পাউন্ড'][sizeIndex] : null;
    const key = `${product.id}::${sizeIndex}::${note}`;
    const price = unitPrice ?? product.price;
    setCart((list) => {
      const found = list.find((item) => item.key === key);
      if (found) {
        return list.map((item) => (item.key === key ? { ...item, qty: item.qty + qty } : item));
      }
      return [
        ...list,
        {
          key,
          id: product.id,
          slug: product.slug,
          name: product.name,
          bn: product.bn,
          image: product.image,
          sizeLabel,
          sizeIndex: product.sizes ? sizeIndex : 0,
          unitPrice: price,
          basePrice: product.price,
          note,
          qty,
        },
      ];
    });
    pushToast(`${product.name} কার্টে যোগ হয়েছে`);
  }, [pushToast]);

  const updateQty = useCallback((key, delta) => {
    setCart((list) =>
      list
        .map((item) => (item.key === key ? { ...item, qty: Math.max(0, item.qty + delta) } : item))
        .filter((item) => item.qty > 0),
    );
  }, []);

  const removeItem = useCallback((key) => {
    setCart((list) => list.filter((item) => item.key !== key));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.qty * item.unitPrice, 0), [cart]);

  const placeOrder = useCallback((order) => {
    setOrders((list) => [order, ...list]);
    setCart([]);
    return order;
  }, []);

  const updateOrderStatus = useCallback((id, status) => {
    setOrders((list) => list.map((o) => (o.id === id ? { ...o, status } : o)));
  }, []);

  const deleteOrder = useCallback((id) => {
    setOrders((list) => list.filter((o) => o.id !== id));
  }, []);

  const value = {
    cart,
    cartCount,
    cartTotal,
    cartOpen,
    setCartOpen,
    addToCart,
    updateQty,
    removeItem,
    clearCart,
    toasts,
    pushToast,
    orders,
    placeOrder,
    updateOrderStatus,
    deleteOrder,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used inside ShopProvider');
  return ctx;
}
