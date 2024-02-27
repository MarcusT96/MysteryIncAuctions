import { useEffect, useState } from "react"

function HomePageSlider() {

  const [boxes, setBoxes] = useState([])
  const [filteredBox, setFilteredBox] = useState()

  useEffect(() => {
    import('../assets/boxes.json')
      .then((data) => setBoxes(data.default))
      .catch((error) => console.error("Error loading box data: ", error))
  }, [])

  return (
    <div className="homepage-slider">
      <button class="homepage-slidebutton" onClick={""}>❮</button>
      {boxes.map((box) => (
        <img src={box.img} />
      ))}
      <button class="homepage-slidebutton" onClick={""}>❯</button>
    </div>
  )
}

export default HomePageSlider