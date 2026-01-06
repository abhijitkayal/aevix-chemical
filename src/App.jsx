import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import './index.css'
import Sidebar from './component/Sidebar.jsx'
import SalesTeamPieChart from './component/Salesteampiechart.jsx'

function App() {
  const [count, setCount] = useState(0)
  const [darkMode, setDarkMode] = useState(false)

  // Apply dark mode class to html element
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('bg-slate-800');
    } else {
      root.classList.remove('bg-slate-800');
    }
  }, [darkMode]);

  return (
    <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
  )
}

export default App
