import { useState, useEffect } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

function HomePageReviews() {

  const [reviews, setReviews] = useState([])

  useEffect(() => {
    async function load() {
      const response = await fetch('../../db.json')
      const data = await response.json()
      setReviews(data.reviews)
    }
    load()
  }, [])

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true
  };

  return (
    <div className="homepage-reviews-container">
      {reviews.length > 0 ? (
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <div className="homepage-reviews" key={index}>
              <div className="homepage-reviews-title-score">
                <h2 className="homepage-reviews-title">{review.title}</h2>
                <h2 className="homepage-reviews-score">★★★★☆</h2>
              </div>
              <p>{review.description}</p>
            </div>
          ))}
        </Slider>
      ) : (
        <p>Loading reviews...</p>
      )}
    </div>
  )
}

export default HomePageReviews


