import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { APIProvider } from '@vis.gl/react-google-maps'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <APIProvider apiKey={import.meta.env.GOOGLE_API_KEY} onLoad={() => console.log('API successfully loaded !')}>
      <App />
    </APIProvider>
  </StrictMode>,
)
