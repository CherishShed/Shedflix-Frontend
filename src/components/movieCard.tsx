import { Star } from "@mui/icons-material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useState } from "react";
import { userService } from "../services/userServices";
import { snackBarStore, userStore } from "../context/states";
function MovieCard({
  id,
  title,
  poster_path,
}: {
  id: number;
  title: string;
  poster_path: string;
}) {
  const openSnackBar = snackBarStore((store) => store.openSnackBar);
  const user = userStore((store) => store.user);
  const [liked, setLiked] = useState(() => user?.favourites.includes(id));
  return (
    <div className="movie-card relative">
      {!liked ? (
        <StarBorderIcon
          className="like-icon"
          titleAccess="Add to Favourites"
          onClick={async () => {
            try {
              const result = await userService.addToFavourites(id);
              console.log(result);
              setLiked(!liked);
              openSnackBar(result.message as string, "success");
            } catch (error) {
              console.log(error);
              if (error.response.data.message) {
                openSnackBar(error.response.data.message as string, "error");
              } else {
                openSnackBar("An error occured", "error");
              }
            }
          }}
        />
      ) : (
        <Star
          className="like-icon"
          titleAccess="Remove from Favourites"
          color="error"
          onClick={async () => {
            try {
              const result = await userService.removeFromFavourites(id);
              console.log(result);
              setLiked(!liked);
              openSnackBar(result.message as string, "success");
            } catch (error) {
              console.log(error);
              if (error.response.data.message) {
                openSnackBar(error.response.data.message as string, "error");
              } else {
                openSnackBar("An error occured", "error");
              }
            }
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
