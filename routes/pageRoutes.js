const express = require('express');
const router = express.Router();
const { getHomePage, getAboutPage, getContactPage, postContactForm } = require('../controllers/pageController');

router.get('/', getHomePage);
router.get('/about', getAboutPage);
router.get('/contact', getContactPage);
router.post('/contact', postContactForm);

module.exports = router;