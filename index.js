// imports express module
// declares a variable that encapsulates Express's functionality to configure your web server
const express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());

let myLogger = (req, res, next) => {
    console.log(req.url);
    next();
};

app.use(myLogger);

let topMovies = [
    {
        title: 'The Sound of Music',
        year: '1965'
    },
    {
        title: 'Willy Wonka and the Chocolate Factory',
        year: '1971'
    },
    {
        title: 'Forrest Gump',
        year: '1994'
    },
    {
        title: 'Back to the Future',
        year: '1985'
    },
    {
        title: 'Monsters, Inc.',
        year: '2001'
    },
    {
        title: 'The Princess Bride',
        year: '1987'
    },
    {
        title: 'She\'s the Man',
        year: '2006'
    },
    {
        title: '10 Things I Hate About You',
        year: '1999'
    }
];

// get requests
app.get('/', (req, res) => {
    res.send('Welcome to myFlix!');
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

app.use(express.static('public'));


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});



