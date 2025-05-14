
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Add JSX namespace augmentation to include content property
declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      content?: any;
    }
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
