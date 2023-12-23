import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import PongGame from './components/PongGame.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PongGame />
  </React.StrictMode>,
)
