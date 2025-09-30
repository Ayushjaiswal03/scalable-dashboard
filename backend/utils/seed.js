const mongoose = require('mongoose');
const {faker} = require('@faker-js/faker');
const dotenv = require('dotenv').config();

const { User , userStatus } = require('../models/Users');

const MONGO_URI = process.env.MONGO_URI;

//Function to generate a fake user
const generateFakeUser = () => {
    // const accountStatus = ['active', 'pending', 'fulfilled'];
    const gender = faker.helpers.arrayElement(['male', 'female']);

    const firstName = faker.person.firstName(gender);
    const lastName = faker.person.lastName(gender);s
    const fullName = `${firstName} ${lastName}`; 

    return {
        name: fullName,
        email:  `${faker.internet.email({firstName,lastName})}-${faker.string.uuid()}`,
        status: faker.helpers.arrayElement(userStatus) 
    };
};

//main function to connect to the database andthenseed it
const seedDatabase = async(count) => {
    try{
        await mongoose.connect(MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true, DEPRICATED
        });
        console.log('MongoDB connected for seeding');

        console.log('clearing existing user data');
        await User.deleteMany({});
        console.log('existing user data cleared');

        console.log(`Generating ${count} fake user`);
        const fakeUsers = Array.from({length: count}, generateFakeUser);

        //insert the user into the database
        await User.insertMany(fakeUsers);
        console.log(`Database succesfully seeded with ${count} users`);

    }catch(err) {
        console.error('Error seeding Database:', err.message);
    } finally {
        //Disconnect from the Database
        await mongoose.disconnect();
        console.log('Disconnected from Database');
    }
};

const usersToGenerate = 10000;
seedDatabase(usersToGenerate);

