import axios from "axios";

const url =
  "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YmU5YTkzYzlmZDFlMmIwZDcxYzdiYjk5NWI2NGQ2NSIsInN1YiI6IjYzNzM5ZmI4Nzk4ZTA2MDBkYzM3YTQ0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t9TYdsBewFhJD2yVgrjaODUQEGiqqSyWToAtBE9-dKE",
  },
};

axios
  .get(url, options)
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
