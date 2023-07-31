import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import PreviewContainer from './components/previewContainer'
import { Route,Routes } from "react-router-dom";
import Home from './pages/home'
import ListView from './pages/listView';
import { useEffect, useState } from 'react';
import NewList from './pages/newList';
export default function App() {

 const [lists,setLists] = useState([]);
  


const fetchLists = async () => {
    
    const response = await fetch('/api/getlists')
    const text = await response.text();
    let json = JSON.parse(text);

    for(let i=0; i < json.length;i++)
    {
      if(json[i].id < 0)
      {
        delete json[i];
        continue;
      }
      if(json[i].startDate !== null)
      {
        let date = new Date(json[i].startDate);
        let endDate = new Date(date).setDate(date.getDate() + json[i].duration);
        const today = Date.now();  //in ms
        let timeDifference = today - date.getTime();
        let daysApart = (timeDifference)/(1000*3600*24);
        if(timeDifference < 0 || daysApart > json[i].duration)
        {
          delete json[i]
          continue;
        }
        json[i].timeRemaining = (endDate-today)/(1000*3600*24);
        
      }
      const tasks = await fetch(`/api/gettasks/${json[i].id}`);
      const tasktext = await tasks.text();
      const tasksjson = JSON.parse(tasktext);
      json[i].timestamp = json[i].timestamp.split(/[- :T]/);
      json[i].tasks = tasksjson;
      json[i].numberTasks = tasksjson.length;
      json[i].completed = 0;

      for(let j=0; j < tasksjson.length;j++)
      {
        if(tasksjson[j].active === 0)
        {
          json[i].completed += 1;
        }
      }
      
    }
    setLists(json)
  }

  useEffect(() => {
    fetchLists()
  },[]);




  
    // fetching the GET route from the Express server which matches the GET route from server.js

    

  
 
  


    return (
    <Routes>
        <Route path="/" element={<Home lists={lists}/>}/>
        <Route path="/list/:id" element={<ListView fetchHomeLists={fetchLists} lists={lists}/>}/>
        {/* fetchHomeLists maybe in context to make it easier*/}
        <Route path="/newlist" element={<NewList fetchHomeLists={fetchLists}/>}/>
    </Routes>
    );
  
}
