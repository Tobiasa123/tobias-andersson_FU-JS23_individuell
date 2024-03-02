import Nav from "../components/Nav"
import "../abstracts/menu.scss"
const Menu = () => {
  return (
    <>
      <Nav/>
      <section className="menu-wrapper">

      <h1>Menu</h1>

      <ul className="menu-list">
        <li className="menu-item"><button className="menu-button">+</button><h2>Bryggkaffe</h2></li>
        <li className="menu-item"><button className="menu-button">+</button><h2>Caffe Doppio</h2></li>
        <li className="menu-item"><button className="menu-button">+</button><h2>Cappuccino</h2></li>
        <li className="menu-item"><button className="menu-button">+</button><h2>Latte Macchiato</h2></li>
        <li className="menu-item"><button className="menu-button">+</button><h2>Kaffe Latte</h2></li>
        <li className="menu-item"><button className="menu-button">+</button><h2>Cortado</h2></li>
      </ul>

      </section>
     </>
   
  )
}

export default Menu