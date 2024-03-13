import { useState } from "react";
import '../style/ContactForm.css';

function ContactForm() {
  
  // Sätter upp lite state här så vi kan hålla koll på vad användaren skriver in
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  // När formuläret skickas, visa en liten popup och rensa sedan allt
  const handleSubmit = (event) => {
    event.preventDefault(); // Stoppa sidan från att ladda om
    setShowPopup(true); // Tada! Popup!

    // Göm popupen efter 3 sekunder
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);

    // Rensar allt så formuläret blir tomt
    setName('');
    setEmail('');
    setMessage('');
  };

  // Och här ritar vi ut själva formuläret.
  return (
    <div className="contact-container">
      <section id="contact">
        <h2>Kontakta Oss</h2>
        <h3>Vi är här för att hjälpa till!</h3>
        <form onSubmit={handleSubmit}>
          {/* Varje input-fält har sin egen plats, inklusive labels för tillgänglighet */}
          <div className="form-group">
            <label htmlFor="name">Namn:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ditt namn" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Din e-mail" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Meddelande:</label>
            <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ditt meddelande" rows="5" required></textarea>
          </div>
          <button type="submit">Skicka Meddelande</button>
          {showPopup && (
            // Popup som bekräftar att meddelandet har skickats
            <div className="popup-message" aria-live="polite">
              <button className="popup-close-btn" onClick={() => setShowPopup(false)}>&times;</button>
              Tack för att du hör av dig, vi återkommer så snart vi kan.
            </div>
          )}
        </form>
      </section>
    </div>
  );
}

export default ContactForm;
