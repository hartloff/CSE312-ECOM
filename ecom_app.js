const express = require('express');
const app = express();
var exphbs  = require('express-handlebars');
  
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const port = 3003;


app.use(express.static('public'));


app.get('/', function(req, res) {
      console.log(req.header['x-real-ip']);
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
