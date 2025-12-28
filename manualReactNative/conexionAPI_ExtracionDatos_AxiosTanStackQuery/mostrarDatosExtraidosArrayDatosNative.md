"/app/home/index.tsx":

    -importar useMovies(tanstakQuery) para trabajar con los extraidos.
    - importar components par trabajar esos datos
    -aplanar arreglo de arrelos: topRatedQuery.data?.pages.flat()

```


import MovieHorizontalList2 from "@/presentation/components/movies/MovieHorizontalList2";
import { useMovies } from "@/presentation/hooks/useMovies";
import React from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

const HomeScreen = () => {

  const { nowPlayingQuery, popularQuery, topRatedQuery, upcomingQuery } =
    useMovies();
  }

  return (
    <ScrollView>
      <View className="mt-2 pb-10" style={{ paddingTop: safeArea.top }}>
        <Text className="text-3xl font-bold px-4 mb-2">MovieApp</Text>

        {/** carrusel de imagenes */}
        <MainSlideshow movies={nowPlayingQuery.data ?? []} />

        <MovieHorizontalList2
          movies={topRatedQuery.data?.pages.flat() ?? []}
          title="Mejor-calificadas"
          className="mb-5"
          loadNextPage={topRatedQuery.fetchNextPage}
        />


      </View>
    </ScrollView>
  );
};

export default HomeScreen;


```

2.  ir alcomponent "/presentation/presentation/components/movies/MovieHorizontalList2.tsx":
    - extrae la interface propia para poder trabajar: import { Movie } from "@/infrastructure/interfaces/movie.interface";

    - extrae el componente "moviePoster": import MoviePoster from "./MoviePoster";

```

import { Movie } from "@/infrastructure/interfaces/movie.interface";
import MoviePoster from "./MoviePoster";

interface Props {
  title?: string;
  movies: Movie[];
  className?: string;

  loadNextPage?: () => void;
}

const MovieHorizontalList2 = ({
  title,
  movies,
  className,
  loadNextPage,
}: Props) => {


  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isLoading.current) return;

    //TODO:
    console.log("cargar siguientes peliculas");
    loadNextPage && loadNextPage();
  };

  return (
    <View className={` ${className}`}>
      {title && <Text className="text-3xl font-bold px-4 mb-2">{title}</Text>}

      <FlatList
        horizontal
        data={movies}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, i) => `${item.id}-${i}`}
        renderItem={({ item }) => (
          <MoviePoster id={item.id} poster={item.poster} smallPoster />
        )}
        onScroll={onScroll}
      />
    </View>
  );
};
export default MovieHorizontalList2;
```

./presentation/components/movies/moviePoster.tsx:

    - trabajamos  con  id y poster para trabajar los datos de nuestro interface 'Movie'

```

import { router } from "expo-router";
import React from "react";
import { Image, Pressable } from "react-native";

interface Props {
  id: number;
  poster: string;
  smallPoster?: boolean;
  className?: string;
}
//onPress={() => router.push(`/movie/${id}` )}
const MoviePoster = ({ id, poster, smallPoster = false, className }: Props) => {
  return (
    <Pressable
      onPress={() =>
        router.push({ pathname: "/movie/[id]", params: { id: id } })
      }
      className={`active:opacity-90 px-2  ${className}`}
    >
      <Image
        source={{ uri: poster }}
        className="shadow-lg rounded-2xl w-full h-full"
        style={{
          width: smallPoster ? 85 : 150,
          height: smallPoster ? 130 : 250,
        }}
        resizeMode="cover"
      />
    </Pressable>
  );
};

export default MoviePoster;

```
