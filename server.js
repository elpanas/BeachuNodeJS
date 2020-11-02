const express = require('express'); // framework nodejs
const mongoose = require('mongoose'); // framework per mongoDB
const reststab = require('./routes/reststab'); // percorso dello script a cui reindirizzare le richieste
const restuser = require('./routes/restuser'); // percorso dello script a cui reindirizzare le richieste
const app = express();

mongoose.set('useCreateIndex', true); // obbliga mongoose a usare CreateIndex (nuovo) invece di ensureIndexis

const url = process.env.DB_URI; // stringa di connessione al db remoto



app.use(express.json()); // built-in middleware

// connessione al db
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.get('/', (req, res) => {
    res.send('hello world');
});

app.use('/api/stab', reststab); // ogni richiesta con questo percorso deve richiamare lo script reststab
app.use('/api/user', restuser); // ogni richiesta con questo percorso deve richiamare lo script restuser

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
