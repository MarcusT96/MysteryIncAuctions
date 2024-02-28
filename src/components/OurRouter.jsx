import { BrowserRouter, Routes, Route } from "react-router-dom"
import ObjectPage from "../pages/ObjectPage.jsx"
import TempNav from "./TempNav.jsx"
import Auctionpage from "../pages/Auctionpage.jsx"
import MyHomePage from "../pages/MyHomePage.jsx"
import AboutUs from "../pages/AboutUs.jsx"
import ContactForm from "../pages/ContactForm.jsx"

function OurRouter() {

  return (
    <BrowserRouter>
      <TempNav />
      <Routes>
        <Route path="/" element={<MyHomePage />}></Route>
        <Route path="/ObjectPage" element={<ObjectPage />}></Route>
        <Route path="/Auctionpage" element={<Auctionpage />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>
        <Route path="/contact" element={<ContactForm />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default OurRouter