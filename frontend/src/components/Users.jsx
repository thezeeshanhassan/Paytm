import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export const Users = () => {
  // Replace with backend call
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/user/bulk?filter=" + filter)
      .then((response) => {
        setUsers(response.data.user);
      });
  }, [filter]);

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>
      <div>
        {Array.isArray(users) && users.length > 0 ? (
          users.map(
            (user) =>
              user._id !== id ? ( // Check if the user's _id is not equal to user_id
                <User key={user._id} user={user} /> // Pass user data as props
              ) : null // Return null if the user's _id matches user_id
          )
        ) : (
          <div>No users found.</div>
        )}
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-2 mr-2 mb-2">
          <div className="flex flex-col justify-center  h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-ful">
        <Button
          onClick={(e) => {
            navigate(
              "/sendmoney?id=" +
                user._id +
                "&name=" +
                user.firstName +
                " " +
                user.lastName
            );
          }}
          label={"Send Money"}
        />
      </div>
    </div>
  );
}
