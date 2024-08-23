const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin'); // Adjust the path according to your project structure

mongoose.connect('mongodb://127.0.0.1:27017/cgiDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    console.log('MongoDB Connected from seedAdmin.js');

    let admin = await Admin.findOne({ email: 'syuzadmin@gmail.com' });
    if (!admin) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync('soyuzPassword', salt);
        
        admin = new Admin({
            name: 'Soyuz Admin',
            email: 'syuzadmin@gmail.com',
            password: hashedPassword,
            isAdmin: true
        });

        await admin.save();
        console.log('Admin user created');
    } else {
        console.log('Admin user already exists');
    }

    mongoose.connection.close();
}).catch(err => console.log(err));