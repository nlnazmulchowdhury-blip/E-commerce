# CakeHaus BD

বাংলাদেশি কেক শপের স্টোরফ্রন্ট ও এডমিন প্যানেল — React 19 + Vite 8, ডেটা localStorage-এ (ট্যাবের মধ্যে লাইভ সিঙ্ক)।

## চালানো

```bash
npm install
npm run dev      # http://localhost:5199
npm run build
npm run preview
```

## রুট

- `/` স্টোরফ্রন্ট · `/shop` · `/product/:id` · `/cart` · `/checkout` · `/orders` · `/status`
- `/admin` — ড্যাশবোর্ড, প্রোডাক্ট, অর্ডার, ব্যানার, সোশ্যাল ও যোগাযোগ

## ছবি আপলোড

`ImageField` কম্পোনেন্ট `POST /api/upload`-এ ছবি পাঠায় (Vite plugin মিডলওয়্যার, magic-byte যাচাই, ৮MB সীমা) এবং `/uploads/<file>` লিংক ফেরত দেয়।
