module.exports = function () {
    let express = require('express');
    let router = express.Router();

    function getPersonnelDuties(res, mysql, context, complete) {
        let query = "SELECT personnel_duties.personnelID, firstName, lastName, personnel_duties.dutyID, dutyName FROM personnel_duties INNER JOIN personnel ON personnel_duties.personnelID = personnel.personnelID INNER JOIN duties ON personnel_duties.dutyID = duties.dutyID";
        mysql.pool.query(query, (error, results, fields) => {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.personToDuty = results;
            complete();
        });
    }
    router.get('/', (req, res) => {
        let callbackCount = 0;
        let context = {};
        let mysql = req.app.get('mysql');
        getPersonnelDuties(res, mysql, context, complete);

        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('personToDuty', context);
            }
        }
    });
    
    router.post('/delete', function(req, res){
        let mysql = req.app.get('mysql');
        let [personnelID, dutyID] = [req.body.personnelID, req.body.dutyID]
        let sql = "DELETE FROM personnel_duties WHERE personnelID = \'" + personnelID + "\' and dutyID = \'" + dutyID + "\'";
        let inserts = [req.body.personnelID, req.body.dutyID];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/personToDuty');
            }
        });
    });

    router.post('/', function(req, res){
        let mysql = req.app.get('mysql');
        let [firstName, lastName, dutyName] = [req.body.firstName, req.body.lastName, req.body.dutyName]
        let sql = "INSERT INTO personnel_duties (personnelID, dutyID) VALUES ((SELECT personnelID FROM personnel WHERE firstName = \'" + firstName + "\' and lastName = \'" + lastName + "\'), (SELECT dutyID FROM duties WHERE dutyName = \'" + dutyName + "\'))";
        let inserts = [req.body.firstName, req.body.lastName, req.body.dutyName];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/personToDuty');
            }
        });
    });
    
    return router;
}();
