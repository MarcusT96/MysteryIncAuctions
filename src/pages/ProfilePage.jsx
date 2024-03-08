import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/profilePage.css';
import { useAuth } from '../admin/AdminComponents/auth/AuthContext';
import EditProfile from '../components/EditProfile';
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
  const { user, setUser } = useAuth();

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
        {user && user.isAdmin && (
          <button onClick={() => navigate('/dashboard')} className="profile-page-button">Admin Panel</button>
        )}
        <button onClick={handleLogout} className="profile-page-button logout-button">Logga ut</button>
      </div>
      <div className='content'>
        {activeSection === 'profile' && (
          <div>
            <EditProfile
              userInfo={userInfo}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          </div>
        )}
        {activeSection === 'payment' && (
          <div>
            <PaymentOptions />
          </div>
        )}

        {activeSection === 'reviews' && (
          <div>
            <Reviews />
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