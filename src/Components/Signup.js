import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {

    const [signUpData, setsignUpData] = useState({name:"",userName:"",password:""})
    const OnChange=(e)=>{
        
        setsignUpData({...signUpData,[e.target.name]:e.target.value})
       
    }
    let navigate= useNavigate();
    const handleSignUp= async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, 
        {
          
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({"name":signUpData.name,"userName":signUpData.userName,"password":signUpData.password}) // body data type must match "Content-Type" header
      });
      const json= await response.json();
      console.log(json)

      if(json.success){
        navigate('/Login')
        props.ShowAlert("success","Logged In");
      }
      else{
          alert("Some error occured")
          props.ShowAlert("danger","Some error occured");
      }
    }
    return (
        <div className="conatainer my-4">
             <h1 className="display-4">Sign Up</h1>
            <form>
                <div className="form-group mb-3 col-sm-3">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input type="text" className="form-control" id="name"  name="name" placeholder="Enter your name" onChange={OnChange} minLength="3" required/>
                   
                </div>
                <div className="form-group mb-3 col-sm-3">
                    <label htmlFor="exampleInputEmail1">User Name</label>
                    <input type="text" className="form-control" id="userName" name="userName"  placeholder="Enter user name" onChange={OnChange} required/>
                    <small id="emailHelp" className="form-text text-muted">Must be unique.</small>
                </div>
                <div className="form-group mb-3 col-sm-3">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={OnChange} minLength="8" required/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSignUp}>Submit</button>
            </form>
        </div>
    )
}

export default Signup
