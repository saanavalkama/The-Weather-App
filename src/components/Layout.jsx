export function Box({children}){
  return(
    <div className='box'>{children}</div>
  )
}

export function AppContainer({children}){
  return <div className='app'>{children}</div>
}

export function Container({children}){
    return(<div className="container">{children}</div>)
}

export function FirstRow({children}){
  return(<div className="first-row-container">{children}</div>)
}

export function SecondRow({children}){
  return(<div className="second-row-container">{children}</div>)
}
