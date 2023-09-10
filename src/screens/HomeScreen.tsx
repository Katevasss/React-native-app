import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {RootStackParams} from '../../App';
import Hotels from '../components/Hotels';
import SearchForm from '../components/SearchForm';
import {useDispatch} from 'react-redux';
import {clearFavorites} from '../redux/favoriteHotelsActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('favoriteHotels');
      dispatch(clearFavorites());
      navigation.navigate('Login');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={[styles.row, {width: '100%'}]}>
        <Text style={{fontWeight: '800', fontSize: 24, color: 'black'}}>
          Simple Hotel Check
        </Text>
        <TouchableOpacity onPress={handleLogout}>
          <Image source={require('../assets/logOutButton.png')} />
        </TouchableOpacity>
      </View>
      <SearchForm />
      <Hotels />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {margin: 15, gap: 10},
  inputElem: {
    paddingHorizontal: 10,
    paddingVertical: 9,
    height: 40,
    borderColor: '#5AC8FA',
    borderWidth: 1,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
});
export default HomeScreen;
