import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'


const Login = (props) => {

    const [cred, setcred] = useState({userName:"",password:""})
    const OnChange=(e)=>{
        
        setcred({...cred,[e.target.name]:e.target.value})
       
    }
    let navigate= useNavigate();
    const handleLogin= async(e)=>{
        
        e.preventDefault();//localhost:5000/api/auth/login
        const response = await fetch(`http://localhost:5000/api/auth/login`, 
        {
          
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({"userName":cred.userName,"password":cred.password}) // body data type must match "Content-Type" header
      });
      const json= await response.json();
      console.log(json)

      if(json.success){
          //save token and redirect
        localStorage.setItem('auth-token',json.authtoken);
        navigate('/')
        props.ShowAlert("success","Logged In");
      }
      else{
            alert('Error')
            props.ShowAlert("danger","Some error occured");
      }
    }
    return (
        <div className="jumbotron jumbotron-fluid" >
            <div className="conatainer my-4">
            <h1 className="display-4">Login</h1>
                <form >
                <div className="mb-3 row">
                    <label htmlFor="staticEmail" className="col-sm-1 col-form-label">User Name</label>
                    <div className="col-sm-3">
                        <input type="text" className="form-control" id="userName" name="userName" onChange={OnChange} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="inputPassword" className="col-sm-1 col-form-label">Password</label>
                    <div className="col-sm-3">
                        <input type="password" className="form-control" id="inputPassword"  name='password' onChange={OnChange} />
                    </div>
                </div>
                <button type="button" className="btn btn-primary" onClick={handleLogin}>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
