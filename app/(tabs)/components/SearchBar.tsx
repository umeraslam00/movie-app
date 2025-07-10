import { icons } from '@/constants/icons'
import React from 'react'
import { Image, View } from 'react-native'

const SearchBar = () => {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
      <Image source={icons.search} className='size-5' />
    </View>
  )
}

export default SearchBar