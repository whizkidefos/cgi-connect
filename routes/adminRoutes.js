const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { ensureAuthenticated } = require('../config/auth');

// Admin Dashboard
router.get('/dashboard', ensureAuthenticated, adminController.getDashboard);

// Create a New Admin
router.post('/create', ensureAuthenticated, adminController.createAdmin);

// Delete Admin
router.delete('/:id', ensureAuthenticated, adminController.deleteAdmin);

module.exports = router;