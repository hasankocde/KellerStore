"use strict"

const router = require('express').Router();

// routes/token:
const { isAdmin, isLogin } = require('../middlewares/permissions');
const token = require('../controllers/token.controller');

// URL: /tokens
router.route('/')
  .get(isLogin, token.list)
  .post(isLogin, token.create);

router.route('/:id')
  .get(isLogin, token.read)
  .put(isLogin, token.update)
  .delete(isLogin, token.delete);

module.exports = router;
