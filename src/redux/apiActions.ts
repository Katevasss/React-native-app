import {IHotel} from './apiReducer';

export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

export const fetchDataRequest = (payload: {
  location: string;
  checkIn: string;
  checkOut: string;
}) => ({
  type: FETCH_DATA_REQUEST,
  payload,
});

export const fetchDataSuccess = (hotels: IHotel[]) => ({
  type: FETCH_DATA_SUCCESS,
  payload: hotels,
});

export const fetchDataFailure = (error: string) => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});
