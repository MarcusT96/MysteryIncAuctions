import { BrowserRouter, Routes, Route } from "react-router-dom"
import TempHome from "../pages/TempHome.jsx"
import ObjectPage from "../pages/ObjectPage.jsx"
import TempNav from "./TempNav.jsx"

function OurRouter() {

  return (
    <BrowserRouter>
      <TempNav />
      <Routes>
        <Route path="/" element={<TempHome />}></Route>
        <Route path="/ObjectPage" element={<ObjectPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default OurRouter