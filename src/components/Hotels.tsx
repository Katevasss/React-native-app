import React from 'react';
import {Text, ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {IHotel} from '../redux/apiReducer';
import HotelCard from './HotelCard';

const Hotels = () => {
  const hotels = useSelector((state: RootState) => state.hotels.data);

  return (
    <ScrollView>
      <Text style={styles.title}>Подходящие бронирования</Text>
      {hotels.map((hotel: IHotel) => (
        <HotelCard key={hotel.hotelId} hotel={hotel} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    paddingBottom: 20,
  },
});

export default Hotels;
