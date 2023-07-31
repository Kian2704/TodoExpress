
import NewListAddTask from './newListAddTask'
import NewListHead from './newListHead'
import NewListSettings from './newListSettings'
import {useState} from 'react'
import {useNavigate} from "react-router-dom"
import NewListTask from './newListTask'

export default function NewListContainer({fetchHomeLists})
{
    let navigate = useNavigate();
    let [listName,setListName] = useState('');
    let [tasks,setTasks] = useState([]);
    let [highlighted,setHighlighted] = useState(false);
    let [repeat,setRepeat] = useState(false);
    let [startingDate,setStartingDate] = useState();
    let [duration,setDuration] = useState();
    let [repeatAfter,setRepeatAfter] = useState();
    let [autoReset,setAutoReset] = useState();

    let addTask = function(taskName) {
        setTasks([...tasks,taskName]);
    };


    let submitForm = async (event) => {
        event.preventDefault();
        if(!listName || tasks.length <= 0)
        return;
        let body = {
            'listName' : listName,
            'tasks' : tasks
        }
        if(highlighted)
        {
            body.startingDate = startingDate;
            body.duration = duration;
        }
            


        if(repeat)
{ body.repeatAfter = repeatAfter
            body.autoReset = autoReset
}
        let response = await fetch('/api/createlist',{
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(body)
        })
        fetchHomeLists();
        navigate("/");

    }

    return(
        <div className="container listContainer mt-5">
        <div className="container col col-10 col-md-9 rounded-1 ">
            <form onSubmit={submitForm}>
            <NewListHead listName = {listName} setListName={setListName}/>
            {tasks && tasks.map(task =>
                <NewListTask taskName={task}/>
            )}
            <NewListAddTask changeParentState={addTask}/>
            <NewListSettings highlighted={highlighted} setHighlighted={setHighlighted} repeat={repeat} setRepeat={setRepeat} startingDate={startingDate}
             setStartingDate={setStartingDate}
             duration={duration} setDuration={setDuration}
             repeatAfter={repeatAfter} setRepeatAfter={setRepeatAfter}
             autoReset={autoReset} setAutoReset={setAutoReset}
             listName={listName} tasks={tasks}/>
            </form>
          
        </div>


        
      </div>)
}