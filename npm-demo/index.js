const _ = require('underscore');

const express = require('express');
const app = express();

// validation class
const Joi = require('joi');

var posts = [
    { id: 1, text: 'first port'},
    { id: 2, text: '2nd port'},
    { id: 3, text: '3rd port'}
];


// READ
app.get('/', (req, res) => {
    res.send('Hello Brian');
});
app.get('/api/users', (req, res) => {
    res.send(['abo', 'gago', 'tato']);
});
app.get('/api/users/:id', (req, res) => {
    res.send(req.params.id);
});
app.get('/api/posts/:month/:year', (req, res) => {
    res.send(req.params);
});
// app.get('/', (req, res) => {});
// app.get('/', (req, res) => {});


// CREATE
app.post('/api/posts', (req, res) => {
    const post = {
        id: posts.length + 1,
        text: req.body.text
    };

    // simple validation
    // if (!req.body.text || req.body.text.length < 3) {
    //     // 400 bad request
    //     res.status(400).send("Error msg");
    //     return;
    // }

    // validation with JOI
    // first we need to create a schema for JOI
    // then use it to apply validation
    const schema = {
        text: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        // 400 bad request
        res.status(400).send(result.error.details[0].message);
        return;
    }
    
    posts.push(post);
    res.send(post);
});
// app.post('/api/posts', (req, res) => {});
// app.post('/api/posts', (req, res) => {});
// app.post('/api/posts', (req, res) => {});

// UPDATE
app.put('/api/posts/:id', (req, res) => {
    // 1. check if its a valid ID / post
    const post = posts.find(c => c.id === parseInt(req.params.id));
    if (!post) {
        res.status(404).send("A post with this ID could not be found.");
        return;
    }

    // 2. Validate with JOI
    // same code as in above POST

    // 3. Update the value
    post.text = req.body.text;
    res.semd(post);

});
// app.put('/api/posts/:id', (req, res) => {});
// app.put('/api/posts/:id', (req, res) => {});
// app.put('/api/posts/:id', (req, res) => {});


// DELETE
app.delete('/api/posts/:id', (req, res) => {
    // 1. chekc if a post with this ID exists
    // same as in above PUT request

    // 2. remove that post from array of posts
    
    // 3. return the spliced/deleted post
});
// app.delete('', (req, res) => {});
// app.delete('', (req, res) => {});

const appPort = process.env.PORT || 3000;

app.listen(appPort, () => {
    console.log(`Listening to port ${appPort}`);
});