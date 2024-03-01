import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function HomePageSlider() {
  const [boxes, setBoxes] = useState([])
  const [selectedBoxIndex, setSelectedBoxIndex] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    async function load() {
      const response = await fetch('Mysteryboxes.json')
      const data = await response.json()
      setBoxes(data.mystery_boxes)
    }
    load()
  }, [])

  useEffect(() => {
    const autoPlayInterval = setInterval(handleNextButtonClick, 1000)
    return () => {
      clearInterval(autoPlayInterval)
    }
  }, [])

  const navigateToObjectPage = (id) => {
    navigate(`/box/${id}`);
  }

  const handlePrevButtonClick = () => {
    setSelectedBoxIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : boxes.length - 1))
  }

  const handleNextButtonClick = () => {
    setSelectedBoxIndex((prevIndex) => (prevIndex < boxes.length - 1 ? prevIndex + 1 : 0))
  }

  const getDisplayedBoxes = () => {
    const endIndex = selectedBoxIndex + 3
    const slicedBoxes = boxes.slice(selectedBoxIndex, endIndex + 1)

    if (slicedBoxes.length < 4) {
      const remainingBoxes = 4 - slicedBoxes.length
      return slicedBoxes.concat(boxes.slice(0, remainingBoxes))
    }

    return slicedBoxes
  }

  return (
    <div className="homepage-slider">
      <button className="homepage-slidebutton" onClick={handlePrevButtonClick}>
        ❮
      </button>
      {getDisplayedBoxes().map((box, index) => (
        <div className="homepage-slider-display" key={index}>
          <img src={box.image} onClick={() => navigateToObjectPage(box.id)} style={{ cursor: 'pointer' }} />
          <h2>{box.name}</h2>
        </div>
      ))}
      <button className="homepage-slidebutton" onClick={handleNextButtonClick}>
        ❯
      </button>
    </div>
  )
}

export default HomePageSlider
