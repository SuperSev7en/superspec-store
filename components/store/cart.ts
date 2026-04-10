'use client';

export type CartLine = {
  handle: string;
  variantId?: string;
  quantity: number;
};

const KEY = 'cart-v1';

export const CART_UPDATED_EVENT = 'superspec:cart-updated';

function emitCartUpdated() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT));
}

export function cartTotalQuantity(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + Math.max(0, l.quantity), 0);
}

export function readCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((l) => ({
        handle: typeof l?.handle === 'string' ? l.handle : '',
        variantId: typeof l?.variantId === 'string' ? l.variantId : undefined,
        quantity: Number(l?.quantity ?? 1),
      }))
      .filter((l) => l.handle && Number.isFinite(l.quantity) && l.quantity > 0);
  } catch {
    return [];
  }
}

export function writeCart(lines: CartLine[]) {
  localStorage.setItem(KEY, JSON.stringify(lines));
  emitCartUpdated();
}

export function addToCart(line: CartLine) {
  const cart = readCart();
  const idx = cart.findIndex((l) => l.handle === line.handle && l.variantId === line.variantId);
  if (idx >= 0) cart[idx] = { ...cart[idx], quantity: cart[idx].quantity + line.quantity };
  else cart.push(line);
  writeCart(cart);
}

