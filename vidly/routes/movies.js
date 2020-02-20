const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { Movie, validate } = require('../models/movie');

// movie routes
router.get('/', async (req, res) => {
    const result = await Movie
        .find()
        .sort({ title: 1 });
    
    res.send(result);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    const genre = await genre.findById(req.body.genreId);
    if (!genre) {
        return res.status(400).send('Invalid genre');
    }

    let movie = new Movie({ name: req.body.name });
    movie = await movie.save();
    
    res.send(movie);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    const movie = await Movie.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');

    res.send(movie);
});

router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');

    res.send(movie);
});

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
    
    res.send(movie);
});

module.exports = router;
