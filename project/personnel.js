module.exports = function () {
    let express = require('express');
    let router = express.Router();

    // Functions
    function getPersonnel(res, mysql, context, complete) {
        let query = "SELECT personnelId, firstName, lastName, rankName, shipName FROM personnel LEFT JOIN ships ON personnel.shipID = ships.shipID LEFT JOIN ranks on personnel.rankID = ranks.rankID"
        mysql.pool.query(query, (error, results, fields) => {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.personnel = results;
            complete();
        });
    }

    function getPerson(req_query, res, mysql, context, complete) {
        let personnelId = req_query.personnelId;
        let query = "SELECT personnelId, firstName, lastName, rankName, shipName FROM personnel LEFT JOIN ships ON personnel.shipID = ships.shipID LEFT JOIN ranks on personnel.rankID = ranks.rankID";
        let query_predicate = " WHERE personnelId = " + personnelId;

        mysql.pool.query(query + query_predicate, (error, results, fields) => {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.person = results;
        });
        getPersonnel(res, mysql, context, complete);
        getRanks(res, mysql, context, complete);
        getShips(res, mysql, context, complete);
    }

    function deletePerson(person_to_delete, res, mysql, context, complete) {
        let query = "DELETE FROM personnel WHERE personnelId = " + person_to_delete + ";"

        mysql.pool.query(query, (error, results, fields) => {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
        });
        getPersonnel(res, mysql, context, complete);
        getRanks(res, mysql, context, complete);
        getShips(res, mysql, context, complete);
    }

    function getUpdatePersonnel(req, res, mysql, context, complete) {
        let personnelId = req.personnelId
        let query = "SELECT personnelID, firstName, lastName, rankName, shipName FROM personnel LEFT JOIN ranks ON personnel.rankID = ranks.rankID LEFT JOIN ships ON personnel.shipID = ships.shipID WHERE personnel.personnelID = " + personnelId;
        mysql.pool.query(query, (error, results, fields) => {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.updatePersonnel = results;
            context.person = results[0];
            complete();
        });
    }

    function getRanks(res, mysql, context, complete) {
        let query = "SELECT rankId, rankName FROM ranks";

        mysql.pool.query(query, (error, results, fields) => {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            let nullRank = {rankId: "", rankName: "Not Assigned"};
            results.unshift(nullRank);
            context.ranks = results;
            complete();
        });
    }

    function getShips(res, mysql, context, complete) {
        let query = "SELECT shipId, shipName FROM ships";

        mysql.pool.query(query, (error, results, fields) => {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            let nullShip = {shipId: "", shipName: "Not Assigned"};
            results.unshift(nullShip);
            context.ships = results;
            complete();
        });
    }

    //Routes
    router.get('/person', (req, res) => {
        let callbackCount = 0;
        let context = {};
        let mysql = req.app.get('mysql');
        getPerson(req.query, res, mysql, context, complete);

        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('personnel', context);
            }
        }
    });

    router.get('/', (req, res) => {
        let callbackCount = 0;
        let context = {};
        let mysql = req.app.get('mysql');
        getPersonnel(res, mysql, context, complete);
        getRanks(res, mysql, context, complete);
        getShips(res, mysql, context, complete);

        function complete() {
            callbackCount++;
            if (callbackCount >= 3) {
                res.render('personnel', context);
            }
        }
    });

    router.post('/delete', (req, res) => {
        let callbackCount = 0;
        let person_to_delete = req.body.personnelId
        let context = {};
        let mysql = req.app.get('mysql');
        deletePerson(person_to_delete, res, mysql, context, complete);

        function complete() {
            callbackCount++;
            if (callbackCount >= 3) {
                res.render('personnel', context);
            }
        }
    });

    router.get('/update', (req, res) => {
        let callbackCount = 0;
        let context = {};
        let mysql = req.app.get('mysql');
        getUpdatePersonnel(req.query, res, mysql, context, complete);
        getRanks(res, mysql, context, complete);
        getShips(res, mysql, context, complete);

        function complete() {
            callbackCount++;
            if (callbackCount >= 3) {
                res.render('updatePersonnel', context);
            }
        }
    });

    router.post('/update', function (req, res) {
        let mysql = req.app.get('mysql');

        let [updatePersonnelID, fnameUpdate, lnameUpdate, rankUpdate, shipIdUpdate] = [req.body.updatePersonnelID, String(req.body.fnameUpdate), String(req.body.lnameUpdate), req.body.rankUpdate, req.body.shipUpdate]
        console.log(req.body);
        
        if (rankUpdate === "") {
            rankUpdate = null;
        }

        if (shipIdUpdate === "") {
            shipIdUpdate = null;
        }

        let sql = 'UPDATE personnel SET firstName = \"' + fnameUpdate 
                + '\", lastName = \"' + lnameUpdate 
                + '\", rankID = ' + rankUpdate 
                + ', shipID = ' + shipIdUpdate 
                + ' WHERE personnelID = ' + updatePersonnelID;
        let inserts = [req.body.fnameUpdate, req.body.lnameUpdate, req.body.rankUpdate, req.body.shipUpdate];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/personnel');
            }
        });
    });

    router.post('/', function (req, res) {
        let mysql = req.app.get('mysql');
        let rankId = req.body.rankId;
        let shipId = req.body.shipId;

        if (rankId == "") {
            rankId = null;
        };

        if (shipId == "") {
            shipId = null;
        };
  
        let sql = "INSERT INTO personnel (firstName, lastName, rankId, shipId) VALUES (?,?,?,?)";
        let inserts = [req.body.firstName, req.body.lastName, rankId, shipId];

        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/personnel');
            }
        });
    });

    return router;
}();