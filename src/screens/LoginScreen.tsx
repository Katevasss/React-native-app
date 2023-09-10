import React from 'react';
import {View, StyleSheet, ImageBackground, Text} from 'react-native';
import LoginForm from '../components/LoginForm';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/auth.jpg')}
        style={styles.img}>
        <View style={styles.authContainer}>
          <View>
            <Text style={styles.welcomeText}>Добро пожаловать в</Text>
            <Text style={styles.appName}>Simple Hotel Check</Text>
          </View>
          <LoginForm />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    color: 'white',
    fontSize: 18,
  },
  appName: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
  },
  authContainer: {
    padding: 20,
    gap: 30,
    width: '100%',
  },
});

export default LoginScreen;
