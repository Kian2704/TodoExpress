import { useParams } from "react-router-dom"
import { useEffect,useState } from "react";
import Header from "../components/header";

import ListContainer from "../components/listContainer";
export default function ListView({fetchHomeLists})
{
const {id} = useParams();
const [list,setList] = useState([]);

    return(
    <div className="ListView">
        <header className="App-header">
          <Header/>
        </header>
        <ListContainer fetchHomeLists={fetchHomeLists} listID={id}/>
      
        
    </div>
    )

}