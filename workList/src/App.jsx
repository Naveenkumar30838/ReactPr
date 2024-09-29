import { useState } from 'react'
import DoList from './DoList'
import './App.css'

function App() {
  const TaskArr  = [<div> <p className='TaskName'>TaskName</p><p className='TaskDesc'>Your Task Description will look like this </p></div>];
  return (
    <DoList></DoList>
  );
}

export default App
