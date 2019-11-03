// Set up
var express = require('express');
var app = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');

//Avoid ERROR 413 PAYLOAD TO LARGE 

var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Configuration
mongoose.connect('mongodb://localhost/countries_db');

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Models
var Countries = mongoose.model('Countries', {
    name: String,
    topLevelDomain: [String],
    alpha2Code: String,
    alpha3Code: String,
    callingCodes: [String],
    capital: String,
    altSpellings: [String],
    region: String,
    subregion: String,
    population: Number,
    latlng: [Number],
    demonym: String,
    area: Number,
    gini: Number,
    timezones: [String],
    borders: [String],
    nativeName: String,
    numericCode: String,
    currencies: [{
        code: String,
        name: String,
        symbol: String,
    }],
    languages: [{
        iso639_1: String,
        iso639_2: String,
        name: String,
        nativeName: String,
    }],
    translations: {
        de: String,
        es: String,
        fr: String,
        ja: String,
        it: String,
        br: String,
        pt: String,
        nl: String,
        hr: String,
        fa: String,
    },
    flag: String,
    regionalBlocs: [{
        acronym: String,
        name: String,
        otherAcronyms: [],
        otherNames: [],
    }],
    cioc: String,
});

// Routes

// Get countries
app.get('/api/', function (req, res) {

    console.log("fetching countries");

    // use mongoose to get all countries in the database
    Countries.find(function (err, countries) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(countries); // return all countries in JSON format
    });
});

// create country and send back all countries after creation
app.post('/api/', function (req, res) {

    // create a country, information comes from request from Ionic
    Countries.create({

        name: req.body.name,
        topLevelDomain: req.body.topLevelDomain,
        alpha2Code: req.body.alpha2Code,
        alpha3Code: req.body.alpha3Code,
        callingCodes: req.body.callingCodes,
        capital: req.body.capital,
        altSpellings: req.body.altSpellings,
        region: req.body.region,
        subregion: req.body.subregion,
        population: req.body.population,
        latlng: req.body.latlng,
        demonym: req.body.demonym,
        area: req.body.area,
        gini: req.body.gini,
        timezones: req.body.timezones,
        borders: req.body.borders,
        nativeName: req.body.nativeName,
        numericCode: req.body.numericCode,
        currencies: req.body.currencies,
        languages: req.body.languages,
        translations: req.body.translations,
        flag: req.body.flag,
        regionalBlocs: req.body.regionalBlocs,
        cioc: req.body.cioc,
        done: false
    }, function (err, country) {
        if (err)
            res.send(err);

        // get and return all the countries after you create another
        Countries.find(function (err, countries) {
            if (err)
                res.send(err)
            res.json(countries);
        });
    });

    console.log("creating country", req.body);

});

app.delete('/api/', function (req, res) {
    Countries.remove({
        _id: req.params.countrie_id
    }, function (err, countries) {

    });
});

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
