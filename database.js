const mongo = require('mongodb');
const monk = require('monk');

let db = monk('mongo:27017/socks');
let productsCollection = db.get('products');




app.get('/stuff', function (req, res) {

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


app.post('/addReview', function (req, res) {
		const rating = req.body.rating;
		const review = req.body.review;
		const itemId = req.body.id;

		items[itemId].reviews.push({'rating': rating, 'review': review});

		productsCollection.insert({'rating': rating, 'review': review});

		res.send("Thank you for your review!");
	}
);

