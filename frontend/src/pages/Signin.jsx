import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import { useState } from "react";

export default function Signin() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-[400px] text-center p-2 h-max px-4">
          <Heading label={"Sign In"}></Heading>
          <SubHeading
            label={"Enter Your Information to Signin"}
          ></SubHeading>
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="thezeeshanhassan"
            label={"Username"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="example@1234"
            label={"Password"}
          />
          <Button label={"Sign In"}></Button>

          <BottomWarning
            label={"Dont' have Account"}
            buttonText={"Signup"}
            to={"/signup"}
          ></BottomWarning>
        </div>
      </div>
    </div>
  );
}
