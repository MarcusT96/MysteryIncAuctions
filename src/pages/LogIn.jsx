import React, { useState } from 'react';
import '../style/login.css';
import usersData from '../assets/users.json';


const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [showModal, setShowModal] = useState(false); // Ny state för att visa/dölja popup

  const handleLogin = (e) => {
    e.preventDefault();
    const user = usersData.find(user => user.email === email && user.password === password);
    if (user) {
      alert('Inloggning lyckades!');
      // Hantera en lyckad inloggning här
    } else {
      alert('Felaktig e-postadress eller lösenord.');
      // Hantera fel inloggning
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(user => user.email === email)) {
      alert('Användaren finns redan.');
    } else {
      users.push({ email, password });
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registrering lyckades!');
      // Hantera lyckad registrering
    }
  };


  return (
    <>
      <div className="loginPage">
        <h1>Logga in</h1>
      </div>
      <button className="login-btn" onClick={() => setShowModal(true)}>Logga in</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <form onSubmit={isLoggingIn ? handleLogin : handleSignUp}>
              <h2>{isLoggingIn ? 'Logga In' : 'Skapa Konto'}</h2>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-postadress"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Lösenord"
                required
              />
              <button type="submit">{isLoggingIn ? 'Logga In' : 'Skapa Konto'}</button>
              <button type="button" onClick={() => setIsLoggingIn(!isLoggingIn)}>
                {isLoggingIn ? 'Skapa ett konto' : 'Har redan ett konto? Logga in'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LogIn;
