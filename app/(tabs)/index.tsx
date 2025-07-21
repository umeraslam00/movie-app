import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, Dimensions, FlatList, Image, ScrollView, Text, View } from "react-native";
import SearchBar from "../../components/SearchBar";
import '../global.css';




export default function Index() {

  const router = useRouter()

  const {
    data: movies,
    loading: loadingMovies,
    error: errorMovies } = useFetch(() => fetchMovies({ query: "" })
  )

  const {
      data: trendingMovies,
      loading: trendingLoading,
      error: trendingError
    } = useFetch(getTrendingMovies)

  const screenWidth = Dimensions.get('window').width;
  const columnCount = screenWidth < 500 ? 2 : 3;

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0 w-full" />

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}>

        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {loadingMovies || trendingLoading? (
          <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
        ) : errorMovies || trendingError? (
          <Text>Error: {errorMovies?.message || trendingError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onFocus={() => router.push("./search")}
              placeholder='Search for movies.'
            />

            {trendingMovies && (
              <View className="mt-10">
                <Text className="text-white text-lg font-bold mb-3">Trending Movies</Text>

              </View>
            )}

            <>
              <Text className="text-white text-lg font-bold mt-5 mb-3">
                Latest Movies
              </Text>

              <FlatList
                className="mb-4 mt-3"
                data={trendingMovies}
                renderItem={ ({ item, index }) => (
                  <Text className="text-white text-sm">{item.title}</Text>
                )}
                keyExtractor={(item) => item.movie_id.toString()}
              
              />

              <FlatList
                data={movies}
                renderItem={({item})=> (
                  <MovieCard
                    {...item}
                  />
                  
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={columnCount}
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                  marginBottom: 12,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              
              />
            
            </>

          </View>)
        }



      </ScrollView>

    </View>
  );
}
