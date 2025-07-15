import { Link } from 'expo-router';
import React from 'react';
import { Dimensions, Image, Text, TouchableOpacity } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const columnCount = screenWidth < 500 ? 2 : 3;
const spacing = 12;
const cardWidth = (screenWidth - spacing * (columnCount + 1)) / columnCount;

const MovieCard = ({id, title, poster_path, vote_average, release_date}: Movie) => {
  return (
    <Link href={`/movies/${id}`}>
      <TouchableOpacity style={{ width: cardWidth, marginBottom: spacing }}>

        <Image source={{
          uri: poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : 'https://placehold.co/600x400/000000/ffffff.png'
        }} style={{ width: '90%', aspectRatio: 2 / 3, borderRadius: 8 }} resizeMode='cover'/>

        <Text className='text-sm font-bold text-white mt-2'>{title}</Text>

      </TouchableOpacity>
    </Link>
  )
}

export default MovieCard