module.exports = function() {
    let express = require('express');
    let router = express.Router();
    router.get('/', (req, res) => {
        let context = {};
        let missions = {
            missionID: "", 
            directive : "", 
            status : "", 
            location : ""
        };    
        context.missions = missions;
        res.render('missions', context);
    });
    return router;
}();
