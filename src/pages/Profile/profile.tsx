import { useNavigate } from "react-router-dom";
import { userStore } from "../../context/states";
import Nav from "../../layout/nav";
import { useEffect } from "react";

function Profile() {
  const authentication = userStore((store) => store.isAuthenticated);
  const user = userStore((store) => store.user);
  const navigation = useNavigate();
  useEffect(() => {
    if (!authentication) {
      navigation("/login");
    }
  });
  return (
    <div>
      <Nav />
      <div className="profile-hero w-full h-[200px]">
        <div className="bg-[rgb(0,0,0,0.6)] h-full w-full relative p-6">
          <h2 className="text-3xl absolute bottom-2">My List</h2>
        </div>
      </div>
    </div>
  );
}

export default Profile;
