import {
  FETCH_DATA_FAILURE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
} from './apiActions';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export interface IHotel {
  priceFrom: number;
  stars: number;
  hotelName: string;
  hotelId: number;
  priceAvg: number;
  locationId: number;
  isFavorite: boolean;
}

const apiReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_DATA_SUCCESS:
      const hotelsWithFavorites = action.payload.map((hotel: IHotel) => ({
        ...hotel,
        isFavorite: false,
      }));
      return {
        ...state,
        data: hotelsWithFavorites,
        loading: false,
        error: null,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        data: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default apiReducer;
