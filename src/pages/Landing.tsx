import "../abstracts/landing.scss"

import Logo from "../assets/logo.svg"
import Nav from "../components/Nav"

const Landing = () => {
  return (
    <>
    <Nav></Nav>
    <div>Landing Page</div>
    <img src={Logo} alt="logo"/>
    </>
    
  )
}

export default Landing