import Immutable from "immutable";
import { combineReducers } from "redux-immutable";
import { post } from "../../utils/request";
import url from "../../utils/url";
import { actions as appActions } from "./app";

// action types
export const types = {
  CREATE_POST: "POSTS/CREATE_POST",
  UPDATE_POST: "POSTS/UPDATE_POST",
  FETCH_ALL_POSTS: "POSTS/FETCH_ALL_POSTS", // 获取帖子列表
  FETCH_POST: "POSTS/FETCH_POST", // 获取帖子详情
  POST_STAR: "POST/POST_STAR", // 收藏
  POST_PRAISE: "POST/POST_PRAISE", // 点赞
};

export const praiseOrStarTypes = {
  mapTypeStar: 1, // 收藏
  mapTypePraise: 2, //点赞
  methodInsert: "userStarAndPraiseInsert",
  methodDelete: "userStarAndPraiseDelete",
};

// 获取帖子列表的过滤条件
const getPostListRequest = (userId, pathname) => ({
  method: "getPostList",
  jsonStringParameter: JSON.stringify({ recordsLimit: 5, userId, pathname }),
});

// 获取帖子详情的过滤条件
const getPostByIdRequest = (id, userId) => ({
  method: "getPostByPrimaryKey",
  jsonStringParameter: JSON.stringify({
    userId, whereFieldValue: id,
  }),
});

// 创建帖子请求数据
const getNewPostRequest = (userId, title, content) => ({
  method: "insertPost",
  jsonStringParameter: JSON.stringify({
    userId, title, content,
  }),
});

// 修改帖子请求数据
const getUpdatePostRequest = (postId, title, content) => ({
  method: "updatePost",
  jsonStringParameter: JSON.stringify({
    postId, title, content,
  }),
});

// 给帖子点赞/取消点赞、收藏/取消收藏
const getPostPraiseOrStarRequest = (postId, userId, mapType, method) => ({
  method,
  jsonStringParameter: JSON.stringify({
    postId, userId, mapType,
  }),
});

// action creators
export const actions = {
  // 给帖子点赞/取消点赞、收藏/取消收藏
  postPraiseOrStar: (postItem, mapType, method) => (dispatch, getState) => {
    const state = getState();
    let userId = getUserId(state);

    if (userId === 0) {
      alert("请先登录");
      return;
    }

    dispatch(appActions.startRequest());
    return post(url.getApiUri(), getPostPraiseOrStarRequest(postItem.id, userId, mapType, method)).then((data) => {
      dispatch(appActions.finishRequest());
      if (data.code === 1) {
        dispatch(postPraiseOrStarSuccess(postItem, mapType, method));
      } else {
        dispatch(appActions.setError(data.message));
      }
    });
  },

  // 获取帖子列表
  fetchAllPosts: (pathname) => (dispatch, getState) => {
    const state = getState();
    let userId = state.getIn(["auth", "userId"]);
    userId = userId === null ? "" : userId;

    if (shouldFetchAllPosts(getState())) {
      dispatch(appActions.startRequest());
      return post(url.getApiUri(), getPostListRequest(userId, pathname)).then((data) => {
        dispatch(appActions.finishRequest());
        if (data.code === 1) {
          const { posts, postsIds, authors } = convertPostsToPlain(data.responseData);
          dispatch(fetchAllPostsSuccess(posts, postsIds, authors));
        } else {
          dispatch(appActions.setError(data.message));
        }
      });
    }
  },
  // 获取帖子详情
  fetchPost: id => (dispatch, getState) => {
    if (shouldFetchPost(id, getState())) {
      dispatch(appActions.startRequest());
      return post(url.getApiUri(), getPostByIdRequest(id, getUserId(getState()))).then((data) => {
        dispatch(appActions.finishRequest());
        if (data.code === 1) {
          const { post, author } = convertSinglePostToPlain(data.responseData[0]);
          dispatch(fetchPostSuccess(post, author));
        } else {
          dispatch(appActions.setError(data.message));
        }
      });
    }
  },
  // 新建帖子
  createPost: (title, content) => (dispatch, getState) => {
    const state = getState();
    const author = state.getIn(["auth", "userId"]);
    const params = getNewPostRequest(author, title, content);
    dispatch(appActions.startRequest());
    return post(url.getApiUri(), params).then((data) => {
      dispatch(appActions.finishRequest());
      if (data.code === 1) {
        dispatch(createPostSuccess(data.responseData));
      } else {
        dispatch(appActions.setError(data.message));
      }
    });
  },
  // 更新帖子
  updatePost: (id, postItem) => (dispatch) => {
    const params = getUpdatePostRequest(id, postItem.title, postItem.content);
    dispatch(appActions.startRequest());
    return post(url.getApiUri(), params).then((data) => {
      dispatch(appActions.finishRequest());
      if (data.code === 1) {
        dispatch(updatePostSuccess(data.responseData));
      } else {
        dispatch(appActions.setError(data.message));
      }
    });
  },
};

// 获取帖子列表成功
const fetchAllPostsSuccess = (posts, postIds, authors) => ({
  type: types.FETCH_ALL_POSTS,
  posts,
  postIds,
  users: authors,
});

// 获取帖子详情成功
const fetchPostSuccess = (post, author) => ({
  type: types.FETCH_POST,
  post,
  user: author,
});

// 新建帖子成功
const createPostSuccess = post => ({
  type: types.CREATE_POST,
  post,
});

// 修改帖子成功
const updatePostSuccess = post => ({
  type: types.UPDATE_POST,
  post,
});

// 给帖子点赞成功
const postPraiseOrStarSuccess = (post, mapType, method) => {
  let type = null;

  if (mapType === praiseOrStarTypes.mapTypeStar) {
    type = types.POST_STAR;
  } else if (mapType === praiseOrStarTypes.mapTypePraise) {
    type = types.POST_PRAISE;
  }

  return {
    type,
    post,
    method,
  }
};

const shouldFetchAllPosts = (state) => {
  const allIds = state.getIn(["posts", "allIds"]);
  return !allIds || allIds.size === 0;
};

const shouldFetchPost = (id, state) => {
  /**
   * state中如果已经存在该post对象，且有content字段，
   * 则表明state中已经有该post的完整信息，无需再次发送请求
   * */
  const post = state.getIn(["posts", "byId", id]);
  return !post || !post.get("content");
};

const convertPostsToPlain = (posts) => {
  const postsById = {};
  const postsIds = [];
  const authorsById = {};
  posts.forEach((item) => {
    postsById[item.id] = { ...item, author: item.author.id };
    postsIds.push(item.id);
    if (!authorsById[item.author.id]) {
      authorsById[item.author.id] = item.author;
    }
  });
  return {
    posts: postsById,
    postsIds,
    authors: authorsById,
  };
};

const convertSinglePostToPlain = (post) => {
  const plainPost = { ...post, author: post.author.id };
  const author = { ...post.author };
  return {
    post: plainPost,
    author,
  };
};

// reducers
const allIds = (state = Immutable.fromJS([]), action) => {
  switch (action.type) {
    case types.FETCH_ALL_POSTS:
      // https://www.cnblogs.com/hxling/articles/8016443.html 合并列表
      return Immutable.List(action.postIds);
    case types.CREATE_POST:
      return state.unshift(action.post.id);
    default:
      return state;
  }
};

const byId = (state = Immutable.fromJS({}), action) => {
  let newPost = null;

  switch (action.type) {
    case types.FETCH_ALL_POSTS:
      return state.merge(action.posts);
    case types.FETCH_POST:
    case types.CREATE_POST:
    case types.UPDATE_POST:
      return state.merge({ [action.post.id]: action.post });
    case types.POST_PRAISE:
      let vote = getVoteByMehtod(action.post.vote, action.method);
      newPost = {...action.post, vote, author: action.post.author.id, flagPraise: getPraiseOrStarFlagByMethod(action.method)};
      return state.merge({ [action.post.id]: newPost });
    case types.POST_STAR:
      newPost = {...action.post, author: action.post.author.id, flagStar: getPraiseOrStarFlagByMethod(action.method)};
      return state.merge({ [action.post.id]: newPost });
    default:
      return state;
  }
};

function getVoteByMehtod(vote, method) {
  if (method === praiseOrStarTypes.methodInsert) {
    vote++;
  } else {
    vote--;
  }

  return vote;
}

function getPraiseOrStarFlagByMethod(method) {
  return method === praiseOrStarTypes.methodInsert;
}

function getUserId(state) {
  let userId = state.getIn(["auth", "userId"]);

  if (userId === null) {
    userId = 0;
  }

  return userId;
}

const reducer = combineReducers({
  allIds,
  byId,
});

export default reducer;

// selectors
// 获取所有帖子 id
export const getPostIds = state => state.getIn(["posts", "allIds"]);

// 获取帖子列表
export const getPostList = state => state.getIn(["posts", "byId"]);

// 获取帖子详情
export const getPostById = (state, id) => state.getIn(["posts", "byId", id]);
