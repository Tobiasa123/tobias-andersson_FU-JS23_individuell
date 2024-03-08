import '../abstracts/cart.scss';
import { useMenuStore } from '../store/menuStore';
import arrowDown from "../assets/arrowdown.svg"
import arrowUp from "../assets/arrowup.svg"
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, addFromCart, deleteFromCart, getCartTotal } = useMenuStore();

  const total = getCartTotal()
  const navigate = useNavigate()


  const handleBuy = async () => {
    try {
      const response = await fetch('https://airbean-api-xjlcn.ondigitalocean.app/api/beans/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          details: {
            order: cartItems.map(item => ({ name: item.title, price: item.price })),
          },
        }),
      });
  
      if (response.ok) {
        const result = await response.json();
        const { orderNr } = result;
        
        //pass ordernumber into url
        const etaResponse = await fetch(`https://airbean-api-xjlcn.ondigitalocean.app/api/beans/order/status/${orderNr}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (etaResponse.ok) {
          const etaResult = await etaResponse.json();
          const { eta } = etaResult;
  
          console.log("orderNr:", orderNr);
          console.log("ETA for the order:", eta);

          navigate('/Status', { state: { eta, orderNr } });
        } else {
          console.error('eta error');
        }
      }
    } catch (error) {
      console.error('order error');
    }
  };
  

  return (
    <div className="cart-dropdown">
      <div className="cart-content">
        <h1 className='cart-header'>Din beställning</h1>
        <ul className='cart-list'>
          {cartItems.map((item, index) => (
            <li key={index} className='cart-list-item'>
              <div className='cart-text'>
                <h2 className='cart-item-header'>{item?.title}</h2> 
                <p className='cart-smalltext'>{`${item.price * item.quantity} Kr`}
                </p>
              </div>
              <div className='add-delete'>
                <img src={arrowUp} alt="" className='arrow-up' onClick={() => addFromCart(item)} />
                <span>{item.quantity}</span>
                <img src={arrowDown} alt="" className='arrow-down' onClick={() => deleteFromCart(item)} />
              </div>
            </li>
          ))}
        </ul>
        <section className='big-total-wrapper'>
          <section className='small-total_wrapper'>
            <h2 className='cart-total'>Total: </h2>
            <h2 className='cart-total-amount'>{total} kr</h2>
          </section>
          <p>inkl moms + drönarleverans</p>
        </section>
        
        {/*only render button if order isn't empty*/}
        {total > 0 &&(
          <button onClick={handleBuy} className='order-button_cart'>Take my money!</button>
        )}
      </div>
    </div>
  );
}

export default Cart