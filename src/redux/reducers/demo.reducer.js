import { DEMO_SAGA } from "../actions";

const initState = {
  post: null,
  message: 'No request',
  fetching: false,
  fetched: false,
  fetchFailed: false
};

export default function demoReducer(state = initState, action) {
  switch (action.type) {
    case DEMO_SAGA.DEMO_REQUESTING:
      return Object.assign({}, state, {
        fetching: true,
        fetched: false,
        fetchFailed: false,
        message: 'Loading...'
      });
    case DEMO_SAGA.DEMO_FULFILLED:
      return Object.assign({}, state, {
        fetching: false,
        fetched: true,
        fetchFailed: false,
        message: 'Done',
        post: action.post
      });
    case DEMO_SAGA.DEMO_REJECTED:
      return Object.assign({}, state, {
        fetching: false,
        fetched: false,
        fetchFailed: true,
        message: 'Failed'
      });
    default:
      return state;
  }
}
