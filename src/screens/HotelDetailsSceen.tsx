import React, {useCallback} from 'react';
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {IHotel} from '../redux/apiReducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {addToFavorites} from '../redux/favoriteHotelsActions';
import FavoriteButton from '../components/FavoriteButton';
import StarRating from '../components/StarsRating';
const HotelDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {hotel} = route.params as {hotel: IHotel};

  const favoritesHotels = useSelector(
    (state: RootState) => state.favorites.data,
  );
  const dispatch = useDispatch();

  const isFavorite = favoritesHotels.includes(hotel.hotelId);

  const handleToggleFavorite = useCallback(() => {
    dispatch(addToFavorites(hotel.hotelId));
  }, [hotel.hotelId, dispatch]);

  return (
    <View>
      <Image style={styles.image} source={require('../assets/img2.jpg')} />
      <View style={styles.header}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../assets/backButton.png')} />
          </TouchableOpacity>
          <FavoriteButton
            isFavorite={isFavorite}
            onPress={handleToggleFavorite}
          />
        </View>
        <View style={{marginTop: 70}}>
          <Text style={styles.hotelName}>{hotel.hotelName}</Text>
          <StarRating stars={hotel.stars} />
        </View>
      </View>
      <View style={styles.mainContainer}>
        <Text style={{fontSize: 16, color: 'black'}}>Фото номера: </Text>
        <Image
          style={styles.hotelImage}
          source={require('../assets/img1.jpg')}
        />
      </View>
      <View style={styles.footer}>
        <View>
          <Text>Цена за 1 ночь: </Text>
          <Text style={{fontSize: 20, color: 'black'}}>{hotel.priceAvg}$</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={{color: 'white'}}>Забронировать</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 220,
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  hotelImage: {
    height: 220,
    width: '100%',
    borderRadius: 20,
  },
  header: {
    padding: 16,
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  mainContainer: {
    gap: 10,
    height: 300,
    position: 'relative',
    flexDirection: 'column',
    margin: 15,
  },
  footer: {
    padding: 15,
    margin: 15,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#5AC8FA',
  },
  hotelName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HotelDetailsScreen;
