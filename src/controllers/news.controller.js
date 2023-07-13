import {
 createNewsService,
 findAllNewsService,
 countNews,
 topNewsService,
 findNewsByIdService,
 searchNewsByTitleService,
 byUserService,
 updateNewsService,
 eraseNewsService,
 likeNewsService,
 deleteLikeNewsService,
 addCommentService,
 deleteCommentService,
} from "../services/news.service.js";

export const createNewsController = async (req, res) => {
 try {
  await createNewsService(req.body, req.userId);
  res.sendStatus(201);
 } catch (err) {
  return res.status(500).send(err.message);
 }
};

export const findAllNewsController = async (req, res) => {
 try {
  const news = await findAllNewsService(req.query, req.baseUrl);
  return res.send(news);
 } catch (err) {
  return res.status(500).send({message: err.message});
 }
};

export const topNewsController = async (req, res) => {
 try {
  const news = await topNewsService();
  return res.send(news);
 } catch (err) {
  return res.sendStatus(500).send({message: err.message});
 }
};

export const searchNewsByTitleController = async (req, res) => {
 try {
  const news = await searchNewsByTitleService(req.query.title);
  return res.send(news);
 } catch (e) {
  return res.status(500).send(e.message);
 }
};

export const byUserController = async (req, res) => {
 try {
  const news = await byUserService(req.userId);
  return res.send(news);
 } catch (err) {
  return res.status(500).send({message: err.message});
 }
};

export const findNewsByIdController = async (req, res) => {
 try {
  const {id} = req.params;
  const news = await findNewsByIdService(id);
  return res.send(news);
 } catch (err) {
  return res.status(500).send({message: err.message});
 }
};

export const updateNewsController = async (req, res) => {
 try {
  const {title, text, banner} = req.body;
  const {id} = req.params;
  const userIdLogged = req.userId;

  await updateNewsService(id, title, text, banner, userIdLogged);
  return res.send({message: "News successfully updated!"});
 } catch (err) {
  return res.status(500).send({message: err.message});
 }
};

export const eraseNewsController = async (req, res) => {
 try {
  const {id:newsId} = req.params;
  const userIdLogged =req.userId;
  const response = await eraseNewsService(newsId,userIdLogged);
 
  return res.send(response);
 } catch (err) {
  return res.status(500).send({message: err.message});
 }
};

export const likeNewsController = async (req, res) => {
 try {
  const {id:idNews} = req.params;
  const userIdLogged = req.userId;
  const newsLiked = await likeNewsService( idNews,userIdLogged)
  res.send({message: "Like done successfully"});
 } catch (err) {
  return res.status(500).send({message: err.message});
 }
};

export const addCommentController = async (req, res) => {
 try {
  const {id} = req.params;
  const userId = req.userId;
  const {comment} = req.body;

  if (!comment) {
   return res.status(404).send({message: "Write a message to comment"});
  }
  await addCommentService(id, comment, userId);

  res.send({message: "Comment successfully completed"});
 } catch (err) {
  return res.status(500).send({message: err.message});
 }
};

export const deleteCommentController = async (req, res) => {
 try {
  const {idNews, idComment} = req.params;
  const userId = req.userId;

  const commendtDeleted = await deleteCommentService(idNews, idComment, userId);

  const commentFinder = commendtDeleted.comments.find(
   (comment) => comment.idComment === idComment
  );
  if (!commentFinder) {
   return res.status(400).send({message: "Comment not found"});
  }
  if (commentFinder.userId !== userId) {
   return res.status(400).send({message: "You can't delete this comment"});
  }
  res.send({message: "Comment successfully removed"});
 } catch (err) {
  return res.status(500).send({message: err.message});
 }
};
