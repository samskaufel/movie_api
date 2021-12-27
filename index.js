// Requires express, morgan, body-parser, and uuid
const express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(morgan('common'));
app.use(bodyParser.json());

let myLogger = (req, res, next) => {
    console.log(req.url);
    next();
};

app.use(myLogger);

let movies = [
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

let genres = [
    {
        category: 'musical',
        description: 'Musical film is a film genre in which songs by the characters are interwoven into the narrative, sometimes accompanied by singing and dancing. The songs usually advance the plot or develop the film\'s characters, but in some cases, they serve merely as breaks in the storyline, often as elaborate production numbers.'
    }
]

let directors = [
    {
        name: 'Robert Wise',
        born: '1914',
        died: '2005',
        bio: 'Robert Earl Wise was born on September 10, 1914 in Winchester, Indiana, the youngest of three sons of Olive R. (Longenecker) and Earl Waldo Wise, a meat packer. His parents were both of Pennsylvania Dutch (German) descent. At age nineteen, the avid moviegoer came into the film business through an odd job at RKO Radio Pictures. A head sound effects editor at the studio recognized Wise\'s talent, and made Wise his protégé. Around 1941, Orson Welles was in need of an editor for Citizen Kane (1941), and Wise did a splendid job. Welles really liked his work and ideas. Wise started as a director with some B-movies, and his career went on quickly, and he made many classic movies. His last theatrical film, Rooftops (1989), proved that he was a filmmaker still in full command of his craft in his 80s. The carefully composed images, tight editing, and unflagging pace make one wish that Wise had not stayed away from the camera for very long. Robert Wise died of heart failure on September, 14, 2005, just four days after his 91st birthday.'
    }
];

let users = [
    {
        username: 'Sam Skaufel',
        email: 'samskaufel@gmail.com'
    }
];

// Shows default message
app.get('/', (req, res) => {
    res.status(200).send('Welcome to myFlix!');
});

// Get a list of all movies
app.get('/movies', (req, res) => {
    res.json(movies);
});

app.use(express.static('public'));

// Get data about a single movie by title
app.get('/movies/:title', (req, res) => {
    res.json(movies.find((movie) => { return movie.title === req.params.title }));
});

// Get description about a genre by category
app.get('/genres/:category', (req, res) => {
    res.json(genres.find((genre) => { return genre.category === req.params.category }));
});

// Get data about a director by name
app.get('/directors/:name', (req, res) => {
    res.json(directors.find((director) => { return director.name === req.params.name }));
});

// Allow new users to register
app.post('/users', (req, res) => {
    let newUser = req.body;

    if (!newUser.username) {
        const message = 'Must include email to register';
        res.status(400).send(message);
    } else {
        newUser.email = uuid.v4();
        users.push(newUser);
        res.status(201).send(newUser);
    }
});

// Allow users to update their username by current username
app.put('/users/:username', (req, res) => {
    res.status(201).send('Username has been updated');
    // let user = users.find((user) => { return user.username === req.params.username });

    // if (user) {
    //     user.usernames[req.params.username]
    //     res.status(201).send('Username -- ' + req.params.username + ' -- has been successfully update.');
    // } else {
    //     res.status(404).send('Username has not been updated.');
    // }
});

// Allow users to add a movie to their list of favorites by title
app.put('/favorites/:title', (req, res) => {
    res.status(201).send('Movie has been added to favorites');
});

// Allow users to remove a movie from their list of favorites by title
app.delete('/favorites/:title', (req, res) => {
    res.status(201).send('Movie has been removed from favorites');
});

// Allow existing users to deregister by username
app.delete('/users/:username', (req, res) => {
    res.status(201).send('Your account has been deleted successfully.')
})

// Error-handling middleware function
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Listens for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});



