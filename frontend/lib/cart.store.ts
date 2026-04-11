import { create } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (item: CartItem) => {
    const items = get().items;
    const existingItem = items.find((i) => i.id === item.id);

    if (existingItem) {
      set({
        items: items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i,
        ),
      });
    } else {
      set({ items: [...items, item] });
    }
  },

  removeItem: (id: string) => {
    set({ items: get().items.filter((i) => i.id !== id) });
  },

  updateQuantity: (id: string, quantity: number) => {
    set({
      items: get().items.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i,
      ),
    });
  },

  clearCart: () => {
    set({ items: [] });
  },

  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
}));
