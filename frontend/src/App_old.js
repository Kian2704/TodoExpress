import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import PreviewContainer from './components/previewContainer'
import { Route,Routes } from "react-router-dom";
import Home from './pages/home'
import ListView from './pages/listView';
import { useEffect } from 'react';
class App extends Component {
state = {
    data: null,
    lists: []
  };
  


  componentDidMount() {
    

      this.fetchLists()
      .then(res => this.setState({lists: res}))
      .catch(err => console.log(err));
    
    
  }


 
    // fetching the GET route from the Express server which matches the GET route from server.js

    fetchLists = async() => {
    
    const response = await fetch('/api/getlists')
    const text = await response.text();
    let json = JSON.parse(text);

    for(let i=0; i < json.length;i++)
    {
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
    return json;
  }

  
 
  

  render() {
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <Header/>
      //   </header>
      //   <PreviewContainer lists={this.state.lists}/>
      // </div>
    <Routes>
        <Route path="/" element={<Home lists={this.state.lists}/>}/>
        <Route path="/list/:id" element={<ListView lists={this.state.lists}/>}/>
    </Routes>
    );
  }
}

export default App;