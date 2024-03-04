import '../abstracts/cart.scss';

const Cart = () => {
  return (
    <div className="cart-dropdown">
      <div className="cart-content">
        <h1>Din beställning</h1>
        <ul>
          <li>item1</li>
          <li>item2</li>
          <li>item3</li>
        </ul>
      </div>
    </div>
  );
};

export default Cart;