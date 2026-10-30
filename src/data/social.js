export const SOCIAL_CHANNELS = [
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    kind: 'phone',
    base: 'https://wa.me/',
    profileLabel: 'WhatsApp নম্বর',
    placeholder: '8801700112233',
    hint: 'দেশের কোডসহ নম্বর দিন — 01… দিলে 88 নিজেই বসে যাবে',
    defaultValue: '8801700112233',
    defaultOn: true,
  },
  {
    key: 'messenger',
    label: 'Messenger',
    kind: 'handle',
    base: 'https://m.me/',
    profileLabel: 'Messenger ইউজারনেম',
    placeholder: 'cakehausbd',
    hint: 'm.me/… লিংকের শেষ অংশটুকু',
    defaultValue: 'cakehausbd',
    defaultOn: true,
  },
  {
    key: 'facebook',
    label: 'Facebook',
    kind: 'handle',
    base: 'https://facebook.com/',
    profileLabel: 'ফেসবুক পেজ ইউজারনেম',
    placeholder: 'cakehausbd',
    hint: 'পেজের ইউজারনেম, যেমন facebook.com/…',
    defaultValue: '',
    defaultOn: false,
  },
  {
    key: 'instagram',
    label: 'Instagram',
    kind: 'handle',
    base: 'https://instagram.com/',
    profileLabel: 'ইনস্টাগ্রাম ইউজারনেম',
    placeholder: 'cakehausbd',
    hint: '@ ছাড়া ইউজারনেমটুকু',
    defaultValue: '',
    defaultOn: false,
  },
  {
    key: 'tiktok',
    label: 'TikTok',
    kind: 'handle',
    base: 'https://tiktok.com/@',
    profileLabel: 'TikTok ইউজারনেম',
    placeholder: 'cakehausbd',
    hint: '@ ছাড়া ইউজারনেমটুকু',
    defaultValue: '',
    defaultOn: false,
  },
  {
    key: 'youtube',
    label: 'YouTube',
    kind: 'handle',
    base: 'https://youtube.com/@',
    profileLabel: 'YouTube চ্যানেল',
    placeholder: 'cakehausbd',
    hint: '@ ছাড়া চ্যানেল নাম',
    defaultValue: '',
    defaultOn: false,
  },
];

export const WHATSAPP = SOCIAL_CHANNELS[0];

export function normalizeValue(channel, raw) {
  const value = String(raw ?? '').trim();
  if (!value) return '';
  if (channel.kind === 'phone') {
    let digits = value.replace(/\D/g, '');
    if (!digits) return '';
    if (digits.startsWith('0')) digits = `88${digits}`;
    else if (digits.length === 10 && digits.startsWith('1')) digits = `880${digits}`;
    return digits;
  }
  if (/^https?:\/\//i.test(value)) return value;
  return value.replace(/^@+/, '');
}

export function channelHref(channel, raw) {
  const value = String(raw ?? '').trim();
  if (!value) return '';
  if (/^https?:\/\//i.test(value)) return value;
  const clean = normalizeValue(channel, value);
  return clean ? `${channel.base}${clean}` : '';
}

export function validateValue(channel, raw) {
  const value = String(raw ?? '').trim();
  if (!value) return 'লিংক বা নম্বর দিন';
  if (/^https?:\/\//i.test(value)) {
    try {
      new URL(value);
      return '';
    } catch {
      return 'সঠিক লিংক দিন';
    }
  }
  if (channel.kind === 'phone') {
    const digits = normalizeValue(channel, value);
    if (digits.length < 10 || digits.length > 15) return 'সঠিক নম্বর দিন (১০–১৫ ডিজিট)';
    return '';
  }
  const handle = value.replace(/^@+/, '');
  if (handle.length < 2) return 'ইউজারনেম কমপক্ষে ২ অক্ষর';
  if (!/^[a-zA-Z0-9._-]+$/.test(handle)) return 'শুধু ইংরেজি অক্ষর, সংখ্যা, . _ - চলবে';
  return '';
}

export function phoneLabel(raw) {
  const digits = String(raw ?? '').replace(/\D/g, '');
  if (!digits) return '';
  let local = digits;
  if (local.startsWith('88') && local.length > 11) local = local.slice(2);
  if (local.length === 11 && local.startsWith('0')) return `${local.slice(0, 5)}-${local.slice(5)}`;
  return `+${digits}`;
}

export function phoneTel(raw) {
  const digits = normalizeValue(WHATSAPP, raw);
  return digits ? `+${digits}` : '';
}
