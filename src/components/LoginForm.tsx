import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {RootStackParams} from '../../App';
import {useFormik} from 'formik';
import * as Yup from 'yup';

const LoginForm = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Неверный логин или пароль. Повторите попытку')
      .email('Почта введена некорректно'),

    password: Yup.string()
      .min(8, 'Пароль должен быть минимум 8 символов')
      .required('Неверный логин или пароль. Повторите попытку'),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = () => {
    if (formik.isSubmitting || formik.isValid) {
      navigation.navigate('Home');
      formik.resetForm();
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.authContainer}>
      <TextInput
        style={[
          styles.input,
          formik.errors.email ? {borderColor: 'red'} : null,
        ]}
        onChangeText={formik.handleChange('email')}
        onBlur={formik.handleBlur('email')}
        value={formik.values.email}
        placeholder="Логин"
      />
      <TextInput
        style={[
          styles.input,
          formik.errors.password ? {borderColor: 'red'} : null,
        ]}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        value={formik.values.password}
        placeholder="Пароль"
        secureTextEntry
      />

      {(formik.errors.password || formik.errors.email) && (
        <Text style={styles.errorText}>
          {formik.errors.password || formik.errors.email}
        </Text>
      )}
      <TouchableOpacity
        onPress={onSubmit}
        disabled={!formik.isValid || formik.isSubmitting}
        style={styles.button}>
        <Text style={{color: 'white'}}>Войти</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    bottom: 10,
    color: 'white',
    fontSize: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    height: 50,
    borderRadius: 10,
    padding: 15,
    backgroundColor: 'white',
    color: 'black',
  },
  authContainer: {
    marginBottom: 100,
    gap: 15,
    width: '100%',
  },
  button: {
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#5AC8FA',
  },
});

export default LoginForm;
