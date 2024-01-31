import axios from "axios";

export const userService = {
  addToFavourites: async ({
    id,
    title,
    poster_path,
  }: {
    id: number;
    title: string;
    poster_path: string;
  }) => {
    const result = await axios.put(
      `http://localhost:8081/api/favourites`,
      { id, title, poster_path },
      {
        headers: { Authorization: localStorage.getItem("accessToken") },
      }
    );
    return result.data;
  },
  removeFromFavourites: async (id: number) => {
    const result = await axios.patch(
      `http://localhost:8081/api/favourites/${id}`,
      null,
      {
        headers: { Authorization: localStorage.getItem("accessToken") },
      }
    );
    return result.data;
  },
};
