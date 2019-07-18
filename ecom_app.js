const express = require('express');
var exphbs  = require('express-handlebars');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/socks');

const productsCollection = db.get('products');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const port = 3003;


app.use(express.static('public'));


app.get('/', function(req, res) {
      res.render('home', {'items':[{'name': "Pizza Socks", 'description': "Socks with pizza on them"}, {'name': "Puppies Socks", 'description': "Socks with puppies on them"}]});
    }
);

app.get('/admin', function(req, res) {
      res.render('home', {'items':[{'name': "Pizza Socks", 'description': "Socks with pizza on them"}, {'name': "Puppies Socks", 'description': "Socks with puppies on them"}]});
    }
);

app.post('/admin', function(req, res) {
      res.render('home', {'items':[{'name': "Pizza Socks", 'description': "Socks with pizza on them"}, {'name': "Puppies Socks", 'description': "Socks with puppies on them"}]});
    }
);




app.use(function (req, res, next) {
    res.status(404).send("404'ed")
});


app.listen(port, function () {
        console.log('Example app listening on port' + port + '!');
    }
);
