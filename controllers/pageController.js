const Message = require('../models/Message');
const nodemailer = require('nodemailer');

// Home Page
exports.getHomePage = (req, res) => {
    res.render('pages/home');
};

// About Page
exports.getAboutPage = (req, res) => {
    res.render('pages/about');
};

// Contact Page
exports.getContactPage = (req, res) => {
    res.render('pages/contact');
};

// Handle Contact Form Submission
exports.postContactForm = async (req, res) => {
    const { name, email, message } = req.body;
    let errors = [];

    // Server-side validation
    if (!name || !email || !message) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    if (errors.length > 0) {
        res.render('pages/contact', { errors, firstname, lastname, email, purpose, message });
    } else {
        try {
            const newMessage = new Message({ firstname, lastname, email, purpose, message });
            await newMessage.save();

            // Setup Nodemailer
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const mailOptions = {
                from: email,
                to: process.env.EMAIL_USER,
                subject: 'New Contact Form Submission',
                text: message,
            };

            await transporter.sendMail(mailOptions);

            req.flash('success_msg', 'Message sent successfully');
            res.redirect('/contact');
        } catch (err) {
            console.error(err);
            res.render('pages/contact', {
                errors: [{ msg: 'An error occurred. Please try again later.' }],
                name,
                email,
                message,
            });
        }
    }
};
