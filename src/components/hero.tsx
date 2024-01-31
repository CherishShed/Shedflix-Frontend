import axios from "axios";
import endPoints from "../services/movieService";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
// const key = import.meta.env.VITE_TMDB_KEY as string;
export type MovieObject = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
function Hero() {
  const [movie, setMovie] = useState<MovieObject | null>(null);
  useEffect(() => {
    axios.get(endPoints.nowPlaying).then((result) => {
      const randomMovie = Math.floor(
        Math.random() * result.data.results.length
      );
      setMovie(result.data.results[randomMovie]);
      console.log(result.data.results[randomMovie]);
      return;
    });
  }, []);
  return (
    <>
      {!movie ? (
        <div className="w-full h-screen relative flex justify-between">
          <CircularProgress
            color="primary"
            className="!w-[150px] !h-[150px] !mt-[40%] !mx-auto block md:!mt-[20%] md:flex "
          />
          <CircularProgress
            color="secondary"
            className="!hidden md:!w-[150px] md:!h-[150px] md:!mx-auto md:!mt-[20%] md:!block"
          />
          <CircularProgress
            color="warning"
            className="!hidden md:!w-[150px] md:!h-[150px] md:!mx-auto md:!mt-[20%] md:!block"
          />
        </div>
      ) : (
        <div className="w-full h-screen relative">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt=""
            loading="lazy"
            className="h-full w-full"
          />
          <div className="absolute top-0 w-full h-full bg-[rgb(0,0,0,0.4)]"></div>
          <div className="absolute bottom-10 w-[50%] p-4">
            <h2 className="text-white text-4xl font-bold my-4">
              {movie.title}
            </h2>
            <div className="flex gap-2">
              <button className="p-4 bg-white border border-white w-32 rounded-sm text-black">
                Play
              </button>
              <button className="p-4 bg-transparent text-white border border-white w-32 rounded-sm">
                More Info
              </button>
            </div>
            <p className="text-sm text-gray-300">{movie.release_date}</p>
            <p className="text-sm text-white">{movie.overview}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Hero;
