import { useEffect, useState } from "react"

function HomePageSlider() {

  const [boxes, setBoxes] = useState([])

  useEffect(() => {
    import('../assets/boxes.json')
      .then((data) => setBoxes(data.default))
      .catch((error) => console.error("Error loading box data: ", error))
  }, [])

  return (
    <div className="homepage-slider">
      {boxes.map((box) => (
        <img src={box.img} />
      ))}
    </div>
  )
}

export default HomePageSlider