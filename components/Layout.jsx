export function Box({children}){
  return(
    <div className='box'>{children}</div>
  )
}

export function AppContainer({children}){
  return <div className='app'>{children}</div>
}

export function Header(){
  return (
    <header className="header">
      <h1>The Weather App</h1>
    </header>
  )
}

export function Container({children}){
    return(<div className="container">{children}</div>)
}
