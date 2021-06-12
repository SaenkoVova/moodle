const express = require('express');
const app = express();
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const AuthRoute = require('./routes/auth.route');


const PORT = config.get('port') || 3000;

app.use(cors());
app.use(express.json({ extended: true }));

app.use('/api/auth', AuthRoute);


if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'dist')));

    app.use(express.static(path.join(__dirname, 'admin', 'dist')));
    
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
    })

    app.get('/admin', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'admin', 'dist', 'index.html'));
    })

    app.get('*', (req, res) => {
        let urlParts = req.url.split('/');
        if(urlParts[1] === 'admin') {
            res.sendFile(path.resolve(__dirname, 'admin', 'dist', 'index.html'));
        }
        else {
            res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
        }
    })
}

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
    } catch(e) {
        console.log('Server error', e.message);
        process.exit(1);
    }
}

start();
