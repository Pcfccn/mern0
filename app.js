const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use('/api/auth', require('./routes/auth.routes'));

const PORT = config.get('port');

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
    } catch (error) {
        console.log('Server erros: ', error.message);
        process.exit(1);
    }
}

start();

app.listen(PORT, () => {
    console.log(`App has been started on port ${PORT}...`);
});
