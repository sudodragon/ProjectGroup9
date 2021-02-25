module.exports = function() {
    let express = require('express');
    let router = express.Router();
    router.get('/', (req, res) => {
        let context = {};
        let ships = {
            shipName: "", 
            registry : "", 
            class : "", 
            location : "",
            missionId : ""
        };
        context.ships = ships;
        res.render('ships', context);
    });
   
    return router;
}();
