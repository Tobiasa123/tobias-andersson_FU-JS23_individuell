
import { Link, useNavigate } from "react-router-dom"
import "../abstracts/nav.scss"
import closeButton from "../assets/closebutton.svg"
import line from '../assets/menuline.svg'

const Nav = () => {
    let navigate = useNavigate()
    const handleClose = () => {
        navigate(-1)
    }
  return (
    <>
    <img src={closeButton} alt="close button" className="close-button" onClick={handleClose}/>
    <section className="nav-wrapper">

        <ul className="nav">
            <li className="nav-item">
                <Link to="/Menu">
                    <h1>Meny</h1>
                </Link>
                <img src={line} alt="" className="menu-line"/>
            </li>
            <li className="nav-item">
                <Link to="/About">
                    <h1>Vårt kaffe</h1>
                </Link>
                <img src={line} alt="" className="menu-line"/>
            </li>
            <li className="nav-item">
                <Link to="/Profile">
                    <h1>Min profil</h1>
                </Link>
                <img src={line} alt="" className="menu-line"/>
            </li>
            <li className="nav-item">
                <Link to="/Status">
                    <h1>Orderstatus</h1>
                </Link>
            </li>
        </ul>
    </section>
    </>
  )
}

export default Nav