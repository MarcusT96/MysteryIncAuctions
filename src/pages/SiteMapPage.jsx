import React from 'react';
import '../style/sitemap.css';

function SiteMapPage() {
    return (<>
        <div className="sitemap-container">
            <h1 className='sitemap-title'>Mystery Inc. sajtkarta</h1>
            <section className='sitemap-sections'>
                <section className='inner-sitemap-sections'>
                    <ul className='class-list'>
                        <li className='class-list-list'>
                            <h3 className='site-inner-title'>Om Mystery Inc.</h3>
                            <a href="/about">Om Oss</a>
                            <a href="/contact">Kontakta Oss</a>
                            <a href="/legal/privacy">Integritetspolicy</a>
                            <a href="/legal/privacy/cookies">Användning av cookies</a>
                            <a href="/legal/terms">Användningsvillkor</a>
                            <a href="/salespolicies">Försäljning och återbetalning</a>
                            <a href="/legal">Juridisk information</a>
                            <a href="/sitemap">Sajtkarta</a>
                        </li>
                    </ul>
                </section>
                <section className='inner-sitemap-sections'>
                    <ul className='class-list'>
                        <li className='class-list-list'>
                            <h3 className='site-inner-title'>Handla</h3>
                            <a href="/Auctionpage">Auktioner</a>
                        </li>
                    </ul>
                </section>
                <section className='inner-sitemap-sections'>
                    <ul className='class-list'>
                        <li className='class-list-list'>
                            <h3 className='site-inner-title'>Konto</h3>
                            <a href="/login">Hantera ditt konto</a>
                        </li>
                    </ul>
                </section>
            </section>
        </div>
    </>);
}

export default SiteMapPage