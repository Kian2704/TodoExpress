import Header from "../components/header"
import NewListContainer from "../components/newListContainer"
export default function NewList({fetchHomeLists})
{
    return(
        <div className="newList">
            <header>
                <Header/>
            </header>
            <NewListContainer fetchHomeLists={fetchHomeLists}/>
        </div>
    )
}