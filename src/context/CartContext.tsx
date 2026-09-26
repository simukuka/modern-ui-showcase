import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { getProduct, type Product } from '../data/products';
import { brand } from '../data/site';
import { useLocalStorage } from '../hooks/useLocalStorage';

export interface CartItem {
  /** Unique key: product id + selected options */
  key: string;
  productId: string;
  quantity: number;
  shade?: string;
  size?: string;
}

export interface CartLine extends CartItem {
  product: Product;
  lineTotal: number;
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  remainingForFreeShipping: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (productId: string, options?: { quantity?: number; shade?: string; size?: string }) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export const MAX_QUANTITY = 10;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>('shaarz-cart', []);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const addItem = useCallback<CartContextValue['addItem']>(
    (productId, { quantity = 1, shade, size } = {}) => {
      const key = [productId, shade, size].filter(Boolean).join('|');
      setItems((prev) => {
        const existing = prev.find((i) => i.key === key);
        if (existing) {
          return prev.map((i) => (i.key === key ? { ...i, quantity: Math.min(MAX_QUANTITY, i.quantity + quantity) } : i));
        }
        return [...prev, { key, productId, quantity: Math.min(MAX_QUANTITY, quantity), shade, size }];
      });
      setDrawerOpen(true);
    },
    [setItems],
  );

  const updateQuantity = useCallback(
    (key: string, quantity: number) => {
      setItems((prev) =>
        quantity <= 0
          ? prev.filter((i) => i.key !== key)
          : prev.map((i) => (i.key === key ? { ...i, quantity: Math.min(MAX_QUANTITY, quantity) } : i)),
      );
    },
    [setItems],
  );

  const removeItem = useCallback((key: string) => setItems((prev) => prev.filter((i) => i.key !== key)), [setItems]);
  const clearCart = useCallback(() => setItems([]), [setItems]);

  const value = useMemo<CartContextValue>(() => {
    const lines: CartLine[] = items.flatMap((item) => {
      const product = getProduct(item.productId);
      return product ? [{ ...item, product, lineTotal: product.price * item.quantity }] : [];
    });
    const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);
    const count = lines.reduce((sum, l) => sum + l.quantity, 0);
    const qualifies = subtotal >= brand.freeShippingThreshold;
    const shipping = subtotal === 0 || qualifies ? 0 : brand.flatShippingRate;
    return {
      lines,
      count,
      subtotal,
      shipping,
      total: subtotal + shipping,
      remainingForFreeShipping: Math.max(0, brand.freeShippingThreshold - subtotal),
      isDrawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    };
  }, [items, isDrawerOpen, addItem, updateQuantity, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
