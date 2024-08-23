const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { ensureAuthenticated } = require('../config/auth');

// Get All Customers
router.get('/', ensureAuthenticated, customerController.getAllCustomers);

// Create a New Customer
router.post('/create', ensureAuthenticated, customerController.createCustomer);

// Update Customer Profile
router.put('/:id', ensureAuthenticated, customerController.updateCustomer);

// Delete Customer
router.delete('/:id', ensureAuthenticated, customerController.deleteCustomer);

module.exports = router;