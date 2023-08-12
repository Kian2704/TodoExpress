import PreviewHead from "./previewHead";
import PreviewRow from "./previewRow";

export default function ListPreview({ list }) {
  const getRemaining = () => {
    //remainingtime = 5.27; days = 5; ho
    const days = parseInt(list.timeRemaining); //5
    const hoursInt = parseInt((list.timeRemaining - days) * 24); //6
    const hours = (list.timeRemaining - days) * 24; //6,48
    const minutesInt = parseInt((hours - hoursInt) * 60);
    let timeString = "";
    if (list.timeRemaining >= 1) timeString = `${days}d ${hoursInt}h`;
    else timeString = `${hoursInt}h ${minutesInt}m`;

    return timeString;
  };

  return (
    <div className="container col  col-8  col-md-5 bg-secondary mb-4 rounded-1">
      <PreviewHead id={list.id} headline={list.name} />
      <PreviewRow ident="Tasks" value={list.numberTasks} />
      <PreviewRow
        ident="Completed"
        value={
          list.completed +
          " / " +
          ((list.completed / list.numberTasks) * 100).toFixed(2) +
          "%"
        }
      />
      <PreviewRow
        ident="Time Remaining"
        show={!isNaN(list.timeRemaining)}
        value={getRemaining()}
      />
      <PreviewRow
        ident="Created"
        value={`${list.timestamp[2]}.${list.timestamp[1]}.${list.timestamp[0]}`}
      />
    </div>
  );
}
