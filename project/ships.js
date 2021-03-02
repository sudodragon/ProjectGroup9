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
                res.render('ships', context);
            }
        }      
    });

//**************This section for ISNERT is untested******************
    router.post('/', function(req, res){
        let mysql = req.app.get('mysql');
        let sql = "INSERT INTO ships (shipName, registry, class, currentLocation) VALUES (?,?,?,?)";
        let inserts = [req.body.shipName, req.body.registry, req.body.class, req.body.currentLocation];
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