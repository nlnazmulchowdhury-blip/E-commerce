import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import HeroSlider from '../components/HeroSlider';
import { IconArrow, IconWhatsapp } from '../components/Icons';
import { categories } from '../data/products';
import { useSocial } from '../context/SocialContext';
import { useCatalog } from '../context/CatalogContext';

function SectionHead({ title, sub, to, label = 'View All' }) {
  return (
    <div className="section-head">
      <div>
        <h2>{title}</h2>
        {sub && <p>{sub}</p>}
      </div>
      {to && (
        <Link to={to} className="view-all">
          {label} <IconArrow />
        </Link>
      )}
    </div>
  );
}

export default function Home() {
  const { products } = useCatalog();
  const { whatsappHref } = useSocial();
  const latest = products.slice(0, 10);
  const birthday = products.filter((p) => p.category === 'birthday').slice(0, 5);
  const sweetBites = products
    .filter((p) => ['cheesecakes', 'cupcakes', 'brownies', 'gift'].includes(p.category))
    .slice(0, 5);
  const occasion = products.filter((p) => ['wedding', 'custom', 'photo'].includes(p.category));

  return (
    <main className="home">
      <section className="container">
        <HeroSlider />
      </section>

      <section className="section container" id="categories">
        <SectionHead title="Shop by Category" to="/shop" />
        <div className="cat-grid">
          {categories.map((c, i) => (
            <Link
              to={`/shop?cat=${c.slug}`}
              className="cat-tile reveal"
              key={c.slug}
              style={{ '--i': i }}
            >
              <span className="cat-img">
                <img src={c.image} alt="" loading="lazy" />
              </span>
              <strong>{c.name}</strong>
              <small>{c.bn}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="container">
        <div className="promo-band reveal">
          <div>
            <span className="promo-kicker">আজকের অফার</span>
            <h3>প্রতিটি জন্মদিনের কেকে ১০% ছাড়</h3>
            <p>চেকআউটে কোড ব্যবহার করুন — সীমিত সময়ের জন্য।</p>
          </div>
          <div className="promo-right">
            <span className="coupon">HBD10</span>
            <Link to="/shop?cat=birthday" className="btn dark">
              অফার দেখুন <IconArrow />
            </Link>
          </div>
        </div>
      </section>

      <section className="section container">
        <SectionHead title="Latest Products" sub="সদ্য বেক করা, সদ্য তোলা" to="/shop" />
        <div className="product-grid">
          {latest.map((p, i) => (
            <ProductCard product={p} key={p.id} index={i} />
          ))}
        </div>
        <div className="center-row">
          <Link to="/shop" className="btn outline">
            See More Products
          </Link>
        </div>
      </section>

      <section className="section soft-bg">
        <div className="container">
          <SectionHead title="Birthday Cakes" sub="জন্মদিনটাকে মনে রাখার মতো করে তুলুন" to="/shop?cat=birthday" />
          <div className="product-grid">
            {birthday.map((p, i) => (
              <ProductCard product={p} key={p.id} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <SectionHead title="Sweet Bites" sub="কাপকেক, ব্রাউনি, চিজকেক ও গিফট বক্স" to="/shop?cat=cupcakes" />
        <div className="product-grid">
          {sweetBites.map((p, i) => (
            <ProductCard product={p} key={p.id} index={i} />
          ))}
        </div>
      </section>

      <section className="section soft-bg">
        <div className="container">
          <SectionHead title="Wedding & Custom" sub="আপনার গল্পের জন্য কাস্টম ডিজাইন" to="/shop?cat=wedding" />
          <div className="product-grid thirds">
            {occasion.map((p, i) => (
              <ProductCard product={p} key={p.id} index={i} />
            ))}
          </div>
          <div className="custom-cta reveal">
            <div>
              <h3>নিজের ডিজাইনের কেক চান?</h3>
              <p>ছবি বা আইডিয়া পাঠান WhatsApp-এ — আমাদের বেকার ডিজাইন করে জানাবে ৩০ মিনিটে।</p>
            </div>
            <a
              href={whatsappHref('আমি একটি কাস্টম কেক অর্ডার করতে চাই')}
              target="_blank"
              rel="noreferrer"
              className="btn whatsapp"
            >
              <IconWhatsapp /> WhatsApp-এ মেসেজ
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
