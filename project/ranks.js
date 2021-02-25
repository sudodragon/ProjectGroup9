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
            console.log(context.ranks);
            complete();
        });
    }
    router.get('/', (req, res) => {
        let callbackCount = 0;
        let context = {};
        let mysql = req.app.get('mysql');
        getRanks(res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if (callbackCount >= 1) {
                console.log(context.ranks);
                res.render('ranks', context);
            }
        }      
    });
    return router;
}();
