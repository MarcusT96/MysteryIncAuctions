import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/profilePage.css';
import { useAuth } from '../admin/AdminComponents/auth/AuthContext';
import OrderHistory from '../components/orderHistory.jsx';
import PaymentOptions from '../components/PaymentOptions.jsx';
import Reviews from '../components/Reviews.jsx';



function ProfilePage() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    phone: ''
  });

  const [activeSection, setActiveSection] = useState('profile');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('currentUserId');
      const isAdmin = localStorage.getItem('isAdmin') === 'true';
      if (userId) {
        try {
          const response = await fetch(`http://localhost:3000/users/${userId}`);
          const userData = await response.json();
          setUserInfo(userData);
          setUser({ id: userId, isAdmin });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "emailNotifications" || name === "shareDataWithThirdParties" ? e.target.checked : value;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('currentUserId');

    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo)
      });

      if (!response.ok) throw new Error('Något gick fel vid uppdatering av användaruppgifter.');

      const updatedUser = await response.json();
      console.log('Uppdaterad användarinfo:', updatedUser);
      alert('Dina uppgifter har uppdaterats!');

    } catch (error) {
      console.error('Fel vid uppdatering av användaruppgifter:', error);
      alert('Det gick inte att uppdatera dina uppgifter. Försök igen.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUserId');
    window.location.href = '/';
  };

  return (
    <div className="profile-page-container">
      <div className='sidebar'>
      <button onClick={() => setActiveSection('profile')} className={`profile-page-button ${activeSection === 'profile' ? 'active' : ''}`}>Mina Uppgifter</button>
      <button onClick={() => setActiveSection('payment')} className={`profile-page-button ${activeSection === 'payment' ? 'active' : ''}`}>Betalningssätt</button>
      <button onClick={() => setActiveSection('reviews')} className={`profile-page-button ${activeSection === 'reviews' ? 'active' : ''}`}>Omdömen</button>
      <button onClick={() => setActiveSection('orderhistory')} className={`profile-page-button ${activeSection === 'orderhistory' ? 'active' : ''}`}>Beställningar</button>
      <button onClick={handleLogout} className="profile-page-button logout-button">Logga ut</button>

      {user && user.isAdmin && (
        <button onClick={() => navigate('/dashboard')} className="profile-page-button">Admin Panel</button>
      )}
      </div>
      <div className='content'>
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
              type="text"
              name="password"
              value={userInfo.password}
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
          <PaymentOptions/>
        </div>
      )}

      {activeSection === 'reviews' && (
        <div>
          <Reviews/>
        </div>
      )}
      {activeSection === 'orderhistory' && (
        <div>
          <OrderHistory />
        </div>
      )}
      </div>
      </div>
  );
}

export default ProfilePage;