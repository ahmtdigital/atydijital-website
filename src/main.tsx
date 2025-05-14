
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Augment the JSX namespace to allow for component props
declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      [key: string]: any;
    }
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
