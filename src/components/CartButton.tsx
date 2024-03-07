import cartIcon from "../assets/bag.svg"
import Cart from "./Cart"
import { useState } from "react"
import "../abstracts/cartbutton.scss"

const CartButton = () => {

    const [isCartVisible, setIsCartVisible] = useState(false)

    const handleClick = () => {
        setIsCartVisible(!isCartVisible);
      };

  return (
    <>
     <button className="cart-button" onClick={handleClick}>
        <img src={cartIcon} alt="" />
     </button>

    {isCartVisible && <Cart />}
    </>
  )
}

export default CartButton