import React, { useState, useEffect } from 'react';
import '../style/profilePage.css';
import userData from '../assets/users.json'

function ProfilePage() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
  });
  const [activeSection, setActiveSection] = useState('profile'); // Lägg till detta om du vill ha en sektionsväxlare

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

  return (
    <div className="profile-page-container">
      {/* Navigationsknappar och visning baserat på activeSection */}

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
            />
          </div>
          <div className="profile-page-form-group">
            <label>Förnamn</label>
            <input
              type="text"
              name="firstName"
              value={userInfo.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="profile-page-form-group">
            <label>Efternamn</label>
            <input
              type="text"
              name="lastName"
              value={userInfo.lastName}
              onChange={handleInputChange}
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
    </div>
  );
}

export default ProfilePage;