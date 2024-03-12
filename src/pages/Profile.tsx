
import NavButton from "../components/NavButton"
import '../abstracts/profile.scss'
import { ChangeEvent, useState, useEffect } from "react";
import logo from '../assets/formlogo.svg'
import profileLogo from '../assets/profile.svg'
interface OrderData {
  orderNr: string;
  total: number;
  date: string;
}

const Profile = () => {

  const [orderHistory, setOrderHistory] = useState<OrderData[]>([]);

  const [isFormVisible, setFormVisible] = useState(true);
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  //check if gdpr is checked else show pupup message
  const [isGDPRChecked, setIsGDPRChecked] = useState(false);
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

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsGDPRChecked(event.target.checked);
  };

  const handleButtonClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isGDPRChecked) {
      alert("Please accept GDPR to continue");
      return;
    }
 
    console.log(profileName)
    console.log(profileEmail)

  
    
    //post new user to api
    try {
      //signup
      const signupResponse = await fetch(
        'https://airbean-api-xjlcn.ondigitalocean.app/api/user/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: profileName,
            password: 'password', //default password
          }),
        }
      );
  
      if (!signupResponse.ok) {
        console.error('Failed to sign up');
        return;
      }
  
      //if signup successful, log in aswell
      const loginResponse = await fetch(
        'https://airbean-api-xjlcn.ondigitalocean.app/api/user/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: profileName,
            password: 'password',
          }),
        }
      );
  
      const signupData = await signupResponse.json();
      if (!signupData.success) {
        console.log(signupData)
        alert('Failed to sign up');
      return;
      }
      const loginData = await loginResponse.json();
      if (!loginData.success) {
        console.log(loginData)
      alert('Failed to log in');

      return;
    }
  
    //if both checks are sucessful
      if (signupData.success && loginData.success) {

        console.log('Login Response:', loginData);
      
        setIsSignedIn(true);
      
        // Spara nödvändig data och token i sessionStorage
        sessionStorage.setItem('profileName', JSON.stringify(profileName));
        sessionStorage.setItem('profileEmail', JSON.stringify(profileEmail));
        sessionStorage.setItem('isSignedIn', JSON.stringify(true));
        sessionStorage.setItem('token', JSON.stringify(loginData.token));
      
        clearOrderData();
      
        toggleForm();
      } else {

        console.error('Signup or login failed');
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
        <ul className="order-history_list">
          {orderHistory.map((order, index) => (
            <li key={index} className="order-history_item">

              <p className="order-history_above">#{order.orderNr} <span className="order-history_date">{order.date}</span></p>
              <p className="order-history_below">total ordersumma <span className="order-history_total">{order.total}kr</span></p>
              <hr className={`breakline-profile ${index === orderHistory.length - 1 ? 'last-order' : ''}`} />
              
            </li>
          ))}
        </ul>
        <hr className="breakline-profile_total" />
        <section className="profile_total-wrapper">
          <p>Totalt spenderat</p>  
          <span>{customTotal} kr</span>
        </section>
      </section>

      {!isSignedIn && isFormVisible && (
        <form className="profile-form" onSubmit={handleButtonClick}>

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
              required
            />
          </section>

          <section className="form-email_wrapper">
            <label htmlFor="mail-input" className="form-label">Epost</label>
            <input
              type="email"
              className="mail-input inputs"
              value={profileEmail}
              onChange={handleEmailChange}
              required
            />
          </section>

          <section className="checkBox-wrapper">
            <label>
             <input type="checkbox"
                  className="form_check-box"
                  checked={isGDPRChecked}
                  onChange={handleCheckboxChange}
              />
              <p>GDPR Ok!</p>
             </label>
          </section>

          <button className="form_submit-button"  type="submit">
            Brew me a cup!
          </button>
        </form>
      )}
    </section>
  );
};

export default Profile;