const Admin = require('../models/Admin');
const Contract = require('../models/Contract');

// Get Admin Dashboard
exports.getDashboard = async (req, res) => {
    try {
        // Fetch the first four contracts sorted by creation date
        const contracts = await Contract.find().sort({ date: -1 }).limit(6);

        res.render('admins/dashboard', { contracts });

    } catch (err) {
        console.error('Error fetching contracts:', err);
        res.status(500).send('Server Error');
    }
};

// Create a New Admin
exports.createAdmin = async (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('admins/dashboard', { errors, name, email, password, password2 });
    } else {
        try {
            let admin = await Admin.findOne({ email });
            if (admin) {
                errors.push({ msg: 'Email already exists' });
                res.render('admins/dashboard', { errors, name, email, password, password2 });
            } else {
                admin = new Admin({ name, email, password, isAdmin: true });
                await admin.save();
                req.flash('success_msg', 'Admin added successfully');
                res.redirect('/admins/dashboard');
            }
        } catch (err) {
            console.error(err);
            res.render('admins/dashboard', { errors: [{ msg: 'An error occurred' }], name, email });
        }
    }
};

// Delete Admin
exports.deleteAdmin = async (req, res) => {
    try {
        await Admin.findByIdAndRemove(req.params.id);
        req.flash('success_msg', 'Admin removed successfully');
        res.redirect('/admins/dashboard');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error removing admin');
        res.redirect('/admins/dashboard');
    }
};