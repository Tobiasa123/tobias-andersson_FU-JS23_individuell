
import navIcon from "../assets/navicon.svg"
import { useNavigate } from "react-router-dom"

const NavButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate('/Nav');
    };

  return (
    <button onClick={handleClick}>
        <img src={navIcon} alt="" />
    </button>
    
  )
}

export default NavButton