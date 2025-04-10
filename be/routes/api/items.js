const express = require('express');
const router = express.Router();

const Model2 = require('../../models/Model2');

//router.get('/test', (req, res) => res.send('model route testing!'));

router.get('/', (req, res) => {
    Model2.find()
        .then(model => res.json(model))
        .catch(err => res.status(404).json({ error: 'No model found' }));
});

router.post('/', (req, res) => {
    Model2.create(req.body)
        .then(model => console.log('model added successfully'))
        .catch(err => res.status(400).json({ error: 'Unable to add this model' }));
});

router.get('/:name', (req, res) => {
    Model2.find({name: req.params.name})
      .then(model => res.json(model))
      .catch(err => res.status(404).json({ error: 'No Song found' }));
});


module.exports = router;