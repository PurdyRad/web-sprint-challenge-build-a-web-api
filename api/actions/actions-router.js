// Write your "actions" router here!
const express = require('express');
const Action = require('./actions-model');
const { validateActionId } = require('../middleware/middleware');

const router = express.Router();

router.get('/', (req,res,next) => {
    Action.get(req)
    .then((actions) => {
        console.log('actions', actions)
        res.status(200).json(actions)
    })
    .catch(next)
});


router.get('/:id', validateActionId, (req,res) => {
    res.status(200).json(req.action)
    console.log('action', req.action)
});


router.post('/', (req,res) => {
    console.log('post')
});


router.put('/:id', (req,res) => {
    console.log('put')
});


router.delete('/:id', (req,res) => {
    console.log('delete')
});


router.use ((err, req,res,next) => { // eslint-disable-line
    res.status(err.message || 500).json({
      message: err.message,
      stack: err.stack,
      custom: "Ya won't find what you're lookin for here."
    })
    
  })
  
module.exports = router;
