import Navbar from "./components/navabar.jsx"
import Login from "./components/login.jsx"
import Profile from "./components/profile.jsx"
import Body from "./components/body.jsx"
import appStore from "./utils/appStore.js"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { Provider } from "react-redux"
import Feed from "./components/feed.jsx"
import Connections from "./components/connections.jsx"
import Requests from "./components/requests.jsx"
function App() {

  return (
    <>
    <Provider store={appStore}>
       <BrowserRouter basename="/">
       <Routes>
           <Route path="/"element={<Body/>}>
                <Route path='feed'element={<Feed/>}></Route>
                <Route path="login" element={<Login/>}></Route>
               <Route path='profile' element={<Profile/>}></Route>
                <Route path="connections"element={<Connections/>}></Route>
                <Route path="requests"element={<Requests/>}></Route>
           </Route>
        </Routes>   
       </BrowserRouter>
     </Provider> 

        
      
   </>   
  )
}

export default App
