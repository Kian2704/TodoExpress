import {Link} from "react-router-dom"
export default function header()
{

    return(

        <div className="headline mb-4">
            <h1><Link to="/">ToDo List</Link><Link to="/newlist" className="btn btn-primary text-black float-end">Add List</Link></h1>
            
        </div>

    )

}