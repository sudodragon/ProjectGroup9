module.exports = function() {
    let express = require('express');
    let router = express.Router();

    router.get('/', (req, res) => {
        let context = {};
        let ranks = {
            rankId: "", 
            rank : "", 
            pay : "", 
            minYears : ""
        };
        context.ranks = ranks;
        res.render('ranks', context);
    });
    return router;
}();
/* I started this, but haven't finished it

    function getRanks(res, mysql, context) {
        mysql.pool.query("SELECT * FROM ranks", (error, results, fields) => {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            console.log(results);
            context.ranks = results;
        });
    }

    router.get('/', (req, res) => {
        let callbackCount = 0;
        let context = {};
        context.jsscripts = [];
        let mysql = req.app.get('mysql');
        getRanks(res, mysql, context);
        res.render('ranks', context)
    })
}
*/
