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
    const {id: newsId} = req.params;
    const userIdLogged = req.userId;
    const response = await eraseNewsService(newsId, userIdLogged);

    return res.send(response);
  } catch (err) {
    return res.status(500).send({message: err.message});
  }
};

export const likeNewsController = async (req, res) => {
  try {
    const {id: idNews} = req.params;
    const userIdLogged = req.userId;
    const newsLiked = await likeNewsService(idNews, userIdLogged);
    res.send(newsLiked);
  } catch (err) {
    return res.status(500).send({message: err.message});
  }
};

export const addCommentController = async (req, res) => {
  try {
    const {id: idNews} = req.params;
    const userId = req.userId;
    const {comment} = req.body;
    const response = await addCommentService(idNews, comment, userId);
    res.send(response);
  } catch (err) {
    return res.status(500).send({message: err.message});
  }
};

export const deleteCommentController = async (req, res) => {
  try {
    const {idNews, idComment} = req.params;
    const userId = req.userId;
    const response = await deleteCommentService(idNews, idComment, userId);
    return res.send(response);
  } catch (err) {
    return res.status(500).send({message: err.message});
  }
};
