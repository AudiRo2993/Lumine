const mongoose = require('mongoose');
const config = require('../Structures/config.json')
const colors = require('colors')

async function connect() {
    mongoose.set('strictQuery', false)

    mongoose.connect(process.env.Connect, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    mongoose.connection.once("open", () => {
        console.log(`[MONGO] Connected to Database`.green)
    });
    return;
}

module.exports = connect;