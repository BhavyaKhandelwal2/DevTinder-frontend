import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const[isLoginForm,setIsloginForm]=useState(true);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:65400/login",
        { emailId, password },
        { withCredentials: true },
      );

      console.log(res.data);
      dispatch(addUser(res.data));
      return navigate("/feed");
    } catch (error) {
      setError(error?.response?.data || "Something Went wrong!!");
    }
  };

  const handleSignUp=async ()=>{
    try {
       const res=await axios.post("http://localhost:65400/signup",{emailId,password,firstName,lastName},{withCredentials:true})
       dispatch(addUser(res.data))
       return navigate('/feed')
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="flex justify-center my-20">
      <div className="card card-border bg-base-300 w-96 p-10">
        <div className="card-body">
          <h2 className="card-title flex justify-center">{isLoginForm?"login":"SignUp"}</h2>

          {!isLoginForm&&<><label>firstName</label>
          <input
            type="text"
            value={firstName}
            placeholder="Enter emailId"
            className="input my-4"
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label>lastName</label>
          <input
            type="text"
            value={lastName}
            placeholder="Enter password"
            className="input my-4"
            onChange={(e) => setLastName(e.target.value)}
          /></>}
          <label>EmailId</label>
          <input
            type="text"
            value={emailId}
            placeholder="Enter password"
            className="input my-4"
            onChange={(e) => setEmailId(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            placeholder="Enter password"
            className="input my-4"
            onChange={(e) => setPassword(e.target.value)}
          />
          <h1 className="bg-red-700">{error}</h1>

          <div className="card-actions flex justify-center">
            <button className="btn btn-primary" onClick={isLoginForm?handleLogin:handleSignUp}>
              {isLoginForm?"Login":"SignUp"}
            </button>
          </div>
          <p className="" onClick={()=>setIsloginForm((value=>!value))}>{isLoginForm?"New User? SingUp here":"Exsisting User? Login here"}</p>
        </div>
      </div>
    </div>
  );
}
