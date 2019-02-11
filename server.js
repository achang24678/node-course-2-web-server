const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials') //take the dir you want to use for all of your handlebar partial files
app.set('view engine', 'hbs');  //set up view engine
app.use(express.static(__dirname + '/public')); //register middleware using ".use", teach express how to read from a static directory

//tracking how our server is working
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  next();
}); //tracking how our server is working


// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// });


hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase();
});

app.get('/', (req, res) => {      //register handler
   res.render('home.hbs', {
     pageTitle: 'Home Page',
     welcomeMessage: 'Welcome to my website',
   });
});

app.get('/about', (req, res) => {   //register handler
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects'
  });
})


app.get('/bad', (req, res) =>{
  res.send({
    errorMessage: 'Error handling request'
  });
});


app.listen(port, () =>{       //second argument is optional
  console.log(`Server is up on port ${port}`);
});
