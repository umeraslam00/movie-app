import { icons } from '@/constants/icons'
import React, { useState } from 'react'
import { Image, TextInput, View } from 'react-native'


interface Props {
  onFocus: () => void
  placeholder: string
}

const SearchBar = ({onFocus, placeholder}: Props) => {

  const [query, setQuery] = useState('')
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
      <Image source={icons.search} className='size-5' resizeMode='contain' tintColor='#ab8bff'/>
      <TextInput
        onFocus={onFocus}
        placeholder={placeholder}
        placeholderTextColor='#ab8bff'
        value={query}
        onChangeText={setQuery}
        className='flex-1 ml-2 text-white'
      />
    </View>
  )
}

export default SearchBar