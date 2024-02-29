import React from 'react';
import '../style/privacy.css';

function Privacy() {
    return (<>
        <div className="privacy-container">
            <h1 className='privacy-title'>Mystery Inc. användning av cookies</h1>
            <section className='privacy-sections'>
                <p className='privacy-p'>
                    Mystery Inc Auctions webbplats och webbtjänster kan använda cookies. Cookies möjliggör funktioner som kundvagnar, anpassar vår webbplats baserat på besökarnas aktiviteter, låter oss se vilka sidor på webbplatsen som besökarna använder, mäter effektiviteten av våra annonser och sökmotorer, samt ger oss insikt i användarnas vanor för att vi ska kunna förbättra vår kommunikation och våra produkter.
                    <br /><br />
                    Om du vill inaktivera cookies i webbläsaren, beror processen på vilken webbläsare du använder. För de flesta webbläsare kan du gå till Inställningar eller Preferenser, söka efter integritetsinställningarna och därifrån välja att blockera eller begränsa cookies. Detaljerna varierar beroende på webbläsare, så vi rekommenderar att du konsulterar hjälpavsnittet eller supporten för din specifika webbläsare för exakta instruktioner.
                    <br /><br />
                    Det är viktigt att notera att om du väljer att inaktivera cookies, kan det påverka din förmåga att fullt ut använda alla funktioner på vår webbplats. Vissa delar av webbplatsen kan bli mindre användarvänliga eller inte fungera som de ska utan hjälp av cookies.
                    <br /><br />
                    De cookies vi använder på våra webbplatser har kategoriserats i enlighet med riktlinjerna från LEK och GDPR i Sverige. Vi använder följande kategorier av cookies på våra webbplatser och i andra webbtjänster:
                </p>
                <br />
                <h3 className='privacy-headliners'>Kategori 1: nödvändiga cookies</h3>
                <p className='privacy-p'>
                    Dessa cookies är nödvändiga för att du ska kunna navigera på Mystery Inc Auctions webbplatser och använda alla funktioner. Utan dessa cookies kan tjänster som kundvagnar och e-fakturor inte användas.</p>
                <br />
                <h3 className='privacy-headliners'>Kategori 2: prestandacookies</h3>
                <p className='privacy-p'>
                    Dessa cookies samlar in information om hur du använder Mystery Inc Auctions webbplatser, exempelvis vilka sidor som besöks mest frekvent. Denna information används för att förbättra webbplatserna och förenkla navigeringen. De hjälper även till att informera våra samarbetspartners om du kommit till någon av våra webbplatser via en samarbetslänk, och om du har köpt en produkt eller tjänst under ditt besök, samt i så fall vilken produkt eller tjänst det gäller. Dessa cookies samlar inte in personlig information. All information som samlas in är anonym och aggregerad.</p>
                <br />
                <h3 className='privacy-headliners'>Kategori 3: funktionscookies</h3>
                <p className='privacy-p'>
                    Dessa cookies möjliggör för Mystery Inc Auctions webbplatser att komma ihåg olika val du gör under ditt besök. Exempelvis kan vi spara din geografiska plats i en cookie för att automatiskt dirigeras till den lokala versionen av webbplatsen för ditt område. Vi kan även spara inställningar för textstorlek, typsnitt och andra anpassningsbara webbplatselement. Dessa cookies används också för att hålla reda på vilka produkter eller videor du har tittat på tidigare för att undvika repetition av samma innehåll. Information lagrad i dessa cookies kan inte användas för att personligt identifiera dig eller för att följa dina surfvanor på andra webbplatser än Mystery Inc Auctions.</p>
            </section>
        </div>
    </>);
}

export default Privacy;
