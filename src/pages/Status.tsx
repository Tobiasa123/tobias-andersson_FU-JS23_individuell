import { useNavigate } from "react-router-dom"
import drone from "../assets/drone.svg"
import "../abstracts/status.scss"
import { useMenuStore } from '../store/menuStore';
const Status = () => {

  const {clearCart} = useMenuStore()

  const navigate = useNavigate()
  const handleStatusButton = () =>{
    clearCart()
    navigate("/Menu")
  }
  return (
    <>
    <section className="status-wrapper">
    <p>Ordernummer #12DV23F</p>
    <img src={drone} alt="" />
    <h1>Din besällning är på väg!</h1>
    <button onClick={handleStatusButton}>Ok, cool!</button>
    </section>
    </>
    
  )
}

export default Status