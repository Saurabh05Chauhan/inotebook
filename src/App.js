
import './App.css';
import Login from './Components/Login';
import Navbar from './Components/navbar';
import About from './Components/about';
import Alert from './Components/Alert';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import NoteState from './Context/noteState';
import Home from './Components/home';
import Signup from './Components/Signup';
import React ,{useState}from 'react';
function App() {
  const [alert, setAlert] = useState(null);
  const ShowAlert=(type,message)=>{
    setAlert({
      msg:message,
      typ:type
    })
  }
  setTimeout(() => {
    setAlert(null)
  }, 1500);
  return (
    <>
    <NoteState>
    <Router>     
      <Navbar/>
      <Alert alert={alert} />
        <div className="container my-3">
     <Routes>
          <Route path="/" element={<Home ShowAlert={ShowAlert}/>}>
          </Route>
          <Route path="/About" element={<About/>}>
          </Route>
          <Route path="/Login" element={<Login ShowAlert={ShowAlert}/>}>
          </Route>
          <Route path="/SignUp" element={<Signup ShowAlert={ShowAlert}/>}>
          </Route>
      </Routes>  
      </div>  
    </Router> </NoteState>
  </> 
  );
}

export default App;
