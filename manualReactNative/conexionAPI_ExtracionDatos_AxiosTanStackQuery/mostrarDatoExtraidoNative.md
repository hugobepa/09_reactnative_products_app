"app/movie/[id].ts":

           importar componente: import MovieCast from "@/presentation/components/movie/MovieCast";
           importar datos de tanStack: import { useMovie } from "@/presentation/hooks/useMovie";
           para trabajar con id dinamica: import { useLocalSearchParams } from "expo-router";
              (mirar en react,next se trabaja diferente con dinamicas mirarlo)

```
import MovieCast from "@/presentation/components/movie/MovieCast";
import MovieDescription from "@/presentation/components/movie/MovieDescription";
import MovieHeader from "@/presentation/components/movie/MovieHeader";
import { useMovie } from "@/presentation/hooks/useMovie";
import { useLocalSearchParams } from "expo-router";


const MovieScreen = () => {
  const { id } = useLocalSearchParams();

  const { movieQuery, castQuery } = useMovie(+id);//convertir number en string

  if (movieQuery.isLoading || !movieQuery.data) {
    return (
      <View className="flex flex-1 justify-center items-center">
        <Text className="mb-4">Espere por favor</Text>
        <ActivityIndicator color="purple" size={30} />
      </View>
    );
  }

  return (
    <ScrollView>
      <MovieHeader
        poster={movieQuery.data.poster}
        originalTitle={movieQuery.data.originalTitle}
        title={movieQuery.data.title}
      />

      <MovieDescription movie={movieQuery.data} />
    </ScrollView>
  );
};

export default MovieScreen;


```

#COMPONENTES

/presentation/components/movie/.. :

MobieHeader.tsx:

```
interface Props {
  poster: string;
  originalTitle: string;
  title: string;
}

const MovieHeader = ({ poster, originalTitle, title }: Props) => {

  return (
    <>

        <View className="flex-1 rounded-b-[25px] overflow-hidden">
          <Image
            source={{ uri: poster }}
            resizeMode="cover"
            className="flex-1"
          />
        </View>

      <View className="px-5 mt-5">
        <Text className="font-normal">{originalTitle}</Text>
        <Text className="font-semibold text-2xl">{title}</Text>
      </View>
    </>
  );
};

export default MovieHeader;
```

Moviedescription.tsx:

     extraemos el modelo interface para poder trabajar: import { CompleteMovie } from "@/infrastructure/interfaces/movie.interface";

```

import { CompleteMovie } from "@/infrastructure/interfaces/movie.interface";
import React from "react";
import { Text, View } from "react-native";
import { Formatter } from "../../../config/helpers/formatter";

interface Props {
  movie: CompleteMovie;
}

const MovieDescription = ({ movie }: Props) => {
  return (
    <View className="mx-5">
      <View className="flex flex-row">
        <Text>{movie.rating}</Text>
        <Text>- {movie.genres.join(", ")}</Text>
      </View>

      <Text className="font-bold mt-5">Historia</Text>
      <Text className="font-normal mt-2">{movie.description}</Text>

      <Text className="font-bold mt-2 text-2xl">
        {Formatter.currency(movie.budget)}
      </Text>
    </View>
  );
};

export default MovieDescription;

```
