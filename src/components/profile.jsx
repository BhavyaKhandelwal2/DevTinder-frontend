import { useSelector } from "react-redux"
import EditProfile from "./editProfile"


export default function Profile(){
   const user=useSelector((store)=>store.user)

   return (user&&(
    <>
    <EditProfile user={user}/>
    </>
   ))
}