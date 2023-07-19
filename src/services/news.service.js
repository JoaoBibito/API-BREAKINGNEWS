import News from "../models/News.js";
import newsRepositories from "../repositories/news.repositories.js";

export const createNewsService = async (body, userId) => {
 const {title, text, banner} = body;

 if (!title || !text || !banner)
  throw new Error("Submit all fields for registration");

 const news = await newsRepositories.createNewsRepository({
  title,
  text,
  banner,
  user: userId,
 });
 if (!news) throw new Error("Error creating News");

 return {
  news,
 };
};

export const findAllNewsService = async (query, currentURL) => {
 let {limit, offset} = query;
 limit = Number(limit);
 offset = Number(offset);
 if (!limit) {
  limit = 5;
 }
 if (!offset) {
  offset = 0;
 }
 const news = await newsRepositories.findAllNewsRepository(offset, limit);
 const total = await countNews();
 const next = offset + limit;
 const nextURL =
  next < total ? `${currentURL}?limit=${limit}&offset=${next}` : null;
 const previous = offset - limit < 0 ? null : offset - limit;
 const previousURL =
  previous != null ? `${currentURL}?limit=${limit}&offset=${previous}` : null;

 news.unshift();
 return {
  nextURL,
  previousURL,
  limit,
  offset,
  total,
  results: news.map((item) => ({
   id: item._id,
   title: item.title,
   text: item.text,
   banner: item.banner,
   likes: item.likes,
   comments: item.comments,
   name: item.user.name,
   userName: item.user.username,
   userAvatar: item.user.avatar,
  })),
 };
};

export const countNews = async () => {
 const totalNews = await newsRepositories.countNewsRepository();
 return totalNews;
};

export const topNewsService = async () => {
 const news = await newsRepositories.topNewsRepository();
 if (!news) throw new Error("There is no registered post");
 return {
  news: {
   id: news._id,
   title: news.title,
   text: news.text,
   banner: news.banner,
   likes: news.likes,
   comments: news.comments,
   name: news.user.name,
   userName: news.user.username,
   userAvatar: news.user.avatar,
  },
 };
};

export const searchNewsByTitleService = async (title) => {
 const news = await newsRepositories.searchNewsByTitleRepository(title);
 if (news.length === 0) throw new Error("there are no news with this title");
 return {
  results: news.map((item) => ({
   id: item._id,
   title: item.title,
   text: item.text,
   banner: item.banner,
   likes: item.likes,
   comments: item.comments,
   name: item.user.name,
   userName: item.user.username,
   userAvatar: item.user.avatar,
  })),
 };
};

export const byUserService = async (id) => {
 const news = await newsRepositories.byUserRepository(id);
 if (news.length === 0) throw new Error("there are no news from this user");
 return news;
};

export const findNewsByIdService = async (id) => {
 const news = await newsRepositories.findNewsByIdRepository(id);
 if (!news) throw new Error("there are no news from this Id");
 return {
  id: news._id,
  title: news.title,
  text: news.text,
  banner: news.banner,
  likes: news.likes,
  comments: news.comments,
  name: news.user.name,
  userId: news.user._id,
  userName: news.user.username,
  userAvatar: news.user.avatar,
 };
};

export const updateNewsService = async (
 id,
 title,
 text,
 banner,
 userIdLogged
) => {
 if (!title && !text && !banner)
  throw new Error("Submit all fields for registration");
 const news = await findNewsByIdService(id);
 if (!news) throw new Error("there are no news from this Id");
 if (news.userId != userIdLogged)
  throw new Error("You didn't update this post");

 await newsRepositories.updateNewsRepository(id, title, text, banner);
 return {message: "News successfully updated!"};
};

export const eraseNewsService = async (newsId, userIdLogged) => {
 const news = await findNewsByIdService(newsId);
 if (!news) throw new Error("there are no news from this Id");
 if (news.userId != userIdLogged)
  throw new Error("You didn't deleted this post");
 const newsDeleted = await newsRepositories.eraseNewsRepository(newsId);
 if (!newsDeleted) throw new Error("Error deleting news");
 return {message: "News deleted successfully"};
};

export const likeNewsService = async (idNews, userIdLogged) => {
 const newsLiked = await newsRepositories.likeNewsRepository(
  idNews,
  userIdLogged
 );
 if (!newsLiked) {
  const likeDeleted = await deleteLikeNewsService(idNews, userIdLogged);
  return likeDeleted;
 }
 return {message: "Like done successfully"};
};

export const deleteLikeNewsService = async (idNews, userId) => {
 const likeDeleted = await newsRepositories.deleteLikeNewsRepository(
  idNews,
  userId
 );
 if (!likeDeleted) throw new Error("Failed to delete the like");
 return {message: "Like successfully removed"};
};

export const addCommentService = async (idNews, comment, userIdLogged) => {
 if (!comment) throw new Error("Write a message to comment");

 const commentCreated = await newsRepositories.addCommentNewsRepository(
  idNews,
  comment,
  userIdLogged
 );
 if (!commentCreated) throw new Error("Error to add comment");
 return {message: "Comment successfully completed"};
};

export const deleteCommentService = async (idNews, idComment, userIdLogged) =>{

  const news = await newsRepositories.findNewsByIdRepository(idNews);
if (!news) throw new Error("News not found");

   const commendtDeleted = await newsRepositories.deleteCommentNewsRepository(idNews,idComment,userIdLogged);

   const commentFinder=commendtDeleted.comments.find((comment) => comment.idComment === idComment)
   if (!commentFinder) throw new Error("Comment not found") 
  
  if (commentFinder.userId !== userIdLogged) throw new Error("You can't delete this comment");
  return {message: "Comment successfully removed"}
}

