const express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/socks');

const productsCollection = db.get('products');

const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const port = 3003;

let items = {
    'pizza_socks': {
        'id': "pizza_socks",
        'name': "Pizza Socks",
        'description': "Socks with pizza on them",
        'reviews': []
    },
    'puppy_socks': {
        'id': "puppy_socks",
        'name': "Puppies Socks",
        'description': "Socks with puppies on them",
        'reviews': []
    }
};


app.use(express.static('public'));


app.get('/', function (req, res) {
        res.render('home', {'items': Object.values(items)});
    }
);

app.get('/security', function (req, res) {
        res.render('security');
    }
);

app.get('/allItems', function (req, res) {
        res.send(Object.values(items));
    }
);


app.post('/addReview', function (req, res) {
        const rating = req.body.rating;
        const review = req.body.review;
        const itemId = req.body.id;

        items[itemId].reviews.push({'rating': rating, 'review': review});

        res.send("Thank you for your review!");

        // res.render('home', {'items': Object.values(items)});
    }
);


// TODO [in lecture]: Add form to add reviews (no database yet) (start with page reload)

// TODO [in lecture]: Server item data as an API end point
// TODO [in lecture]: Polling to update reviews


app.use(function (req, res, next) {
    res.status(404).send("404'ed")
});


app.listen(port, function () {
        console.log('Example app listening on port' + port + '!');
    }
);
