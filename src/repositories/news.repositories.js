import News from "../models/News.js";

const createNewsRepository = (body) => News.create(body);

const findAllNewsRepository = (offset, limit) =>
 News.find().sort({_id: -1}).skip(offset).limit(limit).populate("user");

const countNewsRepository = () => News.countDocuments();

const topNewsRepository = () => News.findOne().sort({_id: -1}).populate("user");

const findNewsByIdRepository = (id) => News.findById(id).populate("user");

const searchNewsByTitleRepository = (title) =>
 News.find({
  title: {$regex: `${title || ""}`, $options: "i"},
 })
  .sort({_id: -1})
  .populate("user");

const byUserRepository = (id) =>
 News.find({user: id}).sort({_id: -1}).populate("user");

const updateNewsRepository = (id, title, text, banner) =>
News.findOneAndUpdate({_id: id}, {title, text, banner}, {rowResult: true});

const eraseNewsRepository = (id) => News.findByIdAndDelete({_id: id});

const likeNewsRepository = async (idNews, userId) =>
 News.findOneAndUpdate(
  {_id: idNews, "likes.userId": {$nin: [userId]}},
  {$push: {likes: {userId, created: new Date()}}}
 );

const deleteLikeNewsRepository = async (idNews, userId) =>
 News.findOneAndUpdate({_id: idNews}, {$pull: {likes: {userId}}});

const addCommentNewsRepository = async (idNews, comment, userId) => {
 let idComment = Math.floor(Date.now() * Math.random()).toString(36);
 return News.findOneAndUpdate(
  {_id: idNews},
  {$push: {comments: {idComment, userId, comment, cratedAt: new Date()}}}
 );
};
const deleteCommentNewsRepository = async (idNews, idComment, userId) =>
 News.findOneAndUpdate({_id: idNews}, {$pull: {comments: {idComment, userId}}});

export default {
 createNewsRepository,
 findAllNewsRepository,
 countNewsRepository,
 topNewsRepository,
 findNewsByIdRepository,
 searchNewsByTitleRepository,
 byUserRepository,
 updateNewsRepository,
 eraseNewsRepository,
 likeNewsRepository,
 deleteLikeNewsRepository,
 addCommentNewsRepository,
 deleteCommentNewsRepository,
};
