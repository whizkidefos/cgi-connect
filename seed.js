const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Admin = require('./models/Admin');
const Customer = require('./models/Customer');
const Contract = require('./models/Contract');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/cgiDB', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB Connected from seed.js');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Function to create random Admins
const createAdmins = async (num) => {
    const admins = [];
    for (let i = 0; i < num; i++) {
        const admin = new Admin({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: 'password123',  // For simplicity, use a plain password, but ensure you hash this in a real scenario
            isAdmin: true,
        });
        admins.push(admin);
    }
    return Admin.insertMany(admins);
};

// Function to create random Customers
const createCustomers = async (num) => {
    const customers = [];
    for (let i = 0; i < num; i++) {
        const customer = new Customer({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            phone: faker.phone.number(),
            address: faker.location.streetAddress(),
            industry: faker.company.bs(),
        });
        customers.push(customer);
    }
    return Customer.insertMany(customers);
};

// Function to create random Contracts
const createContracts = async (num, customers) => {
    const contracts = [];
    for (let i = 0; i < num; i++) {
        const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
        const contract = new Contract({
            title: faker.commerce.productName(),
            description: faker.lorem.sentence(),
            startDate: faker.date.past(),
            endDate: faker.date.future(),
            progress: Math.floor(Math.random() * 100),
            customer: randomCustomer._id,  // Reference to a random customer
        });
        contracts.push(contract);

        // Push the contract ID into the customer's contracts array
        randomCustomer.contracts.push(contract._id);
        await randomCustomer.save();  // Save the customer with the updated contracts array
    }
    return Contract.insertMany(contracts);
};

// Main function to seed the database
const seedDatabase = async () => {
    try {
        // Clear existing data
        await Admin.deleteMany({});
        await Customer.deleteMany({});
        await Contract.deleteMany({});

        // Create data
        const admins = await createAdmins(20);
        const customers = await createCustomers(68);
        const contracts = await createContracts(134, customers);

        console.log('Database seeded successfully!');
        console.log('Admins:', admins);
        console.log('Customers:', customers);
        console.log('Contracts:', contracts);

        // Close the connection
        mongoose.connection.close();
    } catch (err) {
        console.error('Error seeding the database:', err);
    }
};

// Run the seed script
seedDatabase();