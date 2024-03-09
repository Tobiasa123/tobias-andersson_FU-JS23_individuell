
import NavButton from "../components/NavButton"
import '../abstracts/profile.scss'
import { ChangeEvent, useState, useEffect } from "react";
import logo from '../assets/formlogo.svg'
import profileLogo from '../assets/profile.svg'
interface OrderData {
  orderNr: string;
  total: number;
}

const Profile = () => {

  const [orderHistory, setOrderHistory] = useState<OrderData[]>([]);

  const [isFormVisible, setFormVisible] = useState(true);
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const storedSignInStatus = sessionStorage.getItem("isSignedIn");
    setIsSignedIn(storedSignInStatus ? JSON.parse(storedSignInStatus) : false);

    const storedProfileName = sessionStorage.getItem("profileName");
    const storedProfileEmail = sessionStorage.getItem("profileEmail");
    setProfileName(storedProfileName ? JSON.parse(storedProfileName) : "");
    setProfileEmail(storedProfileEmail ? JSON.parse(storedProfileEmail) : "");

    //get order history when logged in:
    const storedOrderHistory = sessionStorage.getItem("orderData");
    setOrderHistory(storedOrderHistory ? JSON.parse(storedOrderHistory) : []);
  }, []);

  //clear orderdata if anon made orders before logged in
  const clearOrderData = () => {
    sessionStorage.removeItem("orderData");
    setOrderHistory([]);
  };

  //get the total for all bough items in cart
  const customTotal = orderHistory.reduce((acc, order) => acc + order.total, 0);

  const toggleForm = () => {
    setFormVisible((prevVisible) => !prevVisible);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProfileName(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProfileEmail(event.target.value);
  };

  const handleButtonClick = async () => {
    //toggle the form
    toggleForm();
    console.log(profileName)
    console.log(profileEmail)
    
    //post new user to api
    try {
      const response = await fetch('https://airbean-api-xjlcn.ondigitalocean.app/api/user/signup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: profileName,
          password: profileEmail, //server wants password, so temp email here
        }),
      });
      
  
      if (!response.ok) {
        console.error("Failed to update profile on the server");
      } else {
        const responseData = await response.json();
        console.log('Server Response:', responseData);
        setIsSignedIn(true);

        //set values form sessionstorage
        sessionStorage.setItem("profileName", JSON.stringify(profileName));
        sessionStorage.setItem("profileEmail", JSON.stringify(profileEmail));
        sessionStorage.setItem("isSignedIn", JSON.stringify(true));

        clearOrderData()
      }
    } catch (error) {
      console.log(error);
    }
};

  return (
    <section className="profile-wrapper">
      <div className="button-container">
        <NavButton />
      </div>

      <section className="profile-info">
        <img src={profileLogo} className="profile-logo" alt="" />
        <h2 className="profile-name">{profileName}</h2>
        <p className="profile-email">{profileEmail}</p>
        <h2 className="order-history">Orderhistorik</h2>
        <ul>
          {orderHistory.map((order, index) => (
            <li key={index} className="order-history_list">{`#${order.orderNr}   ${order.total} kr`}</li>
          ))}
        </ul>
        <hr className="breakline-profile" />
        <section className="profile_total-wrapper">
          <p>Totalt spenderat</p>  
          <span>{customTotal} kr</span>
        </section>
      </section>

      {!isSignedIn && isFormVisible && (
        <form className="profile-form">
          <img src={logo} alt="" className="form-logo" />
          <h1 className="form-header">Välkommen till AirBean-familjen!</h1>

          <p className="form-desc">Genom att skapa ett konto nedan kan du spara och se din orderhistorik.</p>

          <section className="form-name_wrapper">
            <label htmlFor="name-input" className="form-label">Namn</label>
            <input
              type="text"
              className="name-input inputs"
              value={profileName}
              onChange={handleNameChange}
            />
          </section>

          <section className="form-email_wrapper">
            <label htmlFor="mail-input" className="form-label">Epost</label>
            <input
              type="text"
              className="mail-input inputs"
              value={profileEmail}
              onChange={handleEmailChange}
            />
          </section>

          <section className="checkBox-wrapper">
            <input type="checkbox" className="form_check-box" />
            <p>GDPR ok!</p>
          </section>

          <button className="form_submit-button" onClick={handleButtonClick}>
            Brew me a cup!
          </button>
        </form>
      )}
    </section>
  );
};

export default Profile;