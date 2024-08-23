const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const authController = require('../controllers/authController');

// Login Page
router.get('/login', (req, res) => res.render('auth/login'));

// Register Page (for the first admin)
router.get('/register', (req, res) => res.render('auth/register'));

// Register Handle
router.post('/register/admin', authController.registerAdmin);
router.post('/register/customer', authController.registerCustomer);

// Login Handle
router.post('/login', authController.login);

// Logout Handle
router.get('/logout', authController.logout);

// Please note that the following routes are protected by the ensureAuthenticated middleware, && should be uncommented when the authentication is fully implemented
// Admin Dashboard/Profile (ensureAuthenticated middleware to protect routes)
// router.get('/admins/dashboard', ensureAuthenticated, (req, res) => res.render('admins/dashboard', { admin: req.user }));

// Customer Profile
// router.get('/customers/profile', ensureAuthenticated, (req, res) => res.render('customers/profile', { customer: req.user }));

module.exports = router;