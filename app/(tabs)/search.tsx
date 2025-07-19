import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { fetchMovies } from '@/services/api'
import { updateSearchCount } from '@/services/appwrite'
import useFetch from '@/services/useFetch'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, FlatList, Image, Text, View } from 'react-native'

const search = () => {

  const screenWidth = Dimensions.get('window').width;
  const columnCount = screenWidth < 500 ? 2 : 3;

  const [searchQuery, setSearchQuery] = useState('')

  const {
    data: movies,
    loading: loadingMovies,
    fetchData,
    reset,
    error: errorMovies } = useFetch(() => fetchMovies({ query: searchQuery })
  )

  useEffect(() => {
    
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await fetchData()
      } else {
        reset()
      }
    }, 500);

    return () => clearTimeout(timeoutId);

  }, [searchQuery])

  useEffect(() => {
  if (searchQuery.trim() && movies && movies.length > 0) {
    updateSearchCount(searchQuery, movies[0]);
  }
}, [movies]);

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

        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center mt-20 items-center'>
              <Image source={icons.logo} className='w-12 h-10 mb-4' resizeMode='contain'/>
            </View>

            <View className='my-5'>
              <SearchBar placeholder='Search Movies' value={searchQuery} onChangeText={(text: string) => setSearchQuery(text)}/>
            </View>

            {loadingMovies && (
              <ActivityIndicator size='large' color='#0000ff' className='my-3'/>
            )}

            {errorMovies && (
              <Text className='text-red-500 px-5 my-3'>Error: {errorMovies?.message}</Text>
            )}

            {!loadingMovies && !errorMovies && searchQuery.trim() && movies?.length > 0 && (
              <Text className='text-white font-bold text-xl'>Search results for {' '}
                <Text className='text-accent'>{searchQuery}</Text>
              
              </Text>
            )}
          
          </>
        }

        ListEmptyComponent={
          (!loadingMovies && !errorMovies ? (
            <View className='mt-10 px-5'>
              <Text className='text-center text-gray-500'>
                {searchQuery.trim() ? 'No results found' : 'Search for movies'}
              </Text>

            </View>
          ) : null)
        }
      />

    </View>
  )
}

export default search