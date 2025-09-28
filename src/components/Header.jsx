import { useState } from "react"

export default function Header({handleShowFavorite}){

  const [show,setShow] = useState(false)

  function handleListClick(){
    handleShowFavorite()
    setShow(false)
  }

  return (
    <header className="header">
      <h1>The Weather App</h1>
      <Hamburger setShow={setShow}/>
      {show && <List handleShowFavorite={handleListClick}/>}
    </header>
  )
}

function Hamburger({setShow}){
  return(
    <span 
      type='button'
      className="hamburger"
      onClick={()=>setShow((prev)=>!prev)}
    >
      <div className="burger"></div>
      <div className="burger"></div>
      <div className="burger"></div>
    </span>
  )
}

function List({handleShowFavorite}){
  return(
    <ul 
      className="hamburger-list"
      type="button"
      onClick={handleShowFavorite}
      >
      <li>Favorites</li>
    </ul>
  )
}