'use client';

const KEY = 'wishlist-v1';
export const WISHLIST_UPDATED_EVENT = 'superspec:wishlist-updated';

function emitWishlistUpdated() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(WISHLIST_UPDATED_EVENT));
}

export function readWishlist(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeWishlist(items: string[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  emitWishlistUpdated();
}

export function addToWishlist(handle: string) {
  const list = readWishlist();
  if (!list.includes(handle)) {
    list.push(handle);
    writeWishlist(list);
    return true;
  }
  return false;
}

export function removeFromWishlist(handle: string) {
  const list = readWishlist();
  const newList = list.filter(h => h !== handle);
  if (list.length !== newList.length) {
    writeWishlist(newList);
    return true;
  }
  return false;
}

export function isInWishlist(handle: string): boolean {
  return readWishlist().includes(handle);
}
