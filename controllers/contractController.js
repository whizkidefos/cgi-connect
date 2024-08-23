const Contract = require('../models/Contract');
// const Customer = require('../models/Customer');
const { format } = require('date-fns');

// Get All Contracts
exports.getAllContracts = async (req, res) => {
    const perPage = 10;
    const page = req.query.page || 1;

    try {
        const contracts = await Contract.find()
            .populate('customer')
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec();

            // Format the dates before passing to the view
            contracts.forEach(contract => {
                contract.formattedStartDate = format(new Date(contract.startDate), 'MMM d, yyyy');
                contract.formattedEndDate = format(new Date(contract.endDate), 'MMM d, yyyy');
            });

        const count = await Contract.countDocuments();

        res.render('contracts', {
            contracts,
            current: page,
            pages: Math.ceil(count / perPage)
        });
    } catch (err) {
        console.error('Error fetching contracts:', err);
        res.status(500).send('Server Error');
    }
};

// Create a New Contract
exports.createContract = async (req, res) => {
    const { title, description, customer } = req.body;
    let errors = [];

    if (!title || !description || !customer) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    if (errors.length > 0) {
        res.render('contracts/index', { errors, title, description, customer });
    } else {
        try {
            const newContract = new Contract({ title, description, customer });
            await newContract.save();
            req.flash('success_msg', 'Contract created successfully');
            res.redirect('/contracts');
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }
};

// Update Contract
exports.updateContract = async (req, res) => {
    const { title, description, customer } = req.body;

    try {
        let contract = await Contract.findById(req.params.id);
        if (!contract) {
            req.flash('error_msg', 'Contract not found');
            return res.redirect('/contracts');
        }

        contract.title = title;
        contract.description = description;
        contract.customer = customer;

        await contract.save();
        req.flash('success_msg', 'Contract updated successfully');
        res.redirect('/contracts');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Delete Contract
exports.deleteContract = async (req, res) => {
    try {
        await Contract.findByIdAndRemove(req.params.id);
        req.flash('success_msg', 'Contract removed successfully');
        res.redirect('/contracts');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error removing contract');
        res.redirect('/contracts');
    }
};