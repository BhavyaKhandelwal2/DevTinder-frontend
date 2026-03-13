import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import { useEffect, useState } from "react";
import { removeRequest } from "../utils/requestSlice";
import { BASE_URL } from "../utils/constants";

export default function Requests() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const requests = useSelector((store) => store.requests);
  async function fetchRequests() {
    try {
      const res = await axios.get(BASE_URL+"/user/requests", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.requests));
    } catch (err) {
      console.log(err.message);
    }
  }
  async function acceptRequest(_id) {
    try {
      await axios.post(
        BASE_URL+`/request/review/accepted/${_id}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err.message);
    }
  }
  async function rejectRequest(_id) {
    try {
      const { _id } = requests;
      await axios.post(
        BASE_URL+`/request/review/rejected/${_id}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err.message);
    }
  }
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests || requests.length === 0) {
    return <h1 className="text-center mt-10 text-xl">No Requests found!!</h1>;
  }
  return (
    <>
      <div className="flex flex-col justify-center my-10">
        <h1 className="text-bold text-2xl">Requests</h1>

        {requests.map((request) => {
          const { firstName, lastName, about, photoUrl } = request.fromUserId;
          const { _id } = request;
          return (
            <div key={_id} className="m-4 p-4 rounded-lg bg-base-200 w-1/2">
              <div>
                <img src={photoUrl} />
              </div>
              <div>
                <h2>{firstName + " " + lastName}</h2>
                <p>{about}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => acceptRequest(_id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => rejectRequest(_id)}
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
