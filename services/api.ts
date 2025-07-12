
export const TMDB_Config = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}'

  }
}

export const fetchPopularMovies = async ({ query }: { query: string }) => {
  const endpoint = query ?
    `${TMDB_Config.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
  : `${TMDB_Config.BASE_URL}/discover/movie?include_adult=false&sort_by=popularity.desc`

  const res = await fetch(endpoint, {
    method: 'GET',
    headers: TMDB_Config.headers
  })

  if (!res.ok) {
    throw new Error('Failed to fetch movies', res.statusText)
  }

  const data = await res.json()

  return data.results;

}


