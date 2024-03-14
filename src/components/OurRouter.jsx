import { BrowserRouter, Routes, Route } from "react-router-dom"
import ObjectPage from "../pages/ObjectPage.jsx"
import Auctionpage from "../pages/Auctionpage.jsx"
import MyHomePage from "../pages/MyHomePage.jsx"
import AboutUs from "../pages/AboutUs.jsx"
import ContactForm from "../pages/ContactForm.jsx"
import LegalPage from "../pages/LegalPage.jsx"
import SalesPoliciesPage from "../pages/SalesPoliciesPage.jsx"
import TermsPage from "../pages/TermsPage.jsx"
import PrivacyPage from "../pages/PrivacyPage.jsx"
import IntegrityPage from "../pages/IntegrityPage.jsx"
import SiteMapPage from "../pages/SiteMapPage.jsx"
import LogIn from "../pages/LogIn.jsx"
import Navbar from "../Navbar.jsx"
import Footer from "../Footer.jsx"
import ProfilePage from "../pages/ProfilePage.jsx"
import Sidebar from "../admin/AdminComponents/Sidebar.jsx"
import ProtectedRoute from "../admin/AdminComponents/auth/ProtectedRoute.jsx"
import Users from "../admin/AdminComponents/users/Users.jsx"
import DashboardLayout from "../admin/AdminComponents/DashboardLayout/DashboardLayout.jsx"
import ProductsPanel from "../admin/AdminComponents/products/ProductsPanel.jsx"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import NonAdminLayout from "./NonAdminLayout.jsx"
import Orders from "../admin/AdminComponents/Orders/Orders.jsx"


function OurRouter() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
    });

  }, []);
  //Wrappar alla element manuellt med NonAdminLayout så de fadear in men inte adminsidan som är mer en dashboard och kraschar av AOS. 
  return (<>
    <Navbar />
    <Routes>

      <Route path="/" element={<NonAdminLayout><MyHomePage /></NonAdminLayout>} />
      <Route path="/box/:id" element={<NonAdminLayout><ObjectPage /></NonAdminLayout>} />
      <Route path="/auctions" element={<NonAdminLayout><Auctionpage /></NonAdminLayout>} />
      <Route path="/about" element={<NonAdminLayout><AboutUs /></NonAdminLayout>} />
      <Route path="/contact" element={<NonAdminLayout><ContactForm /></NonAdminLayout>} />
      <Route path="/legal" element={<NonAdminLayout><LegalPage /></NonAdminLayout>} />
      <Route path="/salespolicies" element={<NonAdminLayout><SalesPoliciesPage /></NonAdminLayout>} />
      <Route path="/legal/terms" element={<NonAdminLayout><TermsPage /></NonAdminLayout>} />
      <Route path="/legal/privacy/cookies" element={<NonAdminLayout><PrivacyPage /></NonAdminLayout>} />
      <Route path="/legal/privacy" element={<NonAdminLayout><IntegrityPage /></NonAdminLayout>} />
      <Route path="/sitemap" element={<NonAdminLayout><SiteMapPage /></NonAdminLayout>} />
      <Route path="/login" element={<NonAdminLayout><LogIn /></NonAdminLayout>} />
      <Route path="/profile" element={<NonAdminLayout><ProfilePage /></NonAdminLayout>} />


      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>}>
        <Route path="/dashboard/users" element={<Users />} />
        <Route path="/dashboard/products" element={<ProductsPanel />} />
        <Route path="/dashboard/orders" element={<Orders />} />
      </Route>
    </Routes>
    <Footer />
  </>
  );
}

export default OurRouter