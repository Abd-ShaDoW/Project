const express = require('express');
const router = express.Router();
const authMiddleWare = require('../middleware/auth');

const { getAll, create, update, remove } = require('../controllers/comment');

router.route('/').get(authMiddleWare, getAll).post(authMiddleWare, create);
router
  .route('/:id')
  .patch(authMiddleWare, update)
  .delete(authMiddleWare, remove);

module.exports = router;
