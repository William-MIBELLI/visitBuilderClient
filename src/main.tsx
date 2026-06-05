import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { APIProvider } from '@vis.gl/react-google-maps'
import '@fontsource/barlow-condensed/400.css';
import '@fontsource/barlow-condensed/700.css';
import '@fontsource/barlow-condensed/900.css';
import { ShopContextProvider } from './Contexts/ShopContext.tsx'
import { ToastProvider } from '@heroui/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider placement='top end'/>
    <ShopContextProvider>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY} onLoad={() => console.log('API successfully loaded !')}>
        <App />
      </APIProvider>
    </ShopContextProvider>
  </StrictMode>,
)
