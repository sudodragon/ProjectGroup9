module.exports = function() {
    let express = require('express');
    let router = express.Router();
    
    function getShips(res, mysql, context, complete) {
        let query = "SELECT shipId, shipName, registry, class, currentLocation, missionId FROM ships";
        mysql.pool.query(query, (error, results, fields) => {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.ships = results;
            console.log(context.ships);
            complete();
        });
    }
    router.get('/', (req, res) => {
        let callbackCount = 0;
        let context = {};
        let mysql = req.app.get('mysql');
        getShips(res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if (callbackCount >= 1) {
                console.log(context.ships);
                res.render('ships', context);
            }
        }      
    });
    return router;
}();