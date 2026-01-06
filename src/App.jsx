import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import './index.css'
import Sidebar from './component/Sidebar.jsx'
import SalesTeamPieChart from './component/Salesteampiechart.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Sidebar />
  )
}

export default App
