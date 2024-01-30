import { Star } from "@mui/icons-material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useState } from "react";
function MovieCard({
  id,
  title,
  poster_path,
}: {
  id: number;
  title: string;
  poster_path: string;
}) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="movie-card relative">
      {!liked ? (
        <StarBorderIcon
          className="like-icon"
          titleAccess="Add to Favourites"
          onClick={() => {
            setLiked(!liked);
          }}
        />
      ) : (
        <Star
          className="like-icon"
          titleAccess="Add to Favourites"
          onClick={() => {
            setLiked(!liked);
          }}
        />
      )}

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
