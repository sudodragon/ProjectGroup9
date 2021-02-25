module.exports = function() {
    let express = require('express');
    let router = express.Router();

    function getPersonnelDuties(res, mysql, context, complete) {
        let query = "SELECT personnelId, dutyId FROM personnel_duties";
        mysql.pool.query(query, (error, results, fields) => {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.personnelDuties = results;
            console.log(context.personnelDuties);
            complete();
        });
    }
    router.get('/', (req, res) => {
        let callbackCount = 0;
        let context = {};
        let mysql = req.app.get('mysql');
        getPersonnelDuties(res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if (callbackCount >= 1) {
                console.log(context.personnelDuties);
                res.render('personToDuty', context);
            }
        }      
    });
    return router;
}();
