import React from "react";

function MovieCard({
  id,
  title,
  poster_path,
}: {
  id: number;
  title: string;
  poster_path: string;
}) {
  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt=""
        loading="lazy"
        className="h-full w-full"
      />
      <div className="movie-card-overlay"></div>
      <p className="absolute bottom-0">{title}</p>
    </div>
  );
}

export default MovieCard;
