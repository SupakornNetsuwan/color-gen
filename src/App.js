import React , { useState , useEffect } from "react";
import Nav from "./Nav.js"
import "./app.css"
import Values from 'values.js'

function App() {

  let [inputValue , setInputValue] = useState("")
  let [mainColor , setMainColor] = useState([]);
  let [status , setStatus] = useState("Waiting for generate...");
  let [error , setError] = useState(false);

  let search = (searchColor) =>{
    let setColor = async () =>{
      const color = await new Values(searchColor)
      return color
    }

    setColor()
      .then((getColor)=>{
        setError(false)
        setMainColor(getColor.all(10))
        setStatus("Waiting for generate...")
      })
      .catch((err)=>{
        setError(true)
        setStatus("No color has found")
      })
  }

  let searchHandle = () =>{
    
    if(inputValue.length > 0){
      search(inputValue);
    }else{
      setError(true)
    }
    
  }
  
  //#b6a863
  //Deal with error canceling
  useEffect(()=>{
    let clearError = setTimeout(()=>{
      setError(false)
    },2000)

    return ()=>clearTimeout(clearError)
  },[error])

  //When start first time
  useEffect(()=>{
    search("#b6a863");
  },[])


  let [ firstTimeTyping , setFirstTimeTyping] = useState(false);
  //If type in first time placeholder disappear
  useEffect(()=>{
    if(inputValue.length > 0){
      setFirstTimeTyping(true)
    }
  },[inputValue])

  return (
    <div>
      <Nav>
        <input type="text" name="text" value={inputValue} className={error ? "error" : ""} placeholder={firstTimeTyping ? "" : "Ex. #b6a863"} onChange={(e)=> setInputValue(e.target.value)}/>
        <button onClick={searchHandle}>Gen!</button>
      </Nav>
      {mainColor.length > 0 ? <Content mainColor={mainColor}/> : <p className="status">{status}</p>}
    </div>
  );
}




let Content = ({mainColor}) =>{
  
  return(
    <div className="color-scheme">
      {
        mainColor.map((color , i)=>{
          let colorCode = `rgb(${color.rgb.join(",")})`;
          //For what?
          let randomKey = Number(colorCode.match(/\d/g).join("")) - Math.round(Math.random() * 1000);
          console.log(randomKey)

          return(
            <div key={randomKey} style={{"backgroundColor":colorCode}} className="color-box">
              <p style={i>mainColor.length/2 ? {"color":"white"} : {"color":"black"}}>{colorCode}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default App;
