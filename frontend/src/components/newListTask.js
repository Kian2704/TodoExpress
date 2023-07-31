export default function NewListTask({taskName})
{
    return(
        <div className="container text-center taskWrapper row bg-secondary">
           
            <div className="text-center ">
                 {taskName}
            </div>
        </div>
    )
}