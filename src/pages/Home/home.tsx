import { Outlet } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
export type userType = {
  _id: string;
  user_name: string;
  password: string;
  first_name: string;
  last_name: string;
};
function Home() {
  const [user, setUser] = useState<userType | null>(null);
  useEffect(() => {
    axios
      .get("http://localhost:8081/api/userDetails", {
        headers: { Authorization: localStorage.getItem("accessToken") },
      })
      .then((userDetails) => {
        console.log(userDetails.data);
        setUser(userDetails.data.user);
      });
  }, []);
  return (
    <div>
      Home
      <nav className="flex gap-4 text-red-500"></nav>
      <p>{user?.user_name}</p>
      <Outlet />
    </div>
  );
}

export default Home;
