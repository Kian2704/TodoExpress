import Checkbox from "./checkbox";
import Input from "./input";

export default function({show=true,showExtended=false,highlighted,handleChecked,setStartingDate,setDuration})
{

    let handleDateChange = (e) => {
        setStartingDate(e.target.value);
    }

    let handleDurationChange = (e) => {
        setDuration(e.target.value);
    }

    if(show && showExtended)
    return(
        <>
        <div className="row">    
               <Checkbox eman={"highlight"} classes={"mx-1 col-12"} show={true} checked={highlighted} label={"Specify Date"} setClicked={handleChecked}/>
            </div>
            <div className="row">
               <label htmlFor="datepicker" className="col col-6">Starting Date:</label>
               <Input type={"date"} onChange={handleDateChange} eman="datepicker" classes={"col col-6"}/>         
            </div>
            <div className="row">
               <label htmlFor="datepicker" className="col col-6">Duration(Days)</label>
               <Input type={"number"} onChange={handleDurationChange} eman="duration" classes={"col col-6"}/>         
            </div>
        </>
        
    )

    if(show && !showExtended)
    return(
        <div className="row">    
               <Checkbox eman={"highlight"} classes={"mx-1 col-12"} show={true} checked={highlighted} label={"Specify Date"} setClicked={handleChecked}/>
            </div>
    )
}