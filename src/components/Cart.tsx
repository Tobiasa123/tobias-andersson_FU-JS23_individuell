import '../abstracts/cart.scss';
import { useMenuStore } from '../store/menuStore';
import arrowDown from "../assets/arrowdown.svg"
import arrowUp from "../assets/arrowup.svg"
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, addFromCart, deleteFromCart, getCartTotal } = useMenuStore();

  const total = getCartTotal()
  const navigate = useNavigate()

  //here i post my order from cart
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

           //get data
           const existingSessionOrders = sessionStorage.getItem('orderData');
           const currentOrder = existingSessionOrders ? JSON.parse(existingSessionOrders) : [];
     
           //get the date of the purchase
           //new instance of Date()
           const currentDate = new Date();

           //format date correctly
           const formattedYear = currentDate.getFullYear().toString().slice(-2);
           const formattedMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
           const formattedDay = currentDate.getDate().toString().padStart(2, '0');

           const formattedDate = `${formattedYear}/${formattedMonth}/${formattedDay}`;

           //get total for cart
           const orderTotal = getCartTotal();
     
           //push data into current order
           currentOrder.push({orderNr: orderNr, total: orderTotal, date: formattedDate });

           //set current order in my orderdata in sessionstorage
           sessionStorage.setItem('orderData', JSON.stringify(currentOrder));

        //pass ordernumber into url to get the eta
        const etaResponse = await fetch(`https://airbean-api-xjlcn.ondigitalocean.app/api/beans/order/status/${orderNr}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (etaResponse.ok) {
          const etaResult = await etaResponse.json();
          const { eta } = etaResult;

          //navigate to my status page and pass the data i got here
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
    <>
    <div className="cart-dropdown"></div>
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
    </>
  );
}

export default Cart