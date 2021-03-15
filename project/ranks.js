module.exports = function() {
    let express = require('express');
    let router = express.Router();

    function getRanks(res, mysql, context, complete) {
        let query = "SELECT rankId, rankName, pay, minYears FROM ranks";
        mysql.pool.query(query, (error, results, fields) => {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.ranks = results;
            complete();
        });
    }

    // READ Ranks
    router.get('/', (req, res) => {
        let callbackCount = 0;
        let context = {};
        let mysql = req.app.get('mysql');
        getRanks(res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('ranks', context);
            }
        }      
    });

    // CREATE Ranks
    router.post('/', function(req, res){
        let mysql = req.app.get('mysql');
        let sql = "INSERT INTO ranks (rankName, pay, minYears) VALUES (?,?,?)";
        let inserts = [req.body.rankName, req.body.pay, req.body.minYears];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/ranks');
            }
        });
    });
    
    return router;
}();
