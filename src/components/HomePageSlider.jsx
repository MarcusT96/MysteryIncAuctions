import { useEffect, useState } from "react"

function HomePageSlider() {
  const [boxes, setBoxes] = useState([])
  const [selectedBoxIndex, setSelectedBoxIndex] = useState(0)

  useEffect(() => {
    async function load() {
      const response = await fetch('Mysteryboxes.json')
      const data = await response.json()
      setBoxes(data.mystery_boxes)
    }
    load()
  }, [])

  const handlePrevButtonClick = () => {
    setSelectedBoxIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : boxes.length - 1))
  }

  const handleNextButtonClick = () => {
    setSelectedBoxIndex((prevIndex) => (prevIndex < boxes.length - 1 ? prevIndex + 1 : 0))
  }

  return (
    <div className="homepage-slider">
      <button className="homepage-slidebutton" onClick={handlePrevButtonClick}>
        ❮
      </button>
      {boxes.map((box, index) => (
        <div className="homepage-slider-display" key={index} style={{ display: index === selectedBoxIndex ? 'flex' : 'none' }} >
          <img src={box.image} />
          <h2>{box.name}</h2>
        </div>))}
      <button className="homepage-slidebutton" onClick={handleNextButtonClick}>
        ❯
      </button>
    </div>
  )
}

export default HomePageSlider
