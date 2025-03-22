import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  slug: string;
}

interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      addItem: (item) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((i) => i.id === item.id);

        if (existingItem) {
          return set((state) => {
            const updatedItems = state.items.map((cartItem) => 
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            );
            
            return {
              items: updatedItems,
              totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
              totalPrice: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
            };
          });
        }

        const newItem = { ...item, quantity: 1 };
        
        set((state) => {
          const updatedItems = [...state.items, newItem];
          return {
            items: updatedItems,
            totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
            totalPrice: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
          };
        });
      },
      removeItem: (id) => {
        set((state) => {
          const updatedItems = state.items.filter((item) => item.id !== id);
          return {
            items: updatedItems,
            totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
            totalPrice: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
          };
        });
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          return get().removeItem(id);
        }
        
        set((state) => {
          const updatedItems = state.items.map((item) => 
            item.id === id ? { ...item, quantity } : item
          );
          
          return {
            items: updatedItems,
            totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
            totalPrice: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
          };
        });
      },
      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0 });
      },
    }),
    {
      name: 'shopping-cart',
    }
  )
); 