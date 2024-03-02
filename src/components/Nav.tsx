
import { Link } from "react-router-dom"
import "../abstracts/nav.scss"
import Cart from "./Cart"

const Nav = () => {
  return (
    <>
    <ul className="nav">
        <li className="nav-item">
            <Link to="/Menu">
                <button>Menu</button>
            </Link>
         </li>
        <li className="nav-item">
            <Link to="/About">
                <button>about</button>
            </Link>
        </li>
        <li className="nav-item">
            <Link to="/Profile">
                <button>profile</button>
            </Link>
        </li>
        <li className="nav-item">
            <Link to="/Status">
                <button>status</button>
            </Link>
        </li>
        <Cart/>
    </ul>
    </>
  )
}

export default Nav