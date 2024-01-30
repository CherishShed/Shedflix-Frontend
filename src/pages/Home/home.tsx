import axios from "axios";
import { useEffect, useState } from "react";
import Hero from "../../components/hero";
import MovieRow from "../../components/movieRow";
import endPoints from "../../services/movieService";
import Nav from "../../layout/nav";
import { userStore } from "../../context/states";
export type userType = {
  _id: string;
  user_name: string;
  password: string;
  first_name: string;
  last_name: string;
};
function Home() {
  const [show, setShow] = useState(false);
  console.log(endPoints["popular"]);
  const setUser = userStore((store) => store.loginUser);
  const movieLists = ["popular", "topRated", "upcoming"];
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
      <Nav />
      <Hero />
      <section className="p-3">
        {movieLists.map((movieList, index) => (
          <MovieRow title={movieList} url={endPoints[movieList]} key={index} />
        ))}
      </section>
    </div>
  );
}

export default Home;
