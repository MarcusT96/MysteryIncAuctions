import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/login.css'; // Se till att sökvägen till din CSS-fil är korrekt

const LogIn = ({ closeModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile');
      closeModal();
    }
  }, [isLoggedIn, navigate, closeModal]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/users');
      const users = await response.json();
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUserId', user.id);
        closeModal();
        window.location.reload();
      } else {
        setLoginError('Felaktig e-postadress eller lösenord.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Ett problem uppstod vid försök att logga in.');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/users');
      const users = await response.json();
      const userExists = users.some(user => user.email === email);

      if (userExists) {
        setLoginError("E-postadressen är redan registrerad.");
        return;
      }

      const newUser = { email, password, firstName, lastName };
      const postResponse = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!postResponse.ok) throw new Error('Något gick fel vid skapandet av användaren.');

      const createdUser = await postResponse.json();
      localStorage.setItem('currentUserId', createdUser.id);
      setIsLoggedIn(true);
      setLoginError('');
    } catch (error) {
      console.error('Fel vid registrering:', error);
      setLoginError('Ett problem uppstod vid försök att registrera användaren.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUserId');
    setIsLoggedIn(false);
    closeModal();
  };

  return (
    <div className="modal" onClick={closeModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <span className="close" onClick={closeModal}>&times;</span>
        {isLoggedIn ? (
          <button className="profile-btn" onClick={handleLogout}>Logga ut</button>
        ) : (
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
  );
};

export default LogIn;
