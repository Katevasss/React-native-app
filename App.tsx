import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import {Provider} from 'react-redux';
import store from './src/store';
import TabsScreen from './src/screens/TabsScreen';
import HotelDetailsScreen from './src/screens/HotelDetailsSceen';

export type RootStackParams = {
  Login: any;
  Home: any;
  Tabs: any;
  Details: any;
};

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            options={{headerShown: false}}
            component={LoginScreen}
          />
          <Stack.Screen
            name="Home"
            options={{headerShown: false}}
            component={HomeScreen}
          />
          <Stack.Screen
            name="Tabs"
            options={{headerShown: false}}
            component={TabsScreen}
          />
          <Stack.Screen
            name="Details"
            options={{headerShown: false}}
            component={HotelDetailsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
export default App;
