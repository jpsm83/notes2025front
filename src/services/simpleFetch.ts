export interface IMovie {
  id: number;
  title: string;
}

export interface IMovieDetails {
  description: string;
  release_date: string;
  runtime: number;
}

const TMDB_API_TOKEN = import.meta.env.TMDB_API_TOKEN;

export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: TMDB_API_TOKEN,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_API_TOKEN}`,
  },
};

export const fetchMovies = async (): Promise<IMovie[]> => {
  const response = await fetch(
    `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`,
    {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return await response.json().then((res) => res.results);
};

// export const fetchMovies = async ({
//   query,
// }: {
//   query: string;
// }): Promise<IMovie[]> => {
//   const endpoint = query
//     ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
//     : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

//   const response = await fetch(endpoint, {
//     method: "GET",
//     headers: TMDB_CONFIG.headers,
//   }); // if it is a post, body goes here

//   if (!response.ok) {
//     throw new Error(`Failed to fetch movies: ${response.statusText}`);
//   }

//   const data = await response.json();
//   return data.results;
// };

// export const fetchMovieDetails = async (
//   movieId: string
// ): Promise<IMovieDetails> => {
//   try {
//     const response = await fetch(
//       `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
//       {
//         method: "GET",
//         headers: TMDB_CONFIG.headers,
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`Failed to fetch movie details: ${response.statusText}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching movie details:", error);
//     throw error;
//   }
// };
