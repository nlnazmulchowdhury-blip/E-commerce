const KEY = 'cakehaus_admin_session_v1';

export const ADMIN_DEMO = { user: 'admin', pass: 'cakehaus123' };

export function isAdminAuthed() {
  try {
    return sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

export function setAdminAuthed(on) {
  try {
    if (on) sessionStorage.setItem(KEY, '1');
    else sessionStorage.removeItem(KEY);
  } catch {
    /* storage unavailable — session-only auth */
  }
}
