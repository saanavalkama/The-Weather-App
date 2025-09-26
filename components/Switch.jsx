
export default function Switch({text, checked, onChange, className}){

  const containerStyle={
     display:'flex',
     flexDirection: 'column',
     justifyContent:'center',
     alignItems:'center',
     width: '8rem',
     height: '5rem',
  }

  const switchContainerStyle = {
    width: '5rem',
    height:'2.5rem',
    backgroundColor:'white',
    borderRadius:'25px',
    padding:'1px',
    display:'flex',
    alignItems:'center',
    marginTop:'0.2rem'

  }

  const sliderStyle = {
    width: '2.3rem',
    height:'2.3rem',
    backgroundColor: checked ?'green' : 'gray',
    borderRadius:'50%',
    transition: "transform 0.3s ease",
    transform: checked ? "translateX(0)" : "translateX(2.5rem)",
  }

  const textStyle = {
    textALign:'center',
    fontSize: '1rem',
    color:'white'
  }

  return(
    <div className={className} style={containerStyle}>
      <p style={textStyle}>{text}</p>
      <div 
        style={switchContainerStyle}
        onClick={onChange}
      >
        <div style={sliderStyle}></div>
      </div>
    </div>
  )
}