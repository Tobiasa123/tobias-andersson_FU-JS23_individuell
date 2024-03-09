
import NavButton from "../components/NavButton"
import '../abstracts/profile.scss'
import { ChangeEvent, useState } from "react";
import logo from '../assets/formlogo.svg'
import profileLogo from '../assets/profile.svg'

const Profile = () => {
  const [isFormVisible, setFormVisible] = useState(true);
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");

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
        <h2 className="profile-name">{profileName} temp name</h2>
        <p className="profile-email">{profileEmail} temp email</p>
        <h2 className="order-history">Orderhistorik</h2>
        <hr className="breakline-profile" />
        <section className="profile_total-wrapper">
          <p>Totalt spenderat</p>  
          <span>x kr</span>
        </section>
      </section>

      {isFormVisible && (
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