import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore'
import store from './redux/store'


import './index.css'

// import {  RouterProvider } from 'react-router-dom'
// import router from './routes/index.tsx'
import App from './App.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   
      {/* <RouterProvider router={router} /> */}
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
        <App/>
        <Toaster/>
        </PersistGate>
      </Provider> 
      
   
    
   
  </React.StrictMode>,
)
