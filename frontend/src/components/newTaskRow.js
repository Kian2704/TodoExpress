
import {useState} from 'react';
import SubmitButton from './submitButton';
export default function NewTaskRow({listid,setParentState})
{
const [newTaskName,setNewTaskName] = useState('');
const [buttonEnabled,setButtonEnabled] = useState(false);

const handleChange = (event) => {
    setNewTaskName(event.target.value);


    if(event.target.value)
    setButtonEnabled(true)
    else
    setButtonEnabled(false)
}

const handleSubmit = (event) =>
{
    event.preventDefault();
    fetch('/api/addtask',{
        method: 'post',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            'taskName' : newTaskName,
            'listID' : listid
    })
    }).then((response) => {setNewTaskName('');setButtonEnabled(false);return response});
    setParentState();


}


    
        return(
            <form className="" onSubmit={handleSubmit}>
            <div className="row bg-secondary rounded-bottom-4">
                
                    <div className="my-2 col col-6 text-center">
                        <input className="col col-12 col-md-6 bg-dark text-white rounded-1 border-0" placeholder="New Task" value={newTaskName} onChange={handleChange} ></input>
                    </div>
                    <div className="my-2 col col-6 text-center">
                       <SubmitButton name="Add Task" isEnabled={buttonEnabled}/>
                    </div>
                
            </div>
            </form>
        )
    
}