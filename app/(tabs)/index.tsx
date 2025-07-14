import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import '../global.css';
import SearchBar from "./components/SearchBar";



export default function Index() {

  const router = useRouter()

  const {
    data: movies,
    loading: loadingMovies,
    error: errorMovies } = useFetch(() => fetchMovies({ query: "" })
    )

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0 w-full" />

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}>

        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {loadingMovies ? (
          <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
        ) : errorMovies ? (
          <Text>Error: {errorMovies?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onFocus={() => router.push("./search")}
              placeholder='Search for movies.'
            />

            <>
              <Text className="text-white text-lg font-bold mt-5 mb-3">
                Latest Movies
              </Text>
            
            </>

          </View>)
        }



      </ScrollView>

    </View>
  );
}
