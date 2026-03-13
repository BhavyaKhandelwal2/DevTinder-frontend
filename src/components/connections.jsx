import axios from "axios"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { BASE_URL } from "../utils/constants";
export default function Connections(){
    const dispatch=useDispatch();
    const connections=useSelector((store)=>store.connections)
    async function fetchConnections(){
        try {
            const res=await axios.get(BASE_URL+'/user/connections',{
                withCredentials:true
            });
            dispatch(addConnections(res.data.data))

        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(()=>{
        fetchConnections();
    },[])
    if (!connections || connections.length === 0) {
    return (<h1 className="text-center mt-10 text-xl">No Connections !!</h1>);
}
    return(
        <>
          <div className="flex flex-col justify-center my-10">
               <h1 className="text-bold text-2xl">Connections</h1>

               {connections.map((connection)=>{
                const{firstName,about,lastName,photoUrl,_id}=connection
               return (

                  <div key={_id} className="m-4 p-4 rounded-lg bg-base-200 w-1/2">
                    <div><img src={photoUrl}  /></div>
                    <div>
                    <h2>{firstName + " " + lastName}</h2>
                    <p>{about}</p>
                    </div>

                  </div>
               )})}
          </div>
        </>
    )
}