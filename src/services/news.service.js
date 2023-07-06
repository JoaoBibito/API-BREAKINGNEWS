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

export const findByIdService = (id) => News.findById(id).populate("user");

export const updateService = (id, title, text, banner) =>
 News.findOneAndUpdate({_id: id}, {title, text, banner}, {rowResult: true});

export const eraseService = (id) => News.findByIdAndDelete({_id: id});

export const likeNewsService = async (idNews, userId) =>
 News.findOneAndUpdate(
  {_id: idNews, "likes.userId": {$nin: [userId]}},
  {$push: {likes: {userId, created: new Date()}}}
 );

export const deleteLikeNewsService = async (idNews, userId) =>
 News.findOneAndUpdate({_id: idNews}, {$pull: {likes: {userId}}});

export const addCommentService = async (idNews, comment, userId) => {
 let idComment = Math.floor(Date.now() * Math.random()).toString(36);
 return News.findOneAndUpdate(
  {_id: idNews},
  {$push: {comments: {idComment, userId, comment, cratedAt: new Date()}}}
 );
};
export const deleteCommentService = async (idNews, idComment, userId) =>
 News.findOneAndUpdate({_id: idNews}, {$pull: {comments: {idComment, userId}}});
