const express = require('express');
const router = express.Router();

const Model = require('../../models/Model');
const Model2 = require('../../models/Model2');

//router.get('/test', (req, res) => res.send('model route testing!'));

router.get('/', (req, res) => {
  Model.find()
    .then(model => res.json(model))
    .catch(err => res.status(404).json({ nomodelfound: 'No model found' }));
});

router.post('/', (req, res) => {
  Model.create({items: req.body, date: Date.now()})
    .then(model => res.json({ msg: 'model added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this model' }));
});

router.put('/:id', (req, res) => {
  Model.updateOne({name: req.params.name})
    .then(model => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

router.delete('/:id', (req, res) => {
  Model.deleteOne({name: req.params.name})
    .then((model) => res.json({ msg: 'model entry deleted successfully' }))
    .catch((err) => res.status(404).json({ error: 'No such model' }));
});

module.exports = router;