const express = require('express');
const router = express.Router();
const authMiddleWare = require('../middleware/auth');

const {
  getAll,
  getOne,
  create,
  update,
  remove,
} = require('../controllers/post');

router.route('/').get(authMiddleWare, getAll).post(authMiddleWare, create);
router
  .route('/:id')
  .get(authMiddleWare, getOne)
  .patch(authMiddleWare, update)
  .delete(authMiddleWare, remove);

module.exports = router;
