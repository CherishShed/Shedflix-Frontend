import Home from "./pages/Home/home";
import Login from "./pages/Login/login";
import Profile from "./pages/Profile/profile";
import Error from "./pages/error/error";
import Signup from "./pages/signup/signup";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
