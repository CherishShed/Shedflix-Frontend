import Hero from "../../components/hero";
import MovieRow from "../../components/movieRow";
import endPoints from "../../services/movieService";
import Nav from "../../layout/nav";
export type userType = {
  id: string;
  user_name: string;
  first_name: string;
  last_name: string;
  favourites: number[];
};
function Home() {
  const movieLists = ["popular", "topRated", "upcoming"];
  return (
    <div>
      <Nav />
      <Hero />
      <section className="p-3">
        {movieLists.map((movieList, index) => (
          <MovieRow
            title={movieList}
            url={
              endPoints[
                movieList as "popular" | "nowPlaying" | "topRated" | "upcoming"
              ]
            }
            key={index}
          />
        ))}
      </section>
    </div>
  );
}

export default Home;
