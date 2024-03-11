
import "../abstracts/menu.scss"
import { useEffect } from "react"
import { useMenuStore } from "../store/menuStore"
import NavButton from "../components/NavButton"
import CartButton from "../components/CartButton"



const Menu = () => {

      //use my menustore
      const {menuItems, fetchMenuData, addToCart} = useMenuStore()
      useEffect(() =>{
        fetchMenuData();
      },[]);

  return (
    <>
      
      <section className="menu-wrapper">
      <section className="menu-cart">
        <NavButton/>
        <CartButton/>
      </section>

      <h1 className="menu-header">Meny</h1>

      <ul className="menu-list">
          {menuItems.map((item, index) => (
            <li key={index} className="menu-item">
              <button className="menu-button" onClick={() =>addToCart(item)}></button>
              <div className="menu-info">
                <div className="info-text">
                  <h3>{item.title}</h3>
                  <h3 className="menu-price">{`${item.price} Kr`}</h3>
                </div>
                 <p>{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>

      </section>
     </>
   
  )
}

export default Menu