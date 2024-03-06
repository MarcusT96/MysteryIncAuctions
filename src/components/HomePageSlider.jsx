import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

function HomePageSlider() {
  const [boxes, setBoxes] = useState([])
  const navigate = useNavigate()

  // Load boxes
  useEffect(() => {
    async function load() {
      const response = await fetch(`http://localhost:3000/mystery_boxes`)
      const data = await response.json()
      setBoxes(data)
    }
    load()
  }, [])

  // Navigate to auction page
  const navigateToObjectPage = (id) => {
    navigate(`/box/${id}`);
  }

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 1,
    cssEase: "linear",
    arrows: false
  }

  return (
    <div className="homepage-slider">
      <Slider {...settings}>
        {boxes.map((box, index) => (
          <div>
            <div className="homepage-slider-display" key={index}>
              <img src={box.image} onClick={() => navigateToObjectPage(box.id)} style={{ cursor: 'pointer' }} />
              <h2>{box.name}</h2>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default HomePageSlider
