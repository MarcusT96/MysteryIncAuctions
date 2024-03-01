import React, { useState } from 'react';
import '../style/login.css';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [showModal, setShowModal] = useState(false); // Ny state för att visa/dölja popup

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Logga in med', email, password);
    // Lägg till logik för att logga in här
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log('Skapa konto med', email, password);
    // Lägg till logik för att skapa konto här
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
