
import navIcon from "../assets/navicon.svg"
import { useNavigate } from "react-router-dom"
import '../abstracts/navbutton.scss'

const NavButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate('/Nav');
    };

  return (
    <button onClick={handleClick} className="nav-button">
        <img src={navIcon} alt="" />
    </button>
    
  )
}

export default NavButton