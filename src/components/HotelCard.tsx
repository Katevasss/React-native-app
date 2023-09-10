import React, {useCallback, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {IHotel} from '../redux/apiReducer';
import {useDispatch, useSelector} from 'react-redux';
import {addToFavorites} from '../redux/favoriteHotelsActions';
import {RootState} from '../store';
import StarRating from './StarsRating';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../App';
import FavoriteButton from './FavoriteButton';

const HotelCard: React.FC<{hotel: IHotel}> = ({hotel}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const favoritesHotels = useSelector(
    (state: RootState) => state.favorites.data,
  );
  const dispatch = useDispatch();

  const [isFavorite, setIsFavorite] = useState(
    favoritesHotels.includes(hotel.hotelId),
  );
  const handleToggleFavorite = useCallback(() => {
    setIsFavorite(!isFavorite);
    dispatch(addToFavorites(hotel.hotelId));
  }, [hotel.hotelId, isFavorite, dispatch]);

  const handleOpenInfo = () => {
    navigation.navigate('Details', {hotel});
  };

  const exchangeRate = 97;
  const pricePerNight = (hotel.priceAvg * exchangeRate).toFixed(2);

  return (
    <TouchableOpacity onPress={handleOpenInfo}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('../assets/hotelIcon.png')} />
          <View style={{flexDirection: 'column'}}>
            <View style={styles.row}>
              <Text style={{flexWrap: 'wrap'}}>{hotel.hotelName}</Text>
              <FavoriteButton
                isFavorite={isFavorite}
                onPress={handleToggleFavorite}
              />
            </View>
            <View style={styles.row}>
              <StarRating stars={hotel.stars} />

              <Text>Осталось 3 комнаты</Text>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <Text>Цена за 1 ночь: {pricePerNight} ₽</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    padding: 15,
    borderRadius: 15,
    backgroundColor: 'white',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {flexDirection: 'row'},
  footer: {
    borderTopColor: '#41522E5D',
    borderTopWidth: 0.2,
    alignItems: 'flex-end',
  },
});

export default HotelCard;
