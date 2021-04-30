const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();

const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// route to notes page 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

//read file from file system then send it back with res.json
app.get('/api/notes', (req, res) => {
    res.json('db/db.json');
});

app.post('/api/notes', (req, res) => {
    let note = req.body;
    note.id = uuidv4();
    fs.writeFile('db/db.json', JSON.stringify(note), function (err) {
        if (err) throw err;
    });
    // res.sendFile(path.join(__dirname, 'db/db.json'));
});



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});





app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});