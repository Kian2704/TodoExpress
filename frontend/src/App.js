import React, { Component } from "react";
import "./App.css";
import Header from "./components/header";
import PreviewContainer from "./components/previewContainer";
import { Route, Routes, json } from "react-router-dom";
import Home from "./pages/home";
import ListView from "./pages/listView";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "./userContext";
import NewList from "./pages/newList";
import Auth from "./pages/auth";
import Logout from "./components/logout";
export default function App() {
  const [lists, setLists] = useState([]);

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error500,setError500] = useState(false);

  const fetchUser = async () => {
    const response = await fetch("/auth/auth");
    if (response.status !== 200) {
      setIsLoading(false);
      return setUser(null);
    }
    const text = await response.text();
    const jsonUser = JSON.parse(text);
    setIsLoading(false);
    return setUser(jsonUser);
  };

  const fetchLists = async () => {
    const response = await fetch("/api/getlists");
    if (response.status == 403) return setLists({});
    const text = await response.text();
    let json;
    try{
      json = JSON.parse(text);}catch {
        setError500(true);
        return;
      }
    for (let i = 0; i < json.length; i++) {
      if (json[i].id < 0) {
        delete json[i];
        continue;
      }
      if (json[i].startDate !== null) {
        let date = new Date(json[i].startDate);
        let endDate = new Date(date).setDate(date.getDate() + json[i].duration);
        const today = Date.now(); //in ms
        let timeDifference = today - date.getTime();
        let daysApart = timeDifference / (1000 * 3600 * 24);
        if (timeDifference < 0 || daysApart > json[i].duration) {
          delete json[i];
          continue;
        }
        json[i].timeRemaining = (endDate - today) / (1000 * 3600 * 24);
      }
      const tasks = await fetch(`/api/gettasks/${json[i].id}`);
      const tasktext = await tasks.text();
      let tasksjson = {};
     try{tasksjson = JSON.parse(tasktext);} catch {return};
      
      json[i].timestamp = json[i].timestamp.split(/[- :T]/);
      json[i].tasks = tasksjson;
      json[i].numberTasks = tasksjson.length;
      json[i].completed = 0;

      for (let j = 0; j < tasksjson.length; j++) {
        if (tasksjson[j].active === 0) {
          json[i].completed += 1;
        }
      }
    }
    setLists(json);
  };

  useEffect(() => {

      fetchLists();
    fetchUser();
  }, []);

if(error500)
return (<p className="text-danger">Error 500: Internal Server Error. If this error persists please contact an Administrator.</p>)


  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      <Routes>
        <Route path="/" element={<Home user={user} lists={lists} />} />
        <Route
          path="/list/:id"
          element={
            <ListView user={user} fetchHomeLists={fetchLists} lists={lists} />
          }
        />
        <Route
          path="/newlist"
          element={<NewList user={user} fetchHomeLists={fetchLists} />}
        />
        <Route path="/login" element={<Auth login={true} user={user} />} />
        <Route path="/register" element={<Auth login={!true} user={user} />} />
        <Route path="/logout" element={<Logout/>} />
      </Routes>
    </UserContext.Provider>
  );
}
