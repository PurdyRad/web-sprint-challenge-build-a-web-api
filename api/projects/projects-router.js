const express = require('express');
const Project = require('./projects-model');
const { validateProjectId, validateProject } = require('../middleware/middleware');


const router = express.Router();


router.get('/', (req, res, next) => {
    Project.get()
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch(next);
});


router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project);
});


router.get('/:id/actions', validateProjectId, (req, res, next) => {
    Project.getProjectActions(req.params.id)
    .then(projectsActions => {
        res.status(200).json(projectsActions);
    })
    .catch(next);
});


router.post('/', validateProject, (req, res, next) => {
    Project.insert(req.body)
    .then(daNewProject => {
        res.status(201).json(daNewProject);
    })
    .catch(next);
});


router.put('/:id', validateProject, validateProjectId, (req, res, next) => {
    Project.update(req.params.id, req.body)
    .then(daUpdatedProject => {
        res.status(201).json(daUpdatedProject);
    })
    .catch(next);
});


router.delete('/:id', validateProjectId, (req, res, next) => {
    Project.remove(req.params.id)
    .then(numberOfDeletedProjects => {
        res.status(204).json(numberOfDeletedProjects);
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
