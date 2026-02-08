import { create } from "zustand";

const getInitialCartItems = () => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("cart-items");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveCartItems = (items) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart-items", JSON.stringify(items));
  }
};

const useCartStore = create((set, get) => ({
  items: getInitialCartItems(),
  isOpen: false,

  addItem: (product, quantity = 1, options = {}) => {
    const items = get().items;
    const existingItemIndex = items.findIndex(
      (item) =>
        item.id === product.id &&
        item.size === options.size &&
        item.color === options.color
    );

    let updatedItems;
    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      updatedItems = [...items];
      updatedItems[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      updatedItems = [
        ...items,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
          size: options.size,
          color: options.color,
        },
      ];
    }
    saveCartItems(updatedItems);
    set({ items: updatedItems });
  },

  removeItem: (itemId) => {
    const updatedItems = get().items.filter((item) => item.id !== itemId);
    saveCartItems(updatedItems);
    set({ items: updatedItems });
  },

  updateQuantity: (itemId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(itemId);
      return;
    }

    const updatedItems = get().items.map((item) =>
      item.id === itemId ? { ...item, quantity } : item
    );
    saveCartItems(updatedItems);
    set({ items: updatedItems });
  },

  clearCart: () => {
    saveCartItems([]);
    set({ items: [] });
  },

  setItems: (items) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart-items", JSON.stringify(items));
    }
    set({ items: items ?? [] });
  },

  toggleCart: () => {
    set({ isOpen: !get().isOpen });
  },

  openCart: () => {
    set({ isOpen: true });
  },

  closeCart: () => {
    set({ isOpen: false });
  },

  getTotal: () => {
    return get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },

  getItemCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  },
}));

export default useCartStore;
