import Immutable from "immutable";

const initialState = Immutable.fromJS({
  requestQuantity: 0, // 当前应用中正在进行的 API 请求数
  error: null         // 应用全局错误信息
});

// action types
export const types = {
  START_REQUEST: "APP/START_REQUEST",    // 开始发送请求
  FINISH_REQUEST: "APP/FINISH_REQUEST",  // 请求结束
  SET_ERROR: "APP/SET_ERROR",            // 设置错误信息
  REMOVE_ERROR: "APP/REMOVE_ERROR"       // 删除错误信息
};

// action creators
export const actions = {
  startRequest: () => ({
    type: types.START_REQUEST
  }),
  finishRequest: () => ({
    type: types.FINISH_REQUEST
  }),
  setError: error => ({
    type: types.SET_ERROR,
    error
  }),
  removeError: () => ({
    type: types.REMOVE_ERROR
  })
};

// reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.START_REQUEST:
      // 开始发送请求 requestQuantity 加 1
      return state.merge({ requestQuantity: state.get("requestQuantity") + 1 });
    case types.FINISH_REQUEST:
      // 请求结束 requestQuantity 减 1
      return state.merge({ requestQuantity: state.get("requestQuantity") - 1 });
    case types.SET_ERROR:
      return state.merge({ error: action.error });
    case types.REMOVE_ERROR:
      return state.merge({ error: null });
    default:
      return state;
  }
};

export default reducer;

// selectors
export const getError = state => {
  return state.getIn(["app", "error"]);
};

export const getRequestQuantity = state => {
  return state.getIn(["app", "requestQuantity"]);
};
