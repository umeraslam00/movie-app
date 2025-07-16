import MovieCard from '@/components/MovieCard'
import { images } from '@/constants/images'
import { fetchMovies } from '@/services/api'
import useFetch from '@/services/useFetch'
import { useRouter } from 'expo-router'
import React from 'react'
import { Dimensions, FlatList, Image, View } from 'react-native'

const search = () => {

  const screenWidth = Dimensions.get('window').width;
  const columnCount = screenWidth < 500 ? 2 : 3;

  const router = useRouter()

  const {
    data: movies,
    loading: loadingMovies,
    error: errorMovies } = useFetch(() => fetchMovies({ query: "" })
  )

  return (
    <View className='flex-1 bg-primary'>

      <Image source={images.bg} className='w-full z-0 flex-1 absolute' resizeMode='cover'/>

      <FlatList
        data={movies}
        renderItem={({ item }) => MovieCard(item)}
        keyExtractor={(item) => item.id.toString()}
        className='px-5'
        numColumns={columnCount}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          gap: 12
        }}
      />

    </View>
  )
}

export default search