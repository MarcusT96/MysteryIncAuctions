import '../style/AboutUs.css';
import React, { useState } from 'react';

const AboutUs = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 3000);

    setName('');
    setEmail('');
    setMessage('');
  };

  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="about-us-container">
      <h1>Mystery Inc.</h1>
      <section id="about-us">
        <h2>Om Oss</h2>
        <h3>Välkommen till Mystery Inc. - Din ingång till det okända!</h3>
        <p>Mystery Inc. föddes ur en grupp äventyrssökande vänners dröm om att dela sin passion för det okända med världen. Vi skapar unika mysterielådor som är fyllda till brädden med spännande överraskningar. Från de senaste teknikprylarna till handplockade upplevelser, varje låda är en skattjakt i sig. Vårt team, med sina breda intressen och expertis inom olika områden, är dedikerade till att förse dig med det oväntade och otänkbara, direkt till din dörr.</p>
      </section>
      <section id="our-philosophy">
        <h2>Vår Filosofi</h2>
        <h3>Upptäckarglädje i varje låda!</h3>
        <p>Vid Mystery Inc. är varje låda en odyssé. Vår kärnfilosofi kretsar kring den rena spänningen i det okända – enkelheten i överraskning som berikar våra liv. Vi ser varje låda inte bara som en produkt, utan som en biljett till en unik upplevelse. Denna känsla av äventyr och mystik är vad som gör varje paket så speciellt, vare sig det avslöjar de senaste teknikprylarna, sällsynta samlarföremål eller något helt och hållet oväntat.</p>
        <p>Vi är engagerade i att skapa en underhållande och trygg upptäcktsmiljö för alla. Genom att upprätthålla en hög standard på spänning, kvalitet, och värde, strävar vi efter att göra varje öppning av en låda till en oförglömlig upplevelse. Mystery Inc. står för äventyr och upptäckter, där varje låda bär potentialen att vara början på ditt nästa stora äventyr.</p>
      </section>

      <section id="contact">
        <h2>Kontakta Oss</h2>
        <h3>Vi är här för att hjälpa till!</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Namn:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Ditt namn' required />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Din e-mail' required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Meddelande:</label>
            <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Ditt meddelande' rows="5" required></textarea>
          </div>
          <button type="submit">Skicka Meddelande</button>
          {showPopup && (
            <div className="popup-message" aria-live="polite">
              <button className="popup-close-btn" onClick={() => setShowPopup(false)}>&times;</button>
              Tack för att du hör av dig, vi återkommer så snart vi kan.
            </div>
          )}
        </form>
        <ul>
        </ul>
      </section>
    </div>
  );
};

export default AboutUs;
