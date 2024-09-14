import axios from "axios";
import { useState } from "react";

// async function checkBalance() {
//   let response = await axios.get(
//     "http://localhost:8000/api/v1/account/balance",
//     {
//       headers: {
//         Authorization: "Bearer " + window.localStorage.getItem("token"),
//       },
//     }
//   );
//   console.log(response.data.balance);
// }
// checkBalance();

export const Balance = () => {
  const [balance, setBalance] = useState(0);
  async function checkBalance() {
    let response = await axios.get(
      "http://localhost:8000/api/v1/account/balance",
      {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      }
    );
    console.log(response.data.balance);
    setBalance(response.data.balance);
  }
  checkBalance();
  return (
    <div className="flex">
      <div className="font-bold text-lg">Your balance</div>
      <div className="font-semibold ml-4 text-lg">
        {balance}
      </div>
    </div>
  );
};
