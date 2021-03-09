module.exports = function() {
    let express = require('express');
    let router = express.Router();
    
    function getShips(res, mysql, context, complete) {
        let query = "SELECT shipId, shipName, registry, class, currentLocation, directive FROM ships LEFT JOIN missions ON ships.missionID = missions.missionID";
        mysql.pool.query(query, (error, results, fields) => {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.ships = results;
            complete();
        });
    }

    function getMissions(res, mysql, context, complete) {
        let query = "SELECT missionId, directive FROM missions";

        mysql.pool.query(query, (error, results, fields) => {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.missions = results;
            complete();
        });
    }


    router.get('/', (req, res) => {
        let callbackCount = 0;
        let context = {};
        let mysql = req.app.get('mysql');
        getShips(res, mysql, context, complete);
        getMissions(res, mysql, context, complete);
        
        function complete(){
            callbackCount++;
            if (callbackCount >= 2) {
                console.log(context)
                res.render('ships', context);
            }
        }      
    });

    //currentLocation and missionId don't work yet

    router.post('/', function(req, res){
        let mysql = req.app.get('mysql');
        let sql = "INSERT INTO ships (shipName, registry, class, currentLocation, missionId) VALUES (?,?,?,?,?)";
        let inserts = [req.body.shipName, req.body.registryNumber, req.body.class, req.body.currentLocation, req.body.missionId];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/ships');
            }
        });
    });

    return router;
}();