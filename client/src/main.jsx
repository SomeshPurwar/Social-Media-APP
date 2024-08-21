import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'
import DataProvider from './redux/store.jsx'

createRoot(document.getElementById('root')).render(
    <DataProvider>
  
    <App />
    </DataProvider>
  
)
