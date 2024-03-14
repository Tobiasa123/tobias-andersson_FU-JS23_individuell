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

  //in return, select what to render depending on if user placed an order
  return (
    <>
    {eta !== undefined && orderNr !== undefined && (
      <section className="status-wrapper">
        <p className="orderNr-text">Ordernummer <span className="bold-span_status">#{orderNr}</span></p>
        <img src={drone} alt="" />
        <h2 className="status-bigText">Din beställning är på väg!</h2>
        <p className="eta-text"><span className="bold-span_status">{eta}</span> minuter</p>
        <button onClick={handleStatusButton} className="status-button">Ok, cool!</button>
      </section>
    )}
    {eta == undefined && orderNr == undefined && (
       <section className="status-wrapper">
        <h2 className="status-bigText">Din beställning visas här!</h2>
        <button onClick={handleStatusButton} className="status-button">Ok, cool!</button>
      </section>
    )}
  </>
    
  )
}

export default Status