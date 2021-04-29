const express = require('express');
const path = require('path');
// fs to read file 

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// route to notes page 
app.get('/notes', (req, res) => {
    //path.join joins the strings into the appropriate format with slashes
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    //read file from file ssytem the nsend it back with res.json
})


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});





app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});