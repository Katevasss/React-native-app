import {call, put, takeLatest} from 'redux-saga/effects';
import axios, {AxiosResponse} from 'axios';
import {
  FETCH_DATA_REQUEST,
  fetchDataFailure,
  fetchDataSuccess,
} from '../redux/apiActions';

function* fetchHotels(action: any) {
  try {
    const response: AxiosResponse = yield call(
      axios.get,
      `http://engine.hotellook.com/api/v2/cache.json?location=${action.payload.location}&checkIn=${action.payload.checkIn}&checkOut=${action.payload.checkOut}&limit=10`,
    );
    yield put(fetchDataSuccess(response.data));
  } catch (error: any) {
    yield put(fetchDataFailure(error.message));
  }
}

function* hotelSaga() {
  yield takeLatest(FETCH_DATA_REQUEST, fetchHotels);
}

export default hotelSaga;
