import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import { useState } from "react";

export default function Signup() {
  const [userName, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-100 text-center p-2 h-max px-4">
          <Heading label={"Sign Up"}></Heading>
          <SubHeading
            label={"Enter Your Information to Create Account"}
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
              setFirstName(e.target.value);
            }}
            placeholder="Muhammad Zeeshan"
            label={"First Name"}
          />
          <InputBox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder="Hassan"
            label={"Last Name"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="example@1234"
            label={"Password"}
          />

          <Button label={"Sign Up"}></Button>

          <BottomWarning
            label={"Have Account? "}
            buttonText={"Signin"}
            to={"/signin"}
          ></BottomWarning>
        </div>
      </div>
    </div>
  );
}
