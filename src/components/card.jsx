import axios from "axios";
import { BASE_URL } from "../utils/constants";

export default function Card({user,userNo,setUserNo}){
  if(!user) return null;

  const {
  firstName = "",
  lastName = "",
  about = "",
  age = "",
  _id
} = user;
   async function ignoreClick(){
    try {
        const res=await axios.post(BASE_URL+`/request/send/ignored/${_id}`,{},{withCredentials:true})
        setUserNo(userNo+1);
    } catch (error) {
        
    }
   }
  async function interestedClick(){
    try{
   const res= await axios.post(`http://localhost:65400/request/send/interested/${_id}`,{},{withCredentials:true})
   setUserNo(userNo+1)
   
    }
    catch(err){
        console.error(err.message);
    }
  }

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="profile"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{about}</p>

        <div className="card-actions justify-end">
          <button className="btn btn-primary"onClick={ignoreClick}>Ignore</button>
          <button className="btn btn-primary"onClick={interestedClick}>Interested</button>
        </div>
      </div>
    </div>
  )
}