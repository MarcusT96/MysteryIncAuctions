import React, { useState } from 'react';
import '../style/login.css';
import usersData from '../assets/users.json';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    let allUsers = [...usersData, ...JSON.parse(localStorage.getItem('users') || '[]')];
    const user = allUsers.find(user => user.email === email && user.password === password);

    if (user) {
      setIsLoggedIn(true);
      setUserName(user.firstName || '');
      setEmail('');
      setPassword('');
    } else {
      alert('Felaktig e-postadress eller lösenord.');
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(user => user.email === email)) {
      alert('Användaren finns redan.');
    } else {
      users.push({ email, password, firstName, lastName });
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registrering lyckades!');
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setIsLoggingIn(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    if (isLoggedIn) {
      setIsLoggedIn(false);
      setUserName('');
    }
  };

  return (
    <>
      <div className="loginPage">
        <h1>Logga in</h1>
      </div>
      <button className="login-btn" onClick={() => setShowModal(true)}>Logga in / Registrera</button>
      {showModal && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            {isLoggedIn ? (
              <div>
                <h2>Välkommen, {userName}!</h2>
                <button onClick={closeModal}>Stäng</button>
              </div>
            ) : (
              <form onSubmit={isLoggingIn ? handleLogin : handleSignUp}>
                <h2>{isLoggingIn ? 'Logga In' : 'Skapa Konto'}</h2>
                {!isLoggingIn && (
                  <>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Förnamn"
                      required={!isLoggingIn}
                    />
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Efternamn"
                      required={!isLoggingIn}
                    />
                  </>
                )}
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
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LogIn;
