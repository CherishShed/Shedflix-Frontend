import { Star } from "@mui/icons-material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useState } from "react";
import { userService } from "../services/userServices";
import { snackBarStore, userStore } from "../context/states";
import { useNavigate } from "react-router-dom";
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
  const loginUser = userStore((store) => store.loginUser);
  const isAuthenticated = userStore((store) => store.isAuthenticated);
  const navigate = useNavigate();

  const [liked, setLiked] = useState(() =>
    user?.favourites.some((obj) => obj.id == id)
  );
  return (
    <div className="movie-card relative rounded-lg">
      {!liked ? (
        <StarBorderIcon
          className="like-icon"
          titleAccess="Add to Favourites"
          onClick={async () => {
            if (!isAuthenticated) {
              return navigate("/login");
            }
            try {
              const result = await userService.addToFavourites({
                id,
                title,
                poster_path,
              });

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
            if (!isAuthenticated) {
              return navigate("/login");
            }
            try {
              const result = await userService.removeFromFavourites(id);
              loginUser({
                first_name: user!.first_name,
                id: user!.id,
                last_name: user!.last_name,
                user_name: user!.user_name,
                favourites: user!.favourites.filter(
                  (movieid) => movieid.id != id
                ),
              });
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
