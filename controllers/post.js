const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAll = async (req, res) => {
  try {
    html;
    const posts = await prisma.post.findMany({
      where: {
        authorId: req.user.id,
      },
    });

    return res.status(200).json(posts);
  } catch (e) {
    console.log(e);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
      where: {
        id: +id,
      },
    });

    res.status(200).json(post);
  } catch (e) {
    console.log(e);
  }
};

const create = async (req, res) => {
  try {
    const post = await prisma.post.create({
      data: {
        title: req.body.title,
        authorId: req.user.id,
      },
    });

    return res.status(201).json(post);
  } catch (e) {
    console.log(e);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.update({
      where: { id: +id, authorId: req.user.id },
      data: { title: req.body.title },
    });

    return res.status(200).json(post);
  } catch (e) {
    console.log(e);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.delete({
      where: {
        id: +id,
        authorId: req.user.id,
      },
    });

    return res.status(200).json(post);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
