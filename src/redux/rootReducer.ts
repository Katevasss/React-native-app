import {combineReducers} from '@reduxjs/toolkit';
import apiReducer from './apiReducer';
import favoriteReducer from './favoriteHotelsReducer';

const RootReducer = combineReducers({
  hotels: apiReducer,
  favorites: favoriteReducer,
});

export default RootReducer;
