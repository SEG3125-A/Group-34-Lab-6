const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static("public")) //serve client static files html, css, images
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

// Route for handling form submission
app.post('/submit', (req, res) => {
    // Log form data to console
    console.log('Form Data:');
    console.log('Question 1:', req.body.question1);
    console.log('Answer:', req.body.answer);
    console.log('Rating:', req.body.q3);
    console.log('Selected features:', req.body.features);
    console.log('Comment:', req.body.comment);

    // Redirect back to the homepage or do whatever you want after handling the form submission
    res.redirect('/');
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});