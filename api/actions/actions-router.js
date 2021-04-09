// Write your "actions" router here!
const express = require('express');
const Action = require('./actions-model');
const { validateActionId, validateAction } = require('../middleware/middleware');


const router = express.Router();


router.get('/', (req, res, next) => {
    Action.get()
    .then((actions) => {
        res.status(200).json(actions);
    })
    .catch(next);
});


router.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.action);
});


router.post('/', validateAction, (req, res, next) => {
    Action.insert(req.body)
        .then(newAction => {
        res.status(201).json(newAction);
    })
    .catch(next);
});


router.put('/:id', validateAction, validateActionId, (req,res, next) => {
    Action.update(req.params.id, req.body)
    .then(updatedAction => {
        res.status(201).json(updatedAction);
    })
    .catch(next);
});


router.delete('/:id', validateActionId, (req, res, next) => {
    Action.remove(req.params.id)
    .then(numberOfDeletedActions => {
        res.status(201).json(numberOfDeletedActions);
    })
    .catch(next);
});


router.use ((err, req,res,next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
      customMessage: "Ya won't find what you're lookin for here."
    }); 
  });
  

module.exports = router;
