//This code is followint the Tutorial from JavaScript Full Stack 
//Defining routes for the server, we will require the method router from express
const { Router } = require('express');
const router = Router(); //executing 
const path = require('path');
const { unlink } = require('fs-extra');

const Music = require('../models/Musica');

router.get('/', async (req, res) => {
    const music = await Music.find();
    //console.log(music);
    res.json(music);
});

router.post('/', async (req, res) => {
    const { artist, album } = req.body;
    const imagePath = '/uploads/' + req.file.filename;
    const newMusic =  new Music({artist: artist, album: album, imagePath: imagePath });
    //console.log(music);
    await newMusic.save();
    res.json({message: 'Music saved'});
});

router.delete('/:id', async (req, res) => {
    const music = await Music.findByIdAndDelete(req.params.id);
    unlink(path.resolve('./backend/public/' + music.imagePath));
    res.json({message: 'Album deleted'});
});
module.exports = router;