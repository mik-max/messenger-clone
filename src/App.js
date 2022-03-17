import React, {useRef, useContext} from "react";
import Home from './Home'
import Login from "./components/Login";
import { UserSlice } from "./components/Contexts";
import { useAuth } from "./firebase";
import Contexts from "./components/Contexts";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
function App() {
  
  return(
   <UserSlice>
      <MyRoutes />
   </UserSlice>
  )
}

function MyRoutes () {
  const currentUser = useAuth();
  const userStatus = useContext(Contexts);
     return (
        <BrowserRouter>
            <Routes>
              {(!userStatus.status && !currentUser) ? <Route path ="/" element = {<Login />} />: <Route path="/home" element = {<Home />} />}
              <Route path = '*' element={<Navigate to={ (!userStatus.result && !currentUser) ? '/': '/home '} />} />
            </Routes>
        </BrowserRouter>
     )
}

export default App;


