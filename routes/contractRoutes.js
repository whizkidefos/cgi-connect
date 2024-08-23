const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contractController');
const { ensureAuthenticated } = require('../config/auth');

// Get All Contracts
router.get('/', ensureAuthenticated, contractController.getAllContracts);

// Create a New Contract
router.post('/create', ensureAuthenticated, contractController.createContract);

// Update Contract
router.put('/:id', ensureAuthenticated, contractController.updateContract);

// Delete Contract
router.delete('/:id', ensureAuthenticated, contractController.deleteContract);

module.exports = router;