// 获取帖子列表的过滤条件
const postListRequest = {
  method: "getPostList",
  jsonStringParameter: JSON.stringify({ recordsLimit: 5, orderBy: "updatedAt DESC" }),
};

// 获取帖子详情的过滤条件
const postByIdFilter = id => ({
  fields: ["id", "title", "author", "vote", "updatedAt", "content"],
  where: { id },
  include: "authorPointer",
  includefilter: { user: { fields: ["id", "username"] } },
});

// 获取评论列表的过滤条件
const commentListFilter = postId => ({
  fields: ["id", "author", "updatedAt", "content"],
  where: { post: postId },
  limit: 5,
  order: "updatedAt DESC",
  include: "authorPointer",
  includefilter: { user: { fields: ["id", "username"] } },
});

function encodeFilter(filter) {
  return encodeURIComponent(JSON.stringify(filter));
}

export default {
  login: () => "/user/login",
  // 获取帖子列表
  // getPostList: () => `/bbsApi?baseRequest=${encodeFilter(postListFilter)}`,
  getPostList: () => "/bbsApi",
  // 获取帖子详情
  getPostById: id => `/bbsApi?baseRequest=${encodeFilter(postByIdFilter(id))}`,
  // 新建帖子
  createPost: () => "/bbsApi",
  // 修改帖子
  updatePost: id => `/bbsApi/${id}`,
  // 获取评论列表
  getCommentList: postId => `/comment?baseRequest=${encodeFilter(commentListFilter(postId))}`,
  // 创建评论
  createComment: () => "/comment",

  getPostListRequest: () => postListRequest,
};
