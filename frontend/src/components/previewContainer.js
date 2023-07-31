import ListPreview from './listPreview'

export default function previewContainer({lists})
{

    let unlimitedLists = [];
  let limitedLists = [];
  
  for(let i = 0; i < lists.length; i++)
  {
    if(!lists[i])
    continue;

    if(lists[i].startDate != null)
    limitedLists.push(lists[i]);
    else
    unlimitedLists.push(lists[i]);
  }
    return(
        <div className="container overflow-x-hidden ">
            <div className='row'>
            <Header4 classes={"text-info text-center mb-3"} show={limitedLists.length > 0} text={"Limited Tasks"}/>
              
            {limitedLists.length > 0 && limitedLists.map(list =>
           <ListPreview list={list} key={list.id}/>
           )}
           <Header4  classes={"text-warning text-center mb-3"} show={unlimitedLists.length > 0} text={"Unlimited Tasks"}/>
            {unlimitedLists.length > 0 && unlimitedLists.map(list =>
           <ListPreview list={list} key={list.id}/>
           )}

            </div>
            
        </div>
    )
}

function Header4({show,text,classes})
{
  return(
    <h4 className={classes}>{text}</h4>
  )
}