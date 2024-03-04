const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static("public")); // Serve client static files html, css, images
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

const submissionsFilePath = path.join(__dirname, 'submissions', 'all_submissions.json');

// Helper function to read existing submissions from file
function readSubmissionsFromFile() {
    try {
        const data = fs.readFileSync(submissionsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // If file does not exist or cannot be read, return an empty array
        return [];
    }
}

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

    // Read existing submissions from file
    const allSubmissions = readSubmissionsFromFile();

    // Add new submission to existing data
    allSubmissions.push(formData);

    // Write updated data back to file
    fs.writeFile(submissionsFilePath, JSON.stringify(allSubmissions, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
            res.status(500).send('Error saving form data');
        } else {
            console.log('Form data saved to file:', submissionsFilePath);
            // Redirect back to the homepage or do whatever you want after handling the form submission
            res.redirect('results');
        }
    });
});

app.get('/results', (req, res) => {
    // Read existing submissions from file
    const allSubmissions = readSubmissionsFromFile();
    console.log("all submissions: ");
    console.log(allSubmissions);
    // Render the results page with survey data
    res.render('results.ejs', { surveyResults: allSubmissions });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
