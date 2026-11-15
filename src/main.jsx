import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { upgradeLegacyUrl } from './lib/projectUrl'
import './index.css'

// Old shared links (?project=lion) → /work/lion, before anything reads the URL.
upgradeLegacyUrl()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
