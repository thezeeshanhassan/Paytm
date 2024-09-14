import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/signin" element={<Signin></Signin>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
