const Action = require('../actions/actions-model');
// const Projects = require('../projects/projects-model');

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

module.exports = {
    validateActionId
}