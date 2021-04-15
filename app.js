const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));
// ...

// Add the route handlers here:

app.get('/', (req, res) => res.render('index'));

app.get('/Beers', (req, res) => {
    punkAPI.getBeers()
        .then(beersArray => {
            console.log(beersArray);
            res.render('Beers', beersArray);
        });
});

app.get('/Random', (req, res) => {
    punkAPI.getRandom()
        .then(randomBeer => {
            console.log(randomBeer[0]);
            res.render('Random-beer', randomBeer[0]);
        });
});

app.get('/Beers/:id', (req, res) => {
    punkAPI.getBeer()
        .then(beer => {
            console.log(req.params);
            res.render('beerDetails', { details: beer })
        })
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));