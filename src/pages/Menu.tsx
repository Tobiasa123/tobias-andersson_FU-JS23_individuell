import Nav from "../components/Nav"
import "../abstracts/menu.scss"
import { useEffect } from "react"
import { useMenuStore } from "../store/menuStore"



const Menu = () => {

      //use my fetch function from my menustore,
      //which sets my filtered coffee items
      const {menuItems, fetchMenuData} = useMenuStore()
      useEffect(() =>{
        fetchMenuData();
      },[]);

  return (
    <>
      <Nav/>
      <section className="menu-wrapper">

      <h1>Menu</h1>

      <ul className="menu-list">
          {menuItems.map((item, index) => (
            <li key={index} className="menu-item">
              <button className="menu-button">+</button>
              <h2>{item.title}</h2>
              <p>{item.desc}</p>
              <h2>{`${item.price} Kr`}</h2>
            </li>
          ))}
        </ul>

      </section>
     </>
   
  )
}

export default Menu