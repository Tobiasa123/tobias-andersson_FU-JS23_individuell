import "../abstracts/landing.scss"
import leftLanding from "../assets/leftlanding.svg"
import rightLanding from "../assets/rightlanding.svg"
import Logo from "../assets/logo.svg"
import { useNavigate } from "react-router-dom"

const Landing = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Menu');
  };
  return (
    <>
    <section className="landing-wrapper" onClick={handleClick}>
    <img src={leftLanding} alt="logo"/>
    <section className="landing-middle">
      <img src={Logo} alt="logo" className="landing-logo"/>
      <h1>AIR BEAN</h1>
      <p>DRONEDELIVERED COFFEE</p>
    </section>
    
    <img src={rightLanding} alt="logo"/>
    </section>
    </>
    
  )
}

export default Landing