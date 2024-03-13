import { useState, useEffect } from 'react';
import '../style/login.css';
// Hämtar in vår auth-kontext för att hantera inloggning
import { useAuth } from '../admin/AdminComponents/auth/AuthContext';

// Komponenten LogIn, med en closeModal-prop för att stänga modalfönstret när vi är klara.
const LogIn = ({ closeModal }) => {
  // State-variabler för att hantera användarinput, och lite tillstånd som om vi loggar in och felmeddelanden.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [loginError, setLoginError] = useState('');

  // Använder vår auth-kontext för att hantera inloggning
  const { login } = useAuth();

  // Hanterar inloggningsförsök
  const handleLogin = async (e) => {
    e.preventDefault(); // Stoppa formuläret från att skickas traditionellt.
    try {
      // Kontrollerar om användaren finns i vår 'databas' (här simulerad med fetch mot en lokal fil).
      const response = await fetch('/api/users');
      const users = await response.json();
      const user = users.find(u => u.email === email && u.password === password);

      // Om användaren finns, logga in och uppdatera localStorage, annars visa felmeddelande.
      if (user) {
        login({ id: user.id, isAdmin: user.isAdmin });
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUserId', user.id);
        localStorage.setItem('isAdmin', user.isAdmin ? 'true' : 'false');
        closeModal && closeModal(); // Stäng modalfönstret om funktionen finns
        window.location.reload(); // Ladda om sidan för att uppdatera användarstatus.
      } else {
        setLoginError('Incorrect email or password.'); // Felmeddelande vid misslyckad inloggning.
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('An error occurred while trying to log in.'); // Felhantering
    }
  };

  // Hanterar skapande av nya konton
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Kontrollerar först om användaren redan finns.
      const response = await fetch('/api/users');
      const users = await response.json();
      const userExists = users.some(user => user.email === email);

      if (userExists) {
        setLoginError("E-postadressen är redan registrerad.");
        return; // Avbryter om e-posten redan finns.
      }

      // Skapar en ny användare om e-posten inte finns sedan tidigare.
      const newUser = { email, password, firstName, lastName };
      const postResponse = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      // Hanterar respons från servern efter att ha försökt skapa en ny användare.
      if (postResponse.ok) {
        const createdUser = await postResponse.json();
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUserId', createdUser.id);
        window.location.reload(); // Ladda om sidan för att reflektera den nya användarstatusen.
      } else {
        throw new Error('Något gick fel vid skapandet av användaren.');
      }
    } catch (error) {
      console.error('Fel vid registrering:', error);
      setLoginError('Ett problem uppstod vid försök att registrera användaren.');
    }
  };

  // Enkel utloggning som rensar localStorage och laddar om sidan.
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUserId');
    closeModal && closeModal();
    window.location.reload();
  };

  return (
    // Denna modal dyker upp för antingen inloggning eller registrering, beroende på användarens val.
    <div className="modal" onClick={closeModal}>
      {/* Modal-innehållet. stopPropagation förhindrar att klick på modalen stänger den. */}
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* Klickbar 'stäng'-knapp för att stänga modalen. */}
        <span className="close" onClick={closeModal}>&times;</span>
        {/* Visar olika UI beroende på om användaren är inloggad eller inte. */}
        {localStorage.getItem('isLoggedIn') === 'true' ? (
          // Om användaren är inloggad, visa en utloggningsknapp.
          <button className="profile-btn" onClick={handleLogout}>Logga ut</button>
        ) : (
            // Om användaren inte är inloggad, visa formuläret för inloggning eller registrering.
            <>
              {/* Om det finns något felmeddelande, visa det för användaren. */}
              {loginError && <p className="login-error">{loginError}</p>}
              {/* Formuläret ändrar funktion beroende på om användaren vill logga in eller skapa ett konto. */}
            <form onSubmit={isLoggingIn ? handleLogin : handleSignUp}>
                <h2>{isLoggingIn ? 'Logga In' : 'Skapa Konto'}</h2>
                {/* Om användaren väljer att skapa ett konto, visa extra input-fält för namn. */}
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
                {/* Knapp för att växla mellan inloggnings- och registreringsvy. */}
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
