import Task from "./task";
import ListHead from "./listHead";
import NewTaskRow from "./newTaskRow";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";
export default function ListContainer({ listID, fetchHomeLists, user }) {
  const context = useContext(UserContext);
  let [list, setList] = useState("");
  let navigate = useNavigate();
  const updateList = async () => {
    let response = await fetch(`/api/getlist/${listID}`);
    if (response.status !== 200) {
      navigate("/");
      return;
    }
    let text = await response.text();
    let json = JSON.parse(text);

    if (json[0].tasks.length === 0) {
      await fetch(`/api/setlist/disable/${listID}`, {
        method: "post",
      });
      fetchHomeLists();
      navigate("/");
      return;
    }

    setList(json[0]);
  };

  useEffect(() => {
    updateList();
  }, []);

  if (context.user.id == list.owner)
    return (
      <div className="container listContainer mt-5">
        <div className="container col col-10 col-md-9  rounded-1 ">
          <ListHead headline={list} />
          {list.tasks &&
            list.tasks.map((task) => (
              <Task
                task={task}
                list={list}
                fetchHomeLists={fetchHomeLists}
                setParentState={updateList}
                key={task.id}
              />
            ))}
          <NewTaskRow listid={listID} fetchHomeLists={fetchHomeLists} setParentState={updateList} />
        </div>
      </div>
    );
}
