import { Link } from "react-router-dom"
export default function previewHead({headline,id})
{
    return(
        <div className="row ">
        <h4 className="text-center"><Link to={'/list/'+id}>{headline}</Link></h4>
    </div>
    )
    
}