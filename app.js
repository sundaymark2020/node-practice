const express = require('express');
const app = express();
const morgan = require('morgan');
// Set EJS as the view engine
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.static('public')); // Serve static files from the 'public' directory
app.listen(3000,function(){
    console.log('Server is running on port 3000');
});

app.get('/', function(req, res){

    const blogs = [
        { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' }
    ];
    res.render('index', { title: 'Home Page', blockNinja: 'Ninja Block', netNinja: 'Ninja Net', blogs: blogs });
});

app.get('/about', function(req, res){
    res.render('about', { title: 'About Page', blockNinja: 'Ninja Block', netNinja: 'Ninja Net' });
});

app.get('/blogs/create', function(req, res){
    res.render('create', { title: 'Create Page', blockNinja: 'Ninja Block', netNinja: 'Ninja Net' });
});

app.use(function(req, res){
    res.status(404).render('404', { title: 'Page Not Found' });
}); 