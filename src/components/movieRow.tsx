import { useEffect, useState } from "react";
import { MovieObject } from "./hero";
import axios from "axios";
import MovieCard from "./movieCard";
import { Skeleton } from "@mui/material";

function MovieRow({ title, url }: { title: string; url: string }) {
  const [movieList, setMovieList] = useState<null | MovieObject[]>(null);
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setMovieList(response.data.results);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="mb-3">
      <h2 className="text-xl font-bold">{title.toUpperCase()}</h2>
      {movieList ? (
        <div className="flex overflow-x-scroll gap-4 items-center p-3">
          {movieList?.map((movie) => (
            <MovieCard
              id={movie.id}
              poster_path={movie.poster_path}
              title={movie.title}
              key={movie.id}
            />
          ))}
        </div>
      ) : (
        <div className="flex overflow-x-scroll gap-4 items-center p-3 ">
          {[1, 2, 3, 4, 5, 6, 7].map(() => (
            <Skeleton
              width={200}
              height={150}
              animation="pulse"
              className="!bg-gray-400"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieRow;
