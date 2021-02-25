module.exports = function() {
    let express = require('express');
    let router = express.Router();
    
    function getMissions(res, mysql, context, complete) {
        let query = "SELECT missionId, directive, status, location FROM missions";
        mysql.pool.query(query, (error, results, fields) => {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.missions = results;
            console.log(context.missions);
            complete();
        });
    }
    router.get('/', (req, res) => {
        let callbackCount = 0;
        let context = {};
        let mysql = req.app.get('mysql');
        getMissions(res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if (callbackCount >= 1) {
                console.log(context.missions);
                res.render('missions', context);
            }
        }      
    });
    return router;
}();
