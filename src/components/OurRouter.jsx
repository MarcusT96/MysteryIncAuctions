import { BrowserRouter, Routes, Route } from "react-router-dom"
import ObjectPage from "../pages/ObjectPage.jsx"
import TempNav from "./TempNav.jsx"
import MyHomePage from "../pages/MyHomePage.jsx"

function OurRouter() {

  return (
    <BrowserRouter>
      <TempNav />
      <Routes>
        <Route path="/" element={<MyHomePage />}></Route>
        <Route path="/ObjectPage" element={<ObjectPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default OurRouter