import '../style/AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1>Mystery Inc.</h1>
      <section id="about-us">
        <h2>Om Oss</h2>
        <h3>Välkommen till Mystery Inc. – Din ingång till det okända!</h3>
        <p>Grundat av ett team med passion för äventyr och skattjakt. Vi erbjuder unika mysterielådor fyllda med överraskningar, från teknikprylar till exklusiva upplevelser.</p>
      </section>
      <section id="our-philosophy">
        <h2>Vår Filosofi</h2>
        <h3>Upptäckarglädje i varje låda</h3>
        <p>Hos Mystery Inc. handlar allt om spänningen i att inte veta vad som väntar. Vår filosofi bygger på enkelheten och glädjen i överraskning. Vi tror att varje bud på en av våra mysterielådor inte bara är ett köp, utan en chans att uppleva något helt unikt. Det är detta ovisshetens element som gör varje låda speciell, oavsett om det döljer sig teknikprylar, samlarföremål eller något helt oväntat inuti.</p>
        <p>Vi strävar efter att skapa en rolig och säker miljö för alla att utforska och bjuda. Genom att hålla spänningen vid liv, men också genom att värna om kvalitet och värde i varje låda, hoppas vi erbjuda en upplevelse som är lika givande som den är oförutsägbar. Mystery Inc. är din plattform för spännande fynd och oväntade upptäckter, där varje bud kan leda till nästa stora äventyr.</p>
      </section>

      <section id="contact">
        <h2>Kontakta Oss</h2>
        <h3>Vi är här för att hjälpa till!</h3>
        <ul>
          <li>E-post: support@mysteryinc.se</li>
          <li>Telefon: 040-555 555 55</li>
          <li>Adress: Mystery Inc., Drakborgen 1, 271 42 Ystad</li>
        </ul>
      </section>
    </div>
  );
};

export default AboutUs;
