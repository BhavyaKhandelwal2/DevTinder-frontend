import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./card";
import { BASE_URL } from "../utils/constants";


export default function Feed(){
  const feed=useSelector((store)=>store.feed)
  const dispacth=useDispatch();
  const Navigate=useNavigate()
  const [userNo,setUserNo]=useState(0);
 
  const getFeed=async()=>{
    try{
      if(feed)return;
      const res=await axios.get(BASE_URL+`/feed?`,{withCredentials:true})
      dispacth(addFeed(res.data))
      return res;
    }
    catch(err){
      return Navigate('/login')
    }
  }
  useEffect(()=>{
      getFeed();
    },[])
    if(!feed)return ;
    if(feed.length<=0){
      
      return(<><h1>No more New Users!!</h1></>)
    }  
    return(
        <>
          {feed && <Card user={feed[userNo]} userNo={userNo} setUserNo={setUserNo}  />}
        </>
    )
}