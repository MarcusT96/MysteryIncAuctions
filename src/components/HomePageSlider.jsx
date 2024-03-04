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
      const response = await fetch('Mysteryboxes.json')
      const data = await response.json()
      setBoxes(data.mystery_boxes)
    }
    load()
  }, [])

  // Navigate to auction page
  const navigateToObjectPage = (id) => {
    navigate(`/box/${id}`);
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  return (
    <div className="homepage-slider">
      <Slider {...settings}>
        {boxes.map((box, index) => (
          <div className="homepage-slider-display" key={index}>
            <img src={box.image} onClick={() => navigateToObjectPage(box.id)} style={{ cursor: 'pointer' }} />
            <h2>{box.name}</h2>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default HomePageSlider
