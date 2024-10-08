import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

export const Signin = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function gettingUser(token) {
    let response = await axios.get(
      "http://localhost:8000/api/v1/user/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const existingUser = response.data.user;
    return existingUser;
  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            placeholder="thezeeshanhassan"
            label={"Username"}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <InputBox
            placeholder="123456"
            label={"Password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="pt-4">
            <Button
              label={"Sign in"}
              onClick={async () => {
                let response = await axios.post(
                  "http://localhost:8000/api/v1/user/signin",
                  {
                    username,
                    password,
                  }
                );
                window.localStorage.setItem("token", response.data.token);
                let user = await gettingUser(response.data.token);
                navigate("/dashboard?id=" + user._id);
              }}
            />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
