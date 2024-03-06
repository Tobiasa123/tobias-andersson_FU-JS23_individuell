
import { create } from "zustand";
interface MenuItem {
    id: string;
    title: string;
    desc: string;
    price: number;
}
interface CartItem{
    id: string;
    title: string;
    price: number;
    quantity: number
}
interface menuStoreState{
  menuItems: MenuItem[];
  fetchMenuData: () => Promise<void>

  cartItems: CartItem[];
  addToCart: (item: MenuItem) => void;

  addFromCart: (item: CartItem) => void;
  deleteFromCart: (item: CartItem) => void;

  getCartTotal: () => number; 
  clearCart: () => void;
}

export const useMenuStore = create<menuStoreState>((set)=>({

  menuItems: [],
  fetchMenuData: async () => {
    try{
      const response = await fetch('https://airbean-api-xjlcn.ondigitalocean.app/api/beans/');
      const data = await response.json();
      console.log(data)
      //filer out non coffee products

      set({menuItems: data.menu});
    } catch(error){
      console.log("whoops", error)
    }
  },

  cartItems: [],
  addToCart: (item: MenuItem) => {
    set((state) => {
      const existingItemIndex = state.cartItems.findIndex((cartItem) => cartItem.id === item.id);

      if (existingItemIndex !== -1) {
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex].quantity += 1;

        return { ...state, cartItems: updatedCartItems };
      } else {
        return { ...state, cartItems: [...state.cartItems, { ...item, quantity: 1 }] };
      }
    });
  },

  addFromCart: (item: CartItem) => {
    set((state) => {
      const existingItem = state.cartItems.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        const updatedCartItems = state.cartItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );

        return { cartItems: updatedCartItems };
      } else {
        return { cartItems: [...state.cartItems, { ...item, quantity: 1 }] };
      }
    });
  },
  deleteFromCart: (item: CartItem) => {
    set((state) => {
      const existingItem = state.cartItems.find((cartItem) => cartItem.id === item.id);

      if (existingItem && existingItem.quantity > 1) {
        const updatedCartItems = state.cartItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        );

        return { cartItems: updatedCartItems };
      } else {
        const updatedCartItems = state.cartItems.filter((cartItem) => cartItem.id !== item.id);

        return { cartItems: updatedCartItems };
      }
    });
  },

  getCartTotal: (): number => {
    const state = useMenuStore.getState();
    return state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  },
  clearCart: () =>{
    set({cartItems: []})
  },
}));


