const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

const app = express();
app.use(express.json({extended: true}));

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use('/api/auth', require('./routes/auth.routes'));

const PORT = config.get('port');

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
    } catch (error) {
        console.log('Server erros: ', error.message);
        process.exit(1);
    }
}

start();
