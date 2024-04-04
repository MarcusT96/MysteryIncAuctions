import { useAuth } from "./admin/AdminComponents/auth/AuthContext";
import { useLocation } from 'react-router-dom';

function Footer() {

  const location = useLocation();

  const { user } = useAuth();
  const shouldBeHidden = location.pathname === '/dashboard' && user && user.isAdmin;
  const hiddenClass = shouldBeHidden ? 'hidden' : '';

  if (location.pathname.startsWith('/dashboard')) {
    return null;
  }

  return (
    <footer className={`nav-footer ${hiddenClass}`}>
      <div className="footer-inc">
        <p className="copy-right-p">© 2024 Mystery Inc. Alla rättigheter förbehålls.</p>
      </div>
      <div className="footer-content">
        <p><a href="/legal/privacy">Integritetspolicy</a></p>
        <p>|</p>
        <p><a href="/legal/privacy/cookies">Använding av cookies</a></p>
        <p>|</p>
        <p><a href="/legal/terms">Användningsvillkor</a></p>
        <p>|</p>
        <p><a href="/salespolicies">Försäljning och återbetalning</a></p>
        <p>|</p>
        <p><a href="/legal">Juridisk information</a></p>
        <p>|</p>
        <p><a href="/sitemap">Sajtkarta</a></p>
      </div>
    </footer>
  );
}

export default Footer;
