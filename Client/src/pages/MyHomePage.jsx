import HomePageSlider from "../components/HomePageSlider.jsx"
import HomePageReviews from "../components/HomePageReviews.jsx"

function MyHomePage() {

  return (
    <div className="homepage-container">
      <HomePageSlider />

      <div className="homepage-desc-and-revs">
        <div className="homepage-description">
          <h2>Mystery Inc.</h2>
          <p>MysteryInc är inte bara skapare av spännande mysterielådor utan fungerar också som en spännande auktionssida. Här kan du delta i budgivningar för olika mystery boxes med olika teman. Varje box är noggrant kuraterad och kan innehålla allt från senaste teknikprylar till exklusiva handplockade upplevelser. Genom att delta i budgivningen får du chansen att vinna en unik skatt full av överraskningar, och det är ett sätt för äventyrsentusiaster att uppleva det oväntade direkt från MysteryInc till din dörr.</p>
        </div>
        <HomePageReviews/>
      </div>

    </div>
  )
}

export default MyHomePage