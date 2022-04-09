import React,{useEffect} from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom";

export default function Navbar(props) {

    let location = useLocation();
  useEffect(() => {
    
  }, [location]);

  let navigate= useNavigate();
  const onLogOut=()=>{
      localStorage.removeItem('auth-token');
      navigate('/Login')
  }
    return (
        <>
           <nav className={`navbar fixed-top  navbar-expand-lg navbar navbar-dark bg-dark`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">INoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/About"?"active":""}`}to="/About">About</Link>
                            </li>
                           
                        </ul>
                        
                    </div>
                    {!localStorage.getItem('auth-token')?<form className='d-flex'>
                    <Link className={`btn btn-outline-primary my-2 my-sm-0 mx-2`} to="/Login" >Login</Link>
                    <Link className={`btn btn-outline-primary my-2 my-sm-0 mx-2`} to="/SignUp" >Sign Up</Link>
                    </form>:<><button className='btn btn-primary'onClick={onLogOut}>Logout</button>
                   
                   
                     <li class="nav-item dropdown">
                     <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                       
                     </a>
                     <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                       <li><a class="dropdown-item" href="#">Action</a></li>
                       <li><a class="dropdown-item" href="#">Another action</a></li>
                       <li><a class="dropdown-item" href="#">Something else here</a></li>
                     </ul>
                   </li></>}
                </div>
             </nav>
        </>
    )
}
