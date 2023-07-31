import Checkbox from "./checkbox";
import Input from "./input";

export default function NewListRepeat({show=true,showExtended,repeat,setRepeat,setRepeatAfter,setAutoReset,autoReset})
{
    if(show && repeat)
    return(
        <>
        <div className="row">
               <Checkbox eman={"highlight"} checked={repeat} setClicked={setRepeat} classes={"mx-1 col-12"} show={true} label={"Repeat"}/>
            </div>
            <div className="row">
               <label htmlFor="interval" className="col col-6">After X Days</label>
               <Input type={"number"} onChange={setRepeatAfter} eman="interval" classes={"col col-6"}/>         
            </div>
            <div className="row">
               <label htmlFor="autoreset" className="col col-6">Auto Reset</label>
               <Input type={"checkbox"} onChange={setAutoReset} eman="autoreset" classes={"col col-6"}/>         
            </div>
        </>
        
        
    )
    else if(show)
    return(
        <div className="row">
               <Checkbox eman={"highlight"} checked={repeat} setClicked={setRepeat} classes={"mx-1 col-12"} show={true} label={"Repeat"}/>
            </div>
    )
}