import axios from "axios";
import { useEffect, useState } from "react";
import Hero from "../../components/hero";
import MovieRow from "../../components/movieRow";
import endPoints from "../../services/movieService";
export type userType = {
  _id: string;
  user_name: string;
  password: string;
  first_name: string;
  last_name: string;
};
function Home() {
  console.log(endPoints["popular"]);
  const [user, setUser] = useState<userType | null>(null);
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
      <nav className="flex gap-4 text-red-500"></nav>
      <Hero />
      <section>
        {movieLists.map((movieList, index) => (
          <MovieRow title={movieList} url={endPoints[movieList]} key={index} />
        ))}
      </section>
    </div>
  );
}

export default Home;
