const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const path = require('path');

const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Load Config
require('./config/passport')(passport);

// Connect to MongoDB
connectDB();

// EJS
app.set('view engine', 'ejs');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// Connect Flash Middleware
app.use(flash());

// Express session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// Example Middleware to Simulate Login
app.use((req, res, next) => {
    if (!req.user) {
        req.user = {
            _id: new mongoose.Types.ObjectId(),
            name: 'John Admin',
            email: 'johnadmin@example.com',
            isAdmin: true,
        };
        req.isAuthenticated = () => true;
    }
    next();
});

// Routes
app.use('/', require('./routes/pageRoutes'));
app.use('/admins', require('./routes/adminRoutes'));
app.use('/customers', require('./routes/customerRoutes'));
app.use('/contracts', require('./routes/contractRoutes'));
app.use('/auth', require('./routes/authRoutes'));

// Chatbot Route
app.use('/chatbot', require('./routes/chatbot'));

// Temporarily bypass authentication \\ This is for testing purposes only ensure to remove this code before deploying to production
app.get('/admins/dashboard', (req, res) => {
    const fakeAdmin = {
        _id: new mongoose.Types.ObjectId(), // Generate a valid ObjectId
        name: 'Fake Admin',
        email: 'admin@example.com',
        isAdmin: true,
    };
    res.render('admins/dashboard', { admin: fakeAdmin });
});

app.get('/customers/profile', (req, res) => {
    const fakeCustomer = {
        _id: new mongoose.Types.ObjectId(), // Generate a valid ObjectId
        name: 'Fake Customer',
        email: 'customer@example.com',
        isAdmin: false,
    };
    res.render('customers/profile', { customer: fakeCustomer });
});

const PORT = process.env.PORT || 4500;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
