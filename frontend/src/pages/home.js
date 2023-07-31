import Header from '../components/header'
import PreviewContainer from '../components/previewContainer'
import { Component, useState } from 'react';
export default function Home({lists})

{
  
    return(
    <div className="App">
        <header className="App-header">
          <Header/>
        </header>
        <PreviewContainer lists={lists}/>
    </div>
    )
}