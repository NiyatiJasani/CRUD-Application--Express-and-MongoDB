console.log('May Node be with you');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://username:password@ds127894.mlab.com:number/moviequotes', function (err, database) {
        // ... start the server
        if (err) return console.log(err)
        db = database

        app.listen(8080, function () {
                console.log("Listening at 8080");
        });

})


app.use(bodyParser.urlencoded({
        extended: true
}))


//app.get(path, callback)

app.get('/', function (req, res) {
        //        res.send("hello world");
        res.sendFile(path.resolve('index.html'));
});

app.post('/quotes', function (req, res) {
        console.log('Hellooooooooooooooooo!')
        console.log(req.body);
        db.collection('quotes').save(req.body, function (err, result) {
                if (err) return console.log(err)
                console.log('saved to database');
                res.redirect('/')
        })
});

//Express allows us to add middlewares like body-parser to our application with the use method
// plugins that change the request or response object before they get handled by our application
