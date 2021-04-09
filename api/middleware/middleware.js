const Action = require('../actions/actions-model');
const Project = require('../projects/projects-model');


const validateActionId = async (req, res, next) => {
    const {id} = req.params;
    try {
        const action = await Action.get(id);
        if(!action){
            res.status(404).json({message: 'No action with the provided ID found.'});
        } else {
            req.action = action;
            next();
        }
    } catch (e) {
        res.status(500).json(e.message);
    }
};


const validateAction = (req, res, next) => {
    const {project_id, description, notes} = req.body;
    if(!project_id || !description || !notes){
        res.status(400).json({message: 'Please be sure to include a project id, a description, and notes.'});
    } else {
        req.project_id = project_id;
        req.description = description;
        req.notes = notes;
        next();
    }
};


const validateProjectId = async (req, res, next) => {
    const {id} = req.params;
    try {
        const project = await Project.get(id);
        if(!project){
            res.status(404).json({message: 'No project with the provided ID found.'});
        } else {
            req.project = project;
            next();
        }
    } catch (e) {
        res.status(500).json(e.message);
    }
};


const validateProject = (req, res, next) =>{
    const {name, description} = req.body;
    if(!name || !description){
        res.status(400).json({message: 'Please be sure to include aname and description.'});
    } else {
        req.name = name;
        req.description = description;
        next();
    }
};


module.exports = {
    validateActionId,
    validateAction,
    validateProjectId,
    validateProject
};
