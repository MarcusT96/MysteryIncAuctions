import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/profilePage.css';
import userData from '../assets/users.json'

function ProfilePage() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
  });

  const [activeSection, setActiveSection] = useState('profile');
  const navigate = useNavigate();

  useEffect(() => {
    // Antag att vi bara använder den första användaren från vår JSON-fil
    const user = userData[0];
    setUserInfo({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "emailNotifications" || name === "shareDataWithThirdParties" ? e.target.checked : value;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated user info:', userInfo);
    // Här skulle du lägga till logik för att spara uppdateringen till din JSON-fil eller en backend server.
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Tar bort inloggningstillståndet
    navigate('/'); // Ändra till önskad utloggningssida
  };

  return (
    <div className="profile-page-container">
      <button onClick={() => setActiveSection('profile')} className={`profile-page-button ${activeSection === 'profile' ? 'active' : ''}`}>Mina Uppgifter</button>
      <button onClick={() => setActiveSection('payment')} className={`profile-page-button ${activeSection === 'payment' ? 'active' : ''}`}>Betalningssätt</button>
      <button onClick={() => setActiveSection('reviews')} className={`profile-page-button ${activeSection === 'reviews' ? 'active' : ''}`}>Omdömen</button>

      {activeSection === 'profile' && (
        <form onSubmit={handleSubmit} className="profile-page-form">
          <h2>Ändra Mina Uppgifter</h2>
          <div className="profile-page-form-group">
            <label>E-post</label>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleInputChange}
              placeholder="Din email"
            />
          </div>
          <div className="profile-page-form-group">
            <label>Lösenord</label>
            <input
              type="password"
              name="password"
              value={userInfo.email}
              onChange={handleInputChange}
              placeholder="Ditt lösenord"
            />
          </div>
          <div className="profile-page-form-group">
            <label>Förnamn</label>
            <input
              type="text"
              name="firstName"
              value={userInfo.firstName}
              onChange={handleInputChange}
              placeholder="Ditt förnamn"
            />
          </div>
          <div className="profile-page-form-group">
            <label>Efternamn</label>
            <input
              type="text"
              name="lastName"
              value={userInfo.lastName}
              onChange={handleInputChange}
              placeholder="Ditt efternamn"
            />
          </div>
          <div className="profile-page-form-group">
            <label>Adress</label>
            <input
              type="text"
              name="address"
              value={userInfo.address}
              onChange={handleInputChange}
              placeholder="Din adress"
            />
          </div>
          <div className="profile-page-form-group">
            <label>Stad</label>
            <input
              type="text"
              name="city"
              value={userInfo.city}
              onChange={handleInputChange}
              placeholder="Din stad"
            />
          </div>
          <div className="profile-page-form-group">
            <label>Postnummer</label>
            <input
              type="text"
              name="zipCode"
              value={userInfo.zipCode}
              onChange={handleInputChange}
              placeholder="Ditt postnummer"
            />
          </div>
          <div className="profile-page-form-group">
            <label>Telefonnummer</label>
            <input
              type="text"
              name="phone"
              value={userInfo.phone}
              onChange={handleInputChange}
              placeholder="Ditt telefonnummer"
            />
          </div>
          <button type="submit" className="profile-page-button">Spara Ändringar</button>
        </form>
      )}

      {activeSection === 'payment' && (
        <div>
          <h2>Betalningsalternativ</h2>
          <p>Här kan du hantera dina betalningsalternativ.</p>
          {/* Framtida funktionalitet för betalningshantering */}
        </div>
      )}

      {activeSection === 'reviews' && (
        <div>
          <h2>Omdömen</h2>
          <p>Här kan du se och hantera dina omdömen.</p>
          {/* Framtida funktionalitet för omdömehantering */}
        </div>
      )}
      <button onClick={handleLogout} className="profile-page-button logout-button">Logga ut</button>
    </div>
  );
}

export default ProfilePage;