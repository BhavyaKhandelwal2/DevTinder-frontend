import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
export default function EditProfile({user}){

  const [firstName,setFirstName] = useState(user?.firstName || "")
  const [lastName,setLastName] = useState(user?.lastName || "")
  const [age,setAge] = useState(user?.age || "")
  const [gender,setGender] = useState(user?.gender || "")
  const [about,setAbout] = useState(user?.about || "")
  const data = { firstName, lastName, about };
  const [error,setError]=useState('')
  const dispatch=useDispatch()
  const[toast,setToast]=useState(false)
async function handleEdit(){
  try{
    const res = await axios.patch(
      "http://localhost:65400/profile/edit",
      data,
      { withCredentials: true }
    );
      setError('')
     dispatch(addUser(res.data))
     setToast(true);
     setTimeout(()=>{
        setToast(false)
     },2000)
    
  }catch (err) {


  setError(err.response.data)
}
}
  return (
    <>
    <div className="flex justify-center my-20">

      <div className="card card-border bg-base-300 w-96 p-10">

        <div className="card-body">

          <h2 className="card-title flex justify-center">Edit Profile</h2>

          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            className="input my-4"
            onChange={(e)=>setFirstName(e.target.value)}
          />

          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            className="input my-4"
            onChange={(e)=>setLastName(e.target.value)}
          />

          <label>About</label>
          <input
            type="text"
            value={about}
            className="input my-4"
            onChange={(e)=>setAbout(e.target.value)}
          />
          <h1 className="bg-red-700">{error}</h1>
          <div className="card-actions flex justify-center">
            <button className="btn btn-primary"onClick={handleEdit}>
              Edit
            </button>
          </div>

        </div>

      </div>

    </div>
    {toast&&<div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile Updated Succesfully!!</span>
  </div>
</div>}
    </>
  )
}