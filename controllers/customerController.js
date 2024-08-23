const Customer = require('../models/Customer');

// Get All Customers
exports.getAllCustomers = async (req, res) => {
    const perPage = 10;
    const page = req.query.page || 1;

    try {
        const customers = await Customer.find()
            .populate('contracts')
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec();

        const count = await Customer.countDocuments();

        res.render('customers', {
            customers,
            current: page,
            pages: Math.ceil(count / perPage)
        });
    } catch (err) {
        console.error('Error fetching customers:', err);
        res.status(500).send('Server Error');
    }
};

// Create a New Customer
exports.createCustomer = async (req, res) => {
    const { name, email, phone, address, industry } = req.body;
    let errors = [];

    if (!name || !email || !phone || !address || !industry) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    if (errors.length > 0) {
        res.render('customers/index', { errors, name, email, phone, address, industry });
    } else {
        try {
            const newCustomer = new Customer({ name, email, phone, address, industry });
            await newCustomer.save();
            req.flash('success_msg', 'Customer added successfully');
            res.redirect('/customers');
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }
};

// Update Customer Profile
exports.updateCustomer = async (req, res) => {
    const { name, email, phone, address, industry } = req.body;

    try {
        let customer = await Customer.findById(req.params.id);
        if (!customer) {
            req.flash('error_msg', 'Customer not found');
            return res.redirect('/customers');
        }

        customer.name = name;
        customer.email = email;
        customer.phone = phone;
        customer.address = address;
        customer.industry = industry;

        await customer.save();
        req.flash('success_msg', 'Customer updated successfully');
        res.redirect('/customers');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Delete Customer
exports.deleteCustomer = async (req, res) => {
    try {
        await Customer.findByIdAndRemove(req.params.id);
        req.flash('success_msg', 'Customer removed successfully');
        res.redirect('/customers');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error removing customer');
        res.redirect('/customers');
    }
};