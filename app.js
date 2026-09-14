
```js
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

require('dotenv').config();

const app = express();


// Set EJS as the view engine
app.set('view engine', 'ejs');


// Middleware
app.use(morgan('dev'));
app.use(express.static('public'));


// Blog Schema
const blogSchema = new mongoose.Schema({
    title: String,
    snippet: String,
    body: String
});


// Blog Model
const Blog = mongoose.model('Blog', blogSchema);


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {

        console.log('Connected to MongoDB');

        app.listen(3000, function() {
            console.log('Server is running on port 3000');
        });

    })
    .catch((error) => {

        console.log('MongoDB connection error:', error);

    });


// Home page
app.get('/', function(req, res) {

    const blogs = [
        {
            title: 'Yoshi finds eggs',
            snippet: 'Lorem ipsum dolor sit amet consectetur'
        },
        {
            title: 'Mario finds stars',
            snippet: 'Lorem ipsum dolor sit amet consectetur'
        },
        {
            title: 'How to defeat bowser',
            snippet: 'Lorem ipsum dolor sit amet consectetur'
        }
    ];

    res.render('index', {
        title: 'Home Page',
        blockNinja: 'Ninja Block',
        netNinja: 'Ninja Net',
        blogs: blogs
    });

});


// About page
app.get('/about', function(req, res) {

    res.render('about', {
        title: 'About Page',
        blockNinja: 'Ninja Block',
        netNinja: 'Ninja Net'
    });

});


// Create blog page
app.get('/blogs/create', function(req, res) {

    res.render('create', {
        title: 'Create Page',
        blockNinja: 'Ninja Block',
        netNinja: 'Ninja Net'
    });

});


// Blog route
app.get('/blog', function(req, res) {

    const blog = new Blog({
        title: 'Yoshi finds eggs',
        snippet: 'This is a new blogpost',
        body: 'This is the full content of the blog post.'
    });

    blog.save()
        .then(function(result) {

            res.send(result);

        })
        .catch(function(err) {

            console.log(err);

        });

});


// 404 page
app.use(function(req, res) {

    res.status(404).render('404', {
        title: 'Page Not Found'
    });

});
```
