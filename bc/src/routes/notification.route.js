"use strict"

const router = require('express').Router();
const notificationController = require('../controllers/notification.controller');
const { isLogin, isAdmin } = require('../middlewares/permissions');

// URL: /notifications
router.route('/')
  .get(isLogin, notificationController.list)  // Get all notifications, admin sees all, users see theirs
  .post(isLogin, notificationController.create);  // Create a new notification

router.route('/:id')
  .get(isLogin, notificationController.read)  // Get a specific notification
  .put(isLogin, isAdmin, notificationController.update)  // Update a specific notification, admins only
  .delete(isLogin, isAdmin, notificationController.delete);  // Delete a specific notification, admins only

module.exports = router;
