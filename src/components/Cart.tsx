import '../abstracts/cart.scss';
import { useMenuStore } from '../store/menuStore';
import arrowDown from "../assets/arrowdown.svg"
import arrowUp from "../assets/arrowup.svg"
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, addFromCart, deleteFromCart, getCartTotal } = useMenuStore();

  const total = getCartTotal()
  const navigate = useNavigate()

  const handleBuy = () => {
    navigate('/Status');
  };


  return (
    <div className="cart-dropdown">
      <div className="cart-content">
        <h1>Din beställning</h1>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {`${item?.title} ${item.price * item.quantity} Kr  ....`}
              <div className='add-delete'>
                <img src={arrowUp} alt="" className='arrow-up' onClick={() => addFromCart(item)} />
                <span>{item.quantity}</span>
                <img src={arrowDown} alt="" className='arrow-down' onClick={() => deleteFromCart(item)} />
              </div>
            </li>
          ))}
        </ul>
        <h3>Total: ... {total} Kr</h3>
        <button onClick={handleBuy}>Take my money!</button>
      </div>
    </div>
  );
}

export default Cart