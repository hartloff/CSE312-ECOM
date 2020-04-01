const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const mongo = require('mongodb');
const monk = require('monk');

let db = monk('mongo:27015/socks');
let productsCollection = db.get('products');
let attackCollection = db.get('attack');


const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const port = 8000;

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

app.post('/login', function (req, res) {
		const username = req.body.j_username;
		let ip = req.get('x-real-ip');
		attackCollection.insert({'ip': ip, 'username': username});
		res.render('security2');
	}
);

app.get('/allItems', function (req, res) {
		res.send(Object.values(items));
		// res.send(attackCollection.find({}));
	}
);


app.get('/stuff', function (req, res) {
		// res.send(Object.values(items));
	console.log("ggg");
	// initDB();

	// db.catch(function(err) {
	// 	console.log(err);
	// 	initDB();
	// });

		// console.log(db);
		productsCollection.find({}, {}, function (err, data) {
			if (err) {
				console.log(err);
				res.send("error");
			} else {
				console.log(data);
				res.send(data);
			}
		});
	}
);


app.post('/form-path', function (req, res) {
		console.log(req.body);
		res.send("thank you!")
	}
);


app.post('/addReview', function (req, res) {
		const rating = req.body.rating;
		const review = req.body.review;
		const itemId = req.body.id;

		items[itemId].reviews.push({'rating': rating, 'review': review});

		productsCollection.insert({'rating': rating, 'review': review});

		res.send("Thank you for your review!");

		// res.render('home', {'items': Object.values(items)});
	}
);


app.use(function (req, res, next) {
	res.status(404).send("404'ed")
});


app.listen(port, function () {
		console.log('Example app listening on port ' + port + '!');
	}
);
