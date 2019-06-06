import { call, put, takeLatest } from "redux-saga/effects";
import { delay } from "redux-saga";
import { DEMO_SAGA } from "../actions";
import products from "../../helpers/mock-data/products";

function* requestDemo() {
  try {
    // const post = yield call(
    //   request.get.bind(request),
    //   "https://5acdca4623cb4e00148b8397.mockapi.io/green/products"
    // );
    const post = products;
    yield call(delay, 3000);
    yield put({ type: DEMO_SAGA.DEMO_FULFILLED, post });
  } catch (e) {
    yield put({ type: DEMO_SAGA.DEMO_REJECTED });
  }
}

export function* watchDemoSagasAsync() {
  yield takeLatest(DEMO_SAGA.DEMO_REQUESTING, requestDemo);
}
