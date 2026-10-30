import { useEffect } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Header, { MobileTabBar } from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SocialDock from './components/SocialDock';
import { useShop } from './context/ShopContext';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductPage from './pages/ProductPage';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Orders from './pages/Orders';
import AdminApp from './pages/admin/AdminApp';

function ScrollToTop() {
  const { pathname, search, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'instant', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, search, hash]);
  return null;
}

function Toasts() {
  const { toasts } = useShop();
  return (
    <div className="toasts" aria-live="polite">
      {toasts.map((t) => (
        <div className={`toast ${t.tone}`} key={t.id}>
          {t.message}
        </div>
      ))}
    </div>
  );
}

function FooterMount() {
  const { pathname } = useLocation();
  if (pathname.startsWith('/checkout') || pathname.startsWith('/order/')) return null;
  return <Footer />;
}

export default function App() {
  const { pathname } = useLocation();

  if (pathname.startsWith('/admin')) {
    return (
      <>
        <AdminApp />
        <Toasts />
      </>
    );
  }

  const onFormPage = pathname.startsWith('/checkout') || pathname.startsWith('/order/');
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order/:id" element={<Success />} />
        <Route path="/orders" element={<Orders />} />
        <Route
          path="*"
          element={
            <main className="container not-found">
              <h1>পেজটি পাওয়া যায়নি</h1>
              <p>লিংকটি হয়তো ভুল।</p>
              <Link to="/" className="btn primary">
                হোমে ফিরুন
              </Link>
            </main>
          }
        />
      </Routes>
      <FooterMount />
      <CartDrawer />
      <Toasts />
      <SocialDock hidden={onFormPage} />
      <MobileTabBar />
    </>
  );
}
