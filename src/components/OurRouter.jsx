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
import Orders from "../admin/AdminComponents/Orders/Orders.jsx"


function OurRouter() {

  return (<>
    <Navbar />
    <Routes>
      <Route path="/" element={<MyHomePage />}></Route>
      <Route path="/box/:id" element={<ObjectPage />}></Route>
      <Route path="/Auctionpage" element={<Auctionpage />}></Route>
      <Route path="/about" element={<AboutUs />}></Route>
      <Route path="/contact" element={<ContactForm />}></Route>
      <Route path="/legal" element={<LegalPage />}></Route>
      <Route path="/salespolicies" element={<SalesPoliciesPage />}></Route>
      <Route path="/legal/terms" element={<TermsPage />}></Route>
      <Route path="/legal/privacy/cookies" element={<PrivacyPage />}></Route>
      <Route path="/legal/privacy" element={<IntegrityPage />}></Route>
      <Route path="/sitemap" element={<SiteMapPage />}></Route>
      <Route path="/login" element={<LogIn />}></Route>
      <Route path="/profile" element={<ProfilePage />}></Route>

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