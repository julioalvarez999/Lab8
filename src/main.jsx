import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GiftApp from './giftApp.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GiftApp />
  </StrictMode>,
)
