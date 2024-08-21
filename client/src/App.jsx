import { useEffect } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import PageRender from './customRouter/PageRender'
import Home from './pages/home'
import Login from './pages/login'
import { useDispatch, useSelector } from 'react-redux'
import Alert from "./components/alert/Alert"
import { refreshToken } from './redux/actions/authAction'
import Header from './components/header/Header'
import Register from './pages/register'
import PrivateRouter from './customRouter/PrivateRouter'
import StatusModal from './components/StatusModal'
import { getPosts } from './redux/actions/postAction'
import { getSuggestions } from './redux/actions/suggestionsAction'

import io from 'socket.io-client'
import SocketClient from './SocketClient.jsx'
import { getNotifies } from './redux/actions/notifyAction'
import { GLOBALTYPES } from './redux/actions/globalTypes.jsx'



function App() {
  const auth= useSelector(state => state.auth)
  const status= useSelector(state => state.status)

  const modal= useSelector(state => state.modal)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())

    const socket = io()
    dispatch({type: GLOBALTYPES.SOCKET, payload: socket})
    return () => socket.close()
  },[dispatch])

  useEffect(() => {
    if(auth.token) {
      dispatch(getPosts(auth.token))
      dispatch(getSuggestions(auth.token))
      dispatch(getNotifies(auth.token))
    }
  }, [dispatch, auth.token])

  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
    else if (Notification.permission === "granted") {}
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {}
      });
    }
  },[])
  

  return (
    
    <Router>
      <Alert/>

      <input type="checkbox" id="theme" />
      <div className={`App ${(status || modal) && 'mode'}`}>
        <div className="main">
          {auth.token && <Header/>}
          {status && <StatusModal />}
          {auth.token && <SocketClient />}
          <Routes>
          <Route exact path="/" element={auth.token?<Home/>:<Login />} />
          <Route exact path="/register" element={<Register />} />


          <Route element={<PrivateRouter />}>
            <Route exact path="/:page" element={<PageRender />} />
            <Route exact path="/:page/:id" element={<PageRender />} />


          </Route>
          

          </Routes>
        
        </div>
      </div>

    </Router>
      
      
  
  )
}

export default App
