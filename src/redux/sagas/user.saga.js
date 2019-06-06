import { call, put, takeLatest } from "redux-saga/effects";
import { USER } from "../actions";
import userApi from '../../api/userApi'

function* requestUser(params) {
  try {
      const data = yield call(getRequestUser.bind(this, params.payload))
      yield put({ type: USER.USER_SUCCESS, payload: data })
  } catch (error) {
      yield put({ type: USER.USER_FAIL })
  }
}

function getRequestUser(params) {
  return userApi.GetUser(params).then(response => {
      return response
  })
}

export function* watchUserAsync() {
  yield takeLatest(USER.USER_REQUEST, requestUser);
}
