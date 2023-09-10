import React, {useMemo} from 'react';
import Tabs, {ITab} from '../components/Tabs';
import Hotels from '../components/Hotels';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../App';
import FavoriteHotels from '../components/FavoriteHotels';
import {format, parse} from 'date-fns';

interface ISearchedData {
  location: string;
  checkIn: string;
  stay: string;
}

const TabsScreen = () => {
  const route = useRoute();

  const {searchedData} = route.params as {searchedData: ISearchedData};
  const TABS: Array<ITab> = useMemo(
    () => [
      {
        id: 2,
        title: 'Поиск',
        body: <Hotels />,
      },
      {
        id: 1,
        title: 'Избранное',
        body: <FavoriteHotels />,
      },
    ],
    [],
  );

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const handleLogout = () => {
    navigation.navigate('Home');
  };

  function formatReservationDays(days: number) {
    const daysWord = days === 1 ? 'day' : 'days';
    return `${days} ${daysWord}`;
  }

  const placeholderData =
    searchedData.location +
    ' , ' +
    format(
      parse(searchedData.checkIn, 'yyyy/MM/dd', new Date()),
      'dd MMMM yyyy',
    ) +
    ' , ' +
    formatReservationDays(parseFloat(searchedData.stay));
  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleLogout}>
          <TextInput
            placeholder={placeholderData}
            style={styles.input}
            editable={false}
          />
        </TouchableOpacity>
      </View>
      <Tabs tabs={TABS} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {backgroundColor: 'white', padding: 30, paddingBottom: 0},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    height: 50,
    borderRadius: 10,
    padding: 15,
    backgroundColor: 'white',
    color: 'black',
  },
});
export default TabsScreen;
