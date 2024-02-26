import { useState, useEffect } from "react"


function Products() {
  useEffect(() => {
    async function load() {
      const response = await fetch('Mysteryboxes.json')
      console.dir(response)
      const items = await response.json()
      setItems(items.mystery_boxes)
      console.log(items)

    }
    load()
  }, [])

  const [items, setItems] = useState([])
  return (
    <article className="Auction-list">

      {items.map(item => <section key={item.id}>
        <h2>{item.name}</h2>
        <p>{item.description}</p>
        <img src={item.image} alt={item.name} />
        <button className="auctionbutton">Köp för {item.price} kr.</button>
      </section>
      )}

    </article>
  )
}

export default Products