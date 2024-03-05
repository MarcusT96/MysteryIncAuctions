import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/login.css';
import usersData from '../assets/users.json';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [loginError, setLoginError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile');
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const allUsers = [...usersData, ...JSON.parse(localStorage.getItem('users') || '[]')];
    const user = allUsers.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      setShowModal(false);
      setLoginError('');
      navigate('/profile');
    } else {
      setIsLoggedIn(false);
      setLoginError('Felaktig e-postadress eller lösenord.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(user => user.email === email)) {
      setLoginError("E-postadressen är redan registrerad.");
    } else {
      users.push({ email, password, firstName, lastName });
      localStorage.setItem('users', JSON.stringify(users));
      setIsRegistered(true);
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      navigate('/profile');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setLoginError('');
  };

  return (
    <>
      {isLoggedIn ? (
        <button className="profile-btn" onClick={handleLogout}>Logga ut</button>
      ) : (
        <button className="login-btn" onClick={() => setShowModal(true)}>Logga in / Registrera</button>
      )}
      {showModal && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            {!isLoggedIn && (
              <>
                {loginError && <p className="login-error">{loginError}</p>}
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
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LogIn;