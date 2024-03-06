import { useNavigate, useLocation } from "react-router-dom"
import drone from "../assets/drone.svg"
import "../abstracts/status.scss"
import { useMenuStore } from '../store/menuStore';

const Status = () => {

  const {clearCart} = useMenuStore()

  //uselocation to access state when changing components
  const location = useLocation();
  
  const { eta, orderNr } = location.state || {};

  const navigate = useNavigate()

  const handleStatusButton = () =>{
    clearCart()
    navigate("/Menu")
  }
  return (
    <>
    {eta !== undefined && orderNr !== undefined && (
      <section className="status-wrapper">
        <p>#{orderNr}</p>
        <img src={drone} alt="" />
        <h1>Din beställning är på väg!</h1>
        <p>{eta} minutes!</p>
        <button onClick={handleStatusButton}>Ok, cool!</button>
      </section>
    )}
    {eta == undefined && orderNr == undefined && (
       <section className="status-wrapper">
        <h1>Place an order to view your order status!</h1>
        <button onClick={handleStatusButton}>Ok, cool!</button>
      </section>
    )}
  </>
    
  )
}

export default Status