// Write your "projects" router here!
const express = require('express');
const Project = require('./projects-model');
const { validateProjectId, validateProject } = require('../middleware/middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
    Project.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(next)
});

router.get('/:id', validateProjectId, (req, res, next) => {
    res.status(200).json(req.project)
});

router.post('/', validateProject, (req, res, next) => {
    Project.insert(req.body)
    .then(dasIT => {
        console.log('dasIT', dasIT)
        res.status(201).json(dasIT)
    })
    .catch(next);
});

router.put('/:id', (req, res, next) => {

});

router.delete('/:id', (req, res, next) => {

});

router.use ((err, req,res,next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
      customMessage: "Ya won't find what you're lookin for here."
    }); 
  });

module.exports = router;
