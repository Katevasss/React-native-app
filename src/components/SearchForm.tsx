import React, {useEffect, useMemo, useState} from 'react';
import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';
import DatePicker from 'react-native-modern-datepicker';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
} from 'react-native';
import {fetchDataRequest} from '../redux/apiActions';
import {addDays, format, parse} from 'date-fns';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../App';

const SearchForm: React.FC = () => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const handleDateChange = (checkIn: string) => {
    formik.setFieldValue('checkIn', checkIn);
    setDatePickerVisible(false);
  };
  const today = useMemo(() => format(new Date(), 'yyyy/MM/dd'), []);
  const handleOnSubmit = () => {
    onSubmit();
    navigation.navigate('Tabs', {
      searchedData: formik.values,
    });
  };

  const dispatch = useDispatch();

  const onSubmit = () => {
    const formattedCheckIn = format(
      parse(formik.values.checkIn, 'yyyy/MM/dd', new Date()),
      'yyyy-MM-dd',
    );
    const limitStay = parseFloat(formik.values.stay);
    const startDate = new Date(formattedCheckIn);
    const checkOutDate = format(addDays(startDate, limitStay), 'yyyy-MM-dd');

    dispatch(
      fetchDataRequest({
        ...formik.values,
        checkIn: formattedCheckIn,
        checkOut: checkOutDate,
      }),
    );
  };

  useEffect(() => {
    onSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: {
      location: 'Moscow',
      checkIn: today,
      stay: '1',
    },
    onSubmit,
  });

  return (
    <View>
      <View style={styles.container}>
        <Text style={{fontWeight: '800', fontSize: 18, color: 'black'}}>
          Куда едем?
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Локация"
          onChangeText={formik.handleChange('location')}
          value={formik.values.location}
        />
        <View style={styles.inputLayout}>
          <TouchableOpacity
            style={styles.inputRow}
            onPress={() => setDatePickerVisible(true)}>
            <TextInput
              style={{color: 'black'}}
              placeholder="Выберите дату"
              onChangeText={formik.handleChange('checkIn')}
              value={formik.values.checkIn}
              editable={false}
            />
            <Image
              style={styles.icon}
              source={require('../assets/calendar.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.inputRow}>
            <TextInput
              style={{width: '80%'}}
              placeholder="Кол-во дней"
              onChangeText={formik.handleChange('stay')}
              value={formik.values.stay.toString()}
              keyboardType="numeric"
            />
            <Image
              style={styles.icon}
              source={require('../assets/clock.png')}
            />
          </TouchableOpacity>
        </View>
        <Modal
          visible={isDatePickerVisible}
          transparent={true}
          animationType="fade">
          <TouchableWithoutFeedback onPress={() => setDatePickerVisible(false)}>
            <View style={styles.modalContainer}>
              <DatePicker
                current={formik.values.checkIn}
                selected={formik.values.checkIn}
                onDateChange={handleDateChange}
                mode="calendar"
                options={{
                  mainColor: '#5AC8FA',
                }}
                style={{borderRadius: 10}}
              />
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <TouchableOpacity
          style={[styles.input, styles.button]}
          onPress={handleOnSubmit}>
          <Text>Найти</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  inputLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    width: '100%',
  },
  container: {
    overflow: 'hidden',
    padding: 15,
    elevation: 15,
    borderRadius: 15,
    backgroundColor: 'white',
    gap: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 15,
  },
  input: {
    height: 40,
    borderColor: '#5AC8FA',
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    paddingHorizontal: 10,
  },
  inputRow: {
    borderRadius: 10,
    height: 40,
    borderColor: '#5AC8FA',
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  button: {
    backgroundColor: '#5AC8FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    right: 5,
  },
});

export default SearchForm;
