module.exports = function() {
    let express = require('express');
    let router = express.Router();
    
    function getMissions(res, mysql, context, complete) {
        let query = "SELECT missionID, directive, status, location FROM missions";
        mysql.pool.query(query, (error, results, fields) => {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.missions = results;
            complete();
        });
    }

    // READ Missions
    router.get('/', (req, res) => {
        let callbackCount = 0;
        let context = {};
        let mysql = req.app.get('mysql');
        getMissions(res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('missions', context);
            }
        }      
    });

    // CREATE Missions
    router.post('/', function(req, res){
        let mysql = req.app.get('mysql');
        let sql = "INSERT INTO missions (directive, status, location) VALUES (?,?,?)";
        let inserts = [req.body.directive, req.body.status, req.body.location];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/missions');
            }
        });
    });
    return router;
}();

