import cartIcon from "../assets/bag.svg"
import Cart from "./Cart"
import { useState } from "react"
import "../abstracts/cartbutton.scss"
import { useMenuStore } from "../store/menuStore"

const CartButton = () => {

    const [isCartVisible, setIsCartVisible] = useState(false)

    const handleClick = () => {
        setIsCartVisible(!isCartVisible);
      };

      const cartItems = useMenuStore((state) => state.cartItems);


      //cart quantity which is displayed on my cartbutton
      const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    

  return (
    <>
     <button className="cart-button" onClick={handleClick}>
        <img src={cartIcon} alt="" />
        {cartQuantity > 0 && <span className="cart-quantity">{cartQuantity}</span>}
     </button>

    {isCartVisible && <Cart />}
    </>
  )
}

export default CartButton