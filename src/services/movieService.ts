const key = import.meta.env.VITE_TMDB_KEY as string;
console.log(key);
const baseUrl = "https://api.themoviedb.org/3";
const endPoints = {
  nowPlaying: `${baseUrl}/movie/now_playing?api_key=${key}`,
  popular: `${baseUrl}/movie/popular?api_key=${key}`,
  topRated: `${baseUrl}/movie/top_rated?api_key=${key}`,
  upcoming: `${baseUrl}/movie/upcoming?api_key=${key}`,
  recomendations: `https://api.themoviedb.org/3/movie/${"movieID"}/recommendations?api_key=${key}`,
  singleMovieDetails: `https://api.themoviedb.org/3/movie/${"movieId"}?api_key=${key}`,
  trailers: `https://api.themoviedb.org/3/movie/${"movieId"}/videos?api_key=${key}`,
  credits: `https://api.themoviedb.org/3/movie/${"movieId"}/credits?api_key=${key}`,
};
export default endPoints;
