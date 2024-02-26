import HomePageSlider from "../components/HomePageSlider.jsx"

function MyHomePage() {

  return (
    <div className="homepage-container">
      <HomePageSlider />

      <div className="homepage-desc-and-revs">
        <div className="homepage-description">
          <h1>Mystery Inc.</h1>
          <p>MysteryInc är en auktionssida där du budar på mystery boxes med olika teman!</p>
        </div>
        <div className="homepage-reviews">
          <div className="homepage-reviews-title-score">
            <h1 className="homepage-reviews-title">Väldigt najs!!</h1>
            <h1 className="homepage-reviews-score">★★★★☆</h1>
          </div>
          <p>Budade på en djurlåda, och fick en hel häst!</p>
        </div>
      </div>

    </div>
  )
}

export default MyHomePage