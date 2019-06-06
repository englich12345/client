import { all, fork } from "redux-saga/effects";
import { watchDemoSagasAsync } from "./demo.saga";
import { watchUserAsync } from "./user.saga";
export default function* sagas() {
  yield all([
    fork(watchDemoSagasAsync),
    fork(watchUserAsync)
  ]);
}
