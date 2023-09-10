export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const CLEAR_FAVORITES = 'CLEAR_FAVORITES';

export const addToFavorites = (hotelId: number) => ({
  type: ADD_TO_FAVORITES,
  payload: {hotelId},
});
export const removeFromFavorites = (hotelId: number) => ({
  type: REMOVE_FROM_FAVORITES,
  payload: {hotelId},
});

export const clearFavorites = () => ({
  type: CLEAR_FAVORITES,
});
