export const ORDER_STATUSES = [
  'প্রসেসিং',
  'কনফার্মড',
  'বেকিং',
  'ডেলিভারিতে',
  'ডেলিভারি হয়েছে',
  'বাতিল',
];

const TONES = {
  প্রসেসিং: 'warn',
  কনফার্মড: 'info',
  বেকিং: 'cook',
  ডেলিভারিতে: 'info',
  'ডেলিভারি হয়েছে': 'success',
  বাতিল: 'danger',
};

export function statusTone(status) {
  return TONES[status] || 'neutral';
}

export function isCancelled(status) {
  return status === 'বাতিল';
}

export const ORDER_FLOW = ['প্রসেসিং', 'কনফার্মড', 'বেকিং', 'ডেলিভারিতে', 'ডেলিভারি হয়েছে'];

const HINTS = {
  প্রসেসিং: 'আপনার অর্ডার পেয়েছি — শীঘ্রই কল করে কনফার্ম করা হবে।',
  কনফার্মড: 'অর্ডার কনফার্ম হয়েছে, বেকিং শিডিউলে রাখা হয়েছে।',
  বেকিং: 'আপনার কেক এখন বেক হচ্ছে — ঠিক সময়ে তৈরি হয়ে যাবে।',
  ডেলিভারিতে: 'কেক ডেলিভারির পথে আছে। রাইডার পৌঁছালে কল করবেন।',
  'ডেলিভারি হয়েছে': 'অর্ডার ডেলিভারি সম্পন্ন হয়েছে। CakeHaus বেছে নেওয়ার জন্য ধন্যবাদ!',
  বাতিল: 'অর্ডারটি বাতিল করা হয়েছে। সহায়তা দরকার হলে আমাদের হটলাইনে কল করুন।',
};

export function statusHint(status) {
  return HINTS[status] || 'অর্ডারের সর্বশেষ অবস্থা উপরে দেখানো হয়েছে।';
}

export function formatDeliveryDate(value) {
  if (!value) return '';
  const parts = String(value).split('-').map(Number);
  if (parts.length !== 3 || parts.some((n) => !Number.isFinite(n) || n <= 0)) return value;
  const [y, m, d] = parts;
  return new Date(y, m - 1, d).toLocaleDateString('bn-BD', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
