const passport = require('passport');

// Register Admin
exports.registerAdmin = (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    // Validate fields
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
        res.render('auth/register', { errors, name, email, password, password2 });
    } else {
        Admin.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: 'Email already exists' });
                res.render('auth/register', { errors, name, email, password, password2 });
            } else {
                const newAdmin = new Admin({ name, email, password, isAdmin: true });

                // Hash password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newAdmin.password, salt, (err, hash) => {
                        if (err) throw err;
                        newAdmin.password = hash;
                        newAdmin
                            .save()
                            .then(user => {
                                req.flash('success_msg', 'Admin registered successfully and can log in');
                                res.redirect('/auth/login');
                            })
                            .catch(err => console.log(err));
                    });
                });

                // newAdmin.save().then(user => {
                //     req.flash('success_msg', 'You are now registered and can log in');
                //     res.redirect('/auth/login');
                // }).catch(err => console.log(err));
            }
        });
    }
};

// Login Admin
// exports.loginAdmin = (req, res, next) => {
//     passport.authenticate('local', {
//         successRedirect: '/admins/dashboard',
//         failureRedirect: '/auth/login',
//         failureFlash: true
//     })(req, res, next);
// };

// Login User (Admin or Customer)
exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.render('auth/login', {
                error_msg: info.message,
                email: req.body.email,
            });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            if (user instanceof Admin) {
                return res.redirect('/admins/dashboard'); // Redirect to admin dashboard
            } else {
                return res.redirect('/customers/profile'); // Redirect to customer profile
            }
        });
    })(req, res, next);
};

// Logout User (Admin or Customer)
exports.logout = (req, res) => {
    req.logout(err => {
        if (err) {
            return next(err);
        }
        req.flash('success_msg', 'You are logged out');
        res.redirect('/auth/login');
    });
};


// Logout Admin
// exports.logoutAdmin = (req, res) => {
//     req.logout();
//     req.flash('success_msg', 'You are logged out');
//     res.redirect('/auth/login');
// };

// Regisiter User
exports.registerCustomer = (req, res) => {
    const { name, email, password, phone, address, industry } = req.body;
    let errors = [];

    // Validation
    if (!name || !email || !password || !phone || !address || !industry) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (phone === null) {
        errors.push({ msg: 'Phone number field cannot be empty' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('auth/register', {
            errors,
            name,
            email,
            password,
            phone,
            address,
            industry
        });
    } else {
        Customer.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: 'Email already exists' });
                res.render('auth/register', {
                    errors,
                    name,
                    email,
                    password,
                    phone,
                    address,
                    industry
                });
            } else {
                const newUser = new Customer({
                    name,
                    email,
                    password,
                    isAdmin: false  // For regular users
                });

                // Hash password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                req.flash('success_msg', 'You are now registered and can log in');
                                res.redirect('/auth/login');
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
};