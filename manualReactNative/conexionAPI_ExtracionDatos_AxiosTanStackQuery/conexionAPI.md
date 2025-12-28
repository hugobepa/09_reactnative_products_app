### Conexion Api

0. ".env":

 <!-- EXPO_PUBLIC_ solo para react native -->
 <!-- VITE_ solo para VITE + REACT -->
 <!-- REACT_ solo para REACT -->
<!--  NEXT_PUBLIC_ solo para NEXT  opcional no cal ponerlo-->

```
#https://www.themoviedb.org/
EXPO_PUBLIC_MOVIE_DB_KEY=

#https://developer.themoviedb.org/docs/getting-started ( API REFERENCE)
EXPO_PUBLIC_MOVIE_DB_URL= https://api.themoviedb.org/3/movie

```

0. poner ".env" en "gitignore" y crear una copia de ".env" ".env.template" sin datos comprometidos:

```
# local env files
#.env*.local
.env

```

1. crear interfaces "/infrastucture/interfaces/...":
   - interface usuario "nombre.interface.ts":

   ```
          export interface Movie {
   id: number;
   title: string;
   description: string;
   releaseDate: Date;
   rating: number;
   poster: string;
   backdrop: string;
   }

    //movie:Movie sin extends
   export interface CompleteMovie extends Movie {
   genres: string[];
   duration: number;
   budget: number;
   originalTitle: string;
   productionCompanies: string[];
   }
   ```

- interface extracion web "nombre.response.ts":
  Se hace una peticion mediate postman o similar.
  secopian todos los resultados del json
  se crea el archivo, y se llama a la paleta de comandos (ctrl+ Mayus+ p)
  se seleciona "paste json"
  se pone nombre a la primer o principal encapsulamiento + enter
  se crea el tipo del json.

```
export interface MovieDBCreditsResponse {
 id: number;
 cast: MovieDBCast[];
 crew: MovieDBCast[];
}

export interface MovieDBCast {
 adult: boolean;
 gender: number;
 id: number;
 known_for_department: string;
 name: string;
 original_name: string;
 popularity: number;
 profile_path: null | string;
 cast_id?: number;
 character?: string;
 credit_id: string;
 order?: number;
 department?: string;
 job?: string;
}

```

2. crear connexion con api "/core/api/movi-api.ts":

   [axios](https://www.npmjs.com/package/axios)

```
import axios from 'axios'


export const movieApi = axios.create({
   baseURL: process.env.EXPO_PUBLIC_MOVIE_DB_URL,
   params:{
    language: 'es-Es',
    api_key: process.env.EXPO_PUBLIC_MOVIE_DB_KEY,
   }

})
```

3.  mapear (pasar de jsonWeb a jsonNuestro) respuesta para adaptar la web "/infrastructure/mappers/nombre.mappers.ts":

        - obtener nuestra platilla json: import { CompleteMovie, Movie } from "../interfaces/movie.interface";
        - obtener web plantilla: json : import { MovieDBMovieResponse } from "../interfaces/moviedb-movie.response";

        <!--static fromMovieDBCastToEntity(actor: MovieDBCast): Cast {return { -->

```

import { CompleteMovie, Movie } from "../interfaces/movie.interface";
import { MovieDBMovieResponse } from "../interfaces/moviedb-movie.response";
import { Result } from "../interfaces/moviedb-response";

export class MovieMapper {

  static fromTheMovieDBToCompleteMovie = (
    movie: MovieDBMovieResponse
  ): CompleteMovie => {
    return {
      id: movie.id,
      title: movie.title,
      releaseDate: new Date(movie.release_date),
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      genres: movie.genres.map((genre) => genre.name),
      character: actor.character ?? "No character",
      avatar: actor.profile_path
        ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
        : "https://i.stack.imgur.com/l60Hf.png",
      ),
    };
  };
}

```

4. obtener datos del api "/core/actions/nombreCarpeta/nombreDato.action.ts":
   - llamar url: movieApi
   - estructura informacion .json de la web: MovieDBMoviesResponse
   - estrucura de extracion a la web: MovieMapper

   - tipos de retorno:
     - devolver informacion especifica dentro de un array: return data.results.map(MovieMapper.fromTheMovieDBToMovie)
     - devolver un dato especifico: return MovieMapper.fromTheMovieDBToCompleteMovie(data);

```
import { movieApi } from "@/core/api/movie-api";
import { MovieDBMoviesResponse } from "@/infrastructure/interfaces/moviedb-response";
import { MovieMapper } from "@/infrastructure/mappers/movie.mappers";

export const nowPlayingAction = async () => {
  try {
    const { data } = await movieApi.get<MovieDBMoviesResponse>("/now_playing");

    const movies = data.results.map(MovieMapper.fromTheMovieDBToMovie);

    return movies;
  } catch (error) {
    console.log({ error });
    throw "Cannot load now playing movies";
  }
};

```

si hay parametros dentro de la url:

```
interface Options {
  page?: number;
  limit?: number;
}

export const topRatedMoviesAction = async ({
  page = 1,
  limit = 10,
}: Options) => {
  try {
    const { data } = await movieApi.get<MovieDBMoviesResponse>("/top_rated", {
      params: {
        page: page,
      },
    });
```

5. gestor de estado asyncrono de la informacion obtenida x http:

   [tanstackQuery](https://tanstack.com/query/latest/docs/framework/react/overview)

   Tenemos que poner "<QueryClientProvider client={queryClient}>" en el punto mas alto de nuestra intalacion. en este caso el "\_layout" de app:

"/app/\_layout.tsx":

```
    import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";


const RootLayout = () => {
  const queryClient = new QueryClient();
   return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </QueryClientProvider>
```

usar tanstackQuery:

"presentantion/hooks/useMovies.ts":

-importar la extracionde datos de la web: import { nowPlayingAction } from "@/core/actions/movies/now-playing.action";

- importar funciones tanstack: import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
- identificacion de los datos que saldran de la funcion: queryKey: ["movies", "top-rated"],

<!-- export const useMovie = (id: number | string) => {-->

```

import { nowPlayingAction } from "@/core/actions/movies/now-playing.action";
import { popularMoviesAction } from "@/core/actions/movies/popular.action";
import { topRatedMoviesAction } from "@/core/actions/movies/top_rated.action";
import { upcomingMoviesAction } from "@/core/actions/movies/upcoming.action";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useMovies = () => {
  const nowPlayingQuery = useQuery({
    queryKey: ["movies", "nowPlaying"],
    queryFn: nowPlayingAction,
    staleTime: 1000 * 60 * 60 * 24, //24h
  });

  const topRatedQuery = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["movies", "top-rated"],
    //topRatedMoviesAction({ page: 1 }),
    queryFn: ({ pageParam }) => {
      //const pageParamNumber = pageParam as number;
      console.log({ pageParam });
      return topRatedMoviesAction({ page: pageParam });
    },
    staleTime: 1000 * 60 * 60 * 24, //24h
    getNextPageParam: (lastPage, pages) => pages.length + 1,
  });

const movieQuery = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieByIdAction(id),
    staleTime: 1000 * 60 * 60 * 24,
  });

  const castQuery = useQuery({
    queryKey: ["movie", id, "cast"],
    queryFn: () => getMovieCastAction(id),
    staleTime: 1000 * 60 * 60 * 24,
  });

  return {
    nowPlayingQuery,
    popularQuery,
    topRatedQuery,
    upcomingQuery,
  };


```
