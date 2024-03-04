
import { create } from "zustand";

//This is just for the menu and wont update, that is that the cartstore.ts is for

interface MenuItem {
    id: string;
    title: string;
    desc: string;
    price: number;
}

interface menuStoreState{
  menuItems: MenuItem[];
  fetchMenuData: () => Promise<void>
}

export const useMenuStore = create<menuStoreState>((set)=>({
  menuItems: [],
  fetchMenuData: async () => {
    try{
      const response = await fetch('https://airbean-api-xjlcn.ondigitalocean.app/api/beans/');
      const data = await response.json();
      //filer out non coffee products
      const coffeeItems = data.menu.filter((item: { id: string | string[] }) =>
        item.id.includes('coffee')
      );
      set({menuItems: coffeeItems});
    } catch(error){
      console.log("whoops", error)
    }
  }
}))


