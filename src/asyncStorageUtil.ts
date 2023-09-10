import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveDataToStorage = async (key: string, data: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data to AsyncStorage:', error);
  }
};

export const getDataFromStorage = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting data from AsyncStorage:', error);
    return null;
  }
};

export const clearDataFromStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error clearing data from AsyncStorage:', error);
  }
};
