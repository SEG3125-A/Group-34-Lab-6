const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(express.static("public")) //serve client static files html, css, images
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

// Route for handling form submission
app.post('/submit', (req, res) => {
    // Construct JSON object with form data
    const formData = {
        question1: req.body.question1,
        answer: req.body.answer,
        rating: req.body.q3,
        features: req.body.features ? req.body.features : [], // Handle case when no feature is selected
        comment: req.body.comment
    };

    // json file name
    const fileName = `answers.json`;

    // Write form data to a JSON file
    fs.writeFile(`./submissions/${fileName}`, JSON.stringify(formData, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
            res.status(500).send('Error saving form data');
        } else {
            console.log('Form data saved to file:', fileName);
            // Redirect back to the homepage or do whatever you want after handling the form submission
            res.redirect('/');
        }
    });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});