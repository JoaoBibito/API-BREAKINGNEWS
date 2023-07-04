import {
 createNewsService,
 findAllNewsService,
 countNews,
 topNewsService,
 findByIdService,
 searchByTitleService,
 byUserService,
 updateService,
 eraseService,
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
  const news = await findAllNewsService(req.query,req.baseUrl);
  return res.send(news)
 } catch (err) {
  return res.status(500).send({message: err.message});
 }
};

export const topNewsController = async (req, res) => {
 try {
  const news = await topNewsService();
  console.log(news)
  if (!news) {
   return res.status(400).send({message: "There is no registered post"});
  }
  return res.send(news);
 } catch (err) {
  return res.sendStatus(500).send({message: err.message});
 }
};

export const searchByTitleController = async (req, res) => {
 try {
  const news = await searchByTitleService(req.query.title);
  return res.send(news);
 } catch (err) {
  return res.status(500).send({message: err.message});
 }
};

export const byUserController = async (req, res) => {
 try {
  const id = req.userId;
  const news = await byUserService(id);

  return res.send({
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
  });
 } catch (err) {
  return res.status(500).send({message: err.message});
 }
};

export const findByIdController = async (req, res) => {
 try {
  const {id} = req.params;
  const news = await findByIdService(id);
  return res.send({
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
  });
 } catch (err) {
  return res.status(500).send({message: err.message});
 }
};

export const updateController = async (req, res) => {
 try {
  const {title, text, banner} = req.body;
  const {id} = req.params;

  if (!title && !text && !banner) {
   return res.status(400).send({message: "Submit all fields for registration"});
  }

  const news = await findByIdService(id);

  if (news.user._id != req.userId) {
   return res.status(400).send({message: "You didn't update this post"});
  }

  await updateService(id, title, text, banner);
  return res.send({message: "News successfully updated!"});
 } catch (err) {
  return res.status(500).send({message: err.message});
 }
};

export const eraseController = async (req, res) => {
 try {
  const {id} = req.params;
  const news = await findByIdService(id);
  if (!news) {
   return res.sendStatus(404);
  }
  if (news.user._id != req.userId) {
   return res.status(400).send({message: "You didn't update this post"});
  }
  await eraseService(id);
  return res.send({message: "News deleted successfully"});
 } catch (err) {
  return res.status(500).send({message: err.message});
 }
};

export const likeNewsController = async (req, res) => {
 try {
  const {id} = req.params;
  const userId = req.userId;

  const newsLiked = await likeNewsService(id, userId);
  if (!newsLiked) {
   await deleteLikeNewsService(id, userId);
   return res.status(200).send({message: "Like successfully removed"});
  }
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
