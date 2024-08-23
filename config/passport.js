const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load Admin and Customer models
const Admin = require('../models/Admin');
const Customer = require('../models/Customer');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
            try {
                // Try to find the user as an Admin
                const admin = await Admin.findOne({ email: email });
                if (admin) {
                    const isMatch = await bcrypt.compare(password, admin.password);
                    if (isMatch) {
                        return done(null, admin);
                    } else {
                        return done(null, false, { message: 'Password incorrect' });
                    }
                }

                // If not found as an Admin, try to find the user as a Customer
                const customer = await Customer.findOne({ email: email });
                if (!customer) {
                    return done(null, false, { message: 'That email is not registered' });
                }

                const isMatch = await bcrypt.compare(password, customer.password);
                if (isMatch) {
                    return done(null, customer);
                } else {
                    return done(null, false, { message: 'Password incorrect' });
                }
            } catch (err) {
                return done(err);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, { id: user.id.toString(), type: user instanceof Admin ? 'Admin' : 'Customer' });
    });

    passport.deserializeUser(async (obj, done) => {
        try {
            if (obj.type === 'Admin') {
                const admin = await Admin.findById(obj.id);
                if (admin) {
                    done(null, admin);
                } else {
                    done(null, false);
                }
            } else {
                const customer = await Customer.findById(obj.id);
                if (customer) {
                    done(null, customer);
                } else {
                    done(null, false);
                }
            }
        } catch (err) {
            done(err);
        }
    });
};