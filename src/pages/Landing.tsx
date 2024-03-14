import "../abstracts/landing.scss"
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
      <section className="landing-middle">
        <img src={Logo} alt="logo" className="landing-logo"/>
        <h1>AIR BEAN</h1>
        <p>DRONEDELIVERED COFFEE</p>
      </section>
    </section>
    </>
  )
}

export default Landing