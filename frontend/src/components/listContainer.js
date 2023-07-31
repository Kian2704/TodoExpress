import Task from "./task"
import ListHead from "./listHead";
import NewTaskRow from "./newTaskRow";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function ListContainer({listID,fetchHomeLists})
{

  let [list,setList] = useState('');
  let navigate = useNavigate();
  const updateList = async () => {
    let response = await fetch(`/api/getlist/${listID}`);
    let text = await response.text();
    let json = JSON.parse(text);

    if(json[0].tasks.length === 0)
    {
       await fetch(`/api/setlist/disable/${listID}`,{
        method: 'post'
      });
      fetchHomeLists();
      navigate('/');
      return;
    }

    setList(json[0]);
  }


  useEffect(() => {
    updateList();
  },[])




    return(
    <div className="container listContainer mt-5">
    <div className="container col col-10 col-md-9  rounded-1 ">
      <ListHead headline={list}/>
      {list.tasks && list.tasks.map(task => 
      <Task task={task} list={list} setParentState={updateList} key={task.id}/>
      )}
      <NewTaskRow listid={listID} setParentState={updateList}/>
    </div>
  </div>)
}