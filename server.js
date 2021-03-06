const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {

  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append server.log');
    }
  });
  next();
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('portfolio.hbs', {
    pageTitle: 'Portfolio'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
})
