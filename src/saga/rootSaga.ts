import {all} from 'redux-saga/effects';
import hotelSaga from './apiSaga';

function* rootSaga() {
  yield all([hotelSaga()]);
}

export default rootSaga;
