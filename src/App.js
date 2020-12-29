import React from 'react'
import ReactDOM from 'react-dom'
import Header from './Header'
import MemeGenerator from './MemeGenerator'
import MemeEditor from './MemeEditor'
import MakeFloatSlider from './MakeFloatSlider'


function App() {
  return (
    <div>
      <Header />
      <MemeGenerator />
      <MemeEditor />
      <MakeFloatSlider />
    </div>
  )
}

export default App