

import NewListDate from "./newListDate";
import NewListRepeat from "./newListRepeat";

import SubmitButton from "./submitButton";


export default function NewListSettings({listName,tasks,highlighted,setHighlighted,repeat,setRepeat,setStartingDate,setDuration,setRepeatAfter,autoReset,setAutoReset})
{

   


   const handleSpecify = () => {
      setHighlighted(!highlighted);
   }

   const handleRepeat = () => {
      setRepeat(!repeat);
   }

   const handleRepeatAfter = (e) => {
      setRepeatAfter(e.target.value);
   }

   const handleAutoReset = (e) => {
      setAutoReset(!autoReset);
   }



   if(listName && tasks.length > 0)
   return(
      <>
      <div className="row container bg-secondary">
         
         <div className="col col-12">

            <NewListDate setStartingDate={setStartingDate} setDuration={setDuration} show={true} showExtended={highlighted} highlighted={highlighted} handleChecked={handleSpecify}/>
            <NewListRepeat show={highlighted} showExtended={true} setAutoReset={handleAutoReset} autoReset={autoReset} setRepeatAfter={handleRepeatAfter} setRepeat={handleRepeat} repeat={repeat}/>

         </div>
      </div>
      <div className="container row bg-secondary">
         <SubmitButton isEnabled={true} name="Create List"/>
      </div>
      </>
   )
   else
   return(
      <>
      <div className="row container bg-secondary">
         
         <div className="col col-12">

            <NewListDate setStartingDate={setStartingDate} setDuration={setDuration} show={true} showExtended={highlighted} highlighted={highlighted} handleChecked={handleSpecify}/>
            <NewListRepeat show={highlighted} showExtended={true} setRepeatAfter={handleRepeatAfter} setRepeat={handleRepeat} repeat={repeat}/>

         </div>
      </div>
      <div className="container row bg-secondary">
         <SubmitButton name="Create List"/>
      </div>
      </>
     )
}