const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const notes = require('./db/db.json');

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
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    req.body.id = uuidv4();
    notes.push(req.body);

    fs.writeFile('db/db.json', JSON.stringify(notes), function (err) {
        if (err) throw err; 
    });
    res.json(notes);
});

app.delete('/api/notes/:id', (req,res) => {

    for(i = 0; i < notes.length; i++){
        if(req.params.id == notes[i].id){
            notes.splice(i, 1);
            break;
        }
    };
    
    fs.writeFile('db/db.json', JSON.stringify(notes), function (err) {
        if (err) throw err; 
    });

    res.sendStatus(200);
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});