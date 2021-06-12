import React , { useState } from "react";
import { CgMenu , CgClose} from "react-icons/cg"
import { HiColorSwatch } from "react-icons/hi";

let Nav = ({children}) =>{
    let [ toggle , setToggle ] = useState(false)

    return(
        <nav>
            <p>Color Generator <HiColorSwatch style={{"marginLeft":"5px","fontSize":"1.3em"}}/></p>
            <div className="nav-button" onClick={()=> setToggle(!toggle)}>{toggle ? <CgClose/> : <CgMenu/>}</div>
            <div className={toggle ? "input-wrap toggle" : "input-wrap"}>{children}</div>
        </nav>
    )
}

export default Nav;