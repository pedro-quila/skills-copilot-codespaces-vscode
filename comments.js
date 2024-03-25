// Create web server with express
// Create a route that will return all comments
// Create a route that will add a new comment
// Create a route that will delete a comment

const express = require('express');
const app = express();
const port = 3000;
const comments = [
    { id: 1, comment: 'hello' },
    { id: 2, comment: 'world' }
];
let nextId = 3;

app.use(express.json());

app.get('/comments', (req, res) => {
    res.json(comments);
});

app.post('/comments', (req, res) => {
    const comment = req.body;
    comment.id = nextId++;
    comments.push(comment);
    res.status(201).json(comment);
});

app.delete('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = comments.findIndex(comment => comment.id === id);
    if (index === -1) {
        res.status(404).json({ error: 'Comment not found' });
    } else {
        comments.splice(index, 1);
        res.sendStatus(204);
    }
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
