import express from 'express';
import Clarifai from 'clarifai';
// import config from '../config.js';


// const key = config.key
const app  = new Clarifai.App({
    apiKey: "key"
});

export const handleApiCall = (req, res) => {
    app.models.predict({
        id: "a403429f2ddf4b49b307e318f00e528b",
        version: "34ce21a40cc24b6b96ffee54aabff139",
    }, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}


export const image = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'));
}
