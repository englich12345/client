import { USER } from "../actions";

const initState = {
  listUser: [],
  loading: false,
  arrUser: [],
  totalPage: 0
};

export default function userReducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER.USER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case USER.USER_SUCCESS:
      return {
        ...state,
        loading: false,
        listUser: payload.sources,
        totalPage: payload.totalPages
      }
    case USER.USER_FAIL:
      return {
        ...state,
        loading: false
      }
    case USER.USER_GET_ARR_USER:
      return Object.assign({}, state, {
        arrUser: payload
      });
    case USER.USER_GET_USER:
      return Object.assign({}, state, {
        arrUser: [...state.arrUser, payload]
      });

    default:
      return state;
  }
}
