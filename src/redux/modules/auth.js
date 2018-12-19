import Immutable from "immutable";
import { post } from "../../utils/request";
import url from "../../utils/url";
import { actions as appActions } from "./app";

const initialState = Immutable.fromJS({
  userId: null, // 当前登录用户的 id
  username: null, // 当前登录用户的用户名
});

// action types
export const types = {
  LOGIN: "AUTH/LOGIN",
  LOGOUT: "AUTH/LOGOUT",
};

const userLoginRequest = (username, password) => (
  {
    method: "userLogin",
    jsonStringParameter: JSON.stringify({ username, password }),
  }
);

// action creators
export const actions = {
  login: (username, password) => (dispatch) => {
    dispatch(appActions.startRequest());
    return post(url.getApiUri(), userLoginRequest(username, password)).then((data) => {
      dispatch(appActions.finishRequest());
      if (data.code === 1) {
        dispatch(actions.setLoginInfo(data.responseData.userId, username));
      } else {
        dispatch(appActions.setError(data.message));
      }
    });
  },
  logout: () => ({
    type: types.LOGOUT,
  }),
  setLoginInfo: (userId, username) => ({
    type: types.LOGIN,
    userId,
    username,
  }),
};

// reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return state.merge({ userId: action.userId, username: action.username });
    case types.LOGOUT:
      return state.merge({ userId: null, username: null });
    default:
      return state;
  }
};

export default reducer;

// selectors
export const getLoggedUser = state => state.get("auth");
