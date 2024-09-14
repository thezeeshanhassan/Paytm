import { useEffect, useState } from "react";
import axios from "axios";

export const Appbar = () => {
  const token = window.localStorage.getItem("token");
  const [name, setName] = useState("A");

  useEffect(() => {
    async function gettingUser(token) {
      let response = await axios.get(
        "http://localhost:8000/api/v1/user/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userName = response.data.user.firstName;
      setName(userName);
    }
    gettingUser(token); // Call the async function inside useEffect
  }, [token]); // Dependency array is fixed, now properly placed

  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4">PayTM App</div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">Hello</div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {name[0]}
          </div>
        </div>
      </div>
    </div>
  );
};
