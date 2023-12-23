const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAll = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        authorId: req.user.id,
        postId: req.body.postId,
      },
    });
    return res.json(comments);
  } catch (e) {
    console.log(e);
  }
};

const create = async (req, res) => {
  try {
    console.log(req.user);
    const comment = await prisma.comment.create({
      data: {
        text: req.body.text,
        authorId: req.user.id,
        postId: req.body.postId,
      },
    });

    return res.status(201).json(comment);
  } catch (e) {
    console.log(e);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;

    const update = await prisma.comment.update({
      where: {
        id: +id,
        authorId: req.user.id,
        postId: req.body.postId,
      },
      data: { text: req.body.text },
    });

    return res.status(200).json(update);
  } catch (e) {
    console.log(e);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteComment = await prisma.comment.delete({
      where: {
        id: +id,
        authorId: req.user.id,
        postId: req.body.postId,
      },
    });

    return res.status(200).json(deleteComment);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAll,
  create,
  update,
  remove,
};
