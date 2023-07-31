import { useState } from "react";
import DeleteList from "./deleteList";
export default function Task({list,task,setParentState})
{

    let disable = async () => {
      if(!list.active)
      return;
        let response = await fetch(`/api/settask/disable/${task.id}`,{
            method: 'POST'
        });

        setActive(0);
    }

    let enable = async () => {
      if(!list.active)
      return;
        let response = await fetch(`/api/settask/enable/${task.id}`,{
            method: 'POST'
        });

        setActive(1);
    }

    let deltask = async() => {
      if(!list.active)
      return;
      let respose = await fetch(`/api/deltask/${task.id}`,{
        method:'POST'
      })
      setParentState();
    }

    const [active,setActive] = useState(task.active);
    


if(active===1)
{
    return(<div className="taskWrapper p-0 m-0">
    <div onClick={disable} className="row">
      <div className="text-center p-0">
      {task.task}
      <DeleteList deltask={deltask}/>
      </div>
    </div>
  </div>);
} else if(active===0)
{
    return(<div className="taskWrapper p-0 m-0">
    <div onClick={enable} className="row">
      <del className="text-center p-0 inactiveTask">
      {task.task}
      <div onClick={deltask} href="#" className="float-end text-danger me-1 deleteTask">X</div>
      </del>
    </div>
  </div>); 
}

    
}