import { useState } from "react";
export default function NewListAddTask({ changeParentState }) {
  let [textInput, setTextInput] = useState("");

  const handleChange = (event) => {
    setTextInput(event.target.value);
  };

  const addTask = (e) => {
    e.preventDefault();
    if(textInput.length === 0)
    return;
    changeParentState(textInput);
    setTextInput("");
  };

  return (
    <div className="container row bg-secondary ">
      <div className="my-2 col col-6 text-center">
        <input
          className="col col-12 col-md-6 bg-dark text-white rounded-1 border-0"
          value={textInput}
          onChange={handleChange}
          placeholder="New Task"
        />
      </div>
      <div className="my-2 col col-6 text-center">
        <button className="btn btn-sm float-end btn-success" onClick={addTask}>
          Add Task
        </button>
      </div>
    </div>
  );
}
