import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {IHotel} from '../redux/apiReducer';
import HotelCard from './HotelCard';

const FavoriteHotels = () => {
  const hotels = useSelector((state: RootState) => state.hotels.data);
  const favoritesHotels = useSelector(
    (state: RootState) => state.favorites.data,
  );
  const favorites = hotels.filter((hotel: IHotel) =>
    favoritesHotels.includes(hotel.hotelId),
  );

  return (
    <View>
      <Text>Избранные отели</Text>
      {favorites.map((hotel: IHotel) => (
        <HotelCard key={hotel.hotelId} hotel={hotel} />
      ))}
    </View>
  );
};

export default FavoriteHotels;
