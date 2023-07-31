export default function SubmitButton({name="Submit",isEnabled=false})
{

    if(isEnabled)
    {
        return(
            <input type="submit" className="btn btn-success btn-sm"  value={name}></input>
        )
    } else
    {
        return(
            <input type="submit" className="btn btn-success btn-sm" disabled value={name}></input>
        )
    }
    
}