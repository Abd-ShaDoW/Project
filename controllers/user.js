const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const { authSchema } = require('../helpers/validate');

const prisma = new PrismaClient();

const signUp = async (req, res) => {
  try {
    const result = await authSchema.validateAsync(req.body);
    console.log(result);

    const used = await prisma.user.findFirst({
      where: { email: req.body.email },
    });
    if (used) {
      throw Error('email already used');
    }

    const user = await prisma.user.create({
      data: {
        email: result.email,
        name: result.name,
        password: await bcrypt.hash(result.password, 10),
      },
    });

    return res.status(201).json(user);
  } catch (e) {
    console.log(e);
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw Error('Please provide email and password');
    }

    const user = await prisma.user.findFirst({
      where: { email: req.body.email },
    });
    if (!user) {
      throw Error('invalid credentials');
    }

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      throw Error('invalid password');
    }

    const token = JWT.sign(
      {
        userId: user.id,
        name: user.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );

    return res.status(200).json({ user, token });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  signIn,
  signUp,
};
