import {
  REMOVE_FROM_FAVORITES,
  ADD_TO_FAVORITES,
  CLEAR_FAVORITES,
} from './favoriteHotelsActions';
const initialState: {data: number[]} = {
  data: [],
};

const favoriteReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      const {hotelId} = action.payload;
      const isFavorite = state.data.includes(hotelId);
      if (isFavorite) {
        return {
          ...state,
          data: state.data.filter(id => id !== hotelId),
        };
      } else {
        return {
          ...state,
          data: [...state.data, hotelId],
        };
      }
    case REMOVE_FROM_FAVORITES:
      const hotelIdToRemove = action.payload;
      return {
        ...state,
        data: state.data.filter(id => id !== hotelIdToRemove),
      };
    case CLEAR_FAVORITES:
      return {
        ...state,
        data: [],
      };
    default:
      return state;
  }
};

export default favoriteReducer;
