


export default function ObjectPage() {

  return (
    <div className="objectpage-container">

      <div className="left--cointainer">
        <img className="box--img" src="src\assets\mysterbox-exempel.png" alt="" />
        <p className="time--left--left">Tid kvar av autkion: <b className="time--left">2h 40min 29s</b> </p>
      </div>

      <div className="right--container">
        <h3 className="box--title">Titel på Box</h3>
        <p className="product--description">Produkbeskrivning Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius similique, nisi dolore cumque excepturi pariatur odit
          vero culpa minus tempore illum aspernatur ipsam quis maxime exercitationem molestiae, asperiores suscipit quidem.</p>
        <p className="highest--bid">Nuvarande högsta bud: <b>2000 </b> SEK </p>
        <button className="bid--button">Lägg bud</button>

      </div>

    </div>
  )
}
