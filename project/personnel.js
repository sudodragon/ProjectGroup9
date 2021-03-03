module.exports = function() {
    let express = require('express');
    let router = express.Router();
    
    function getPersonnel(res, mysql, context, complete) {
        let query = "SELECT personnelId, firstName, lastName, rankId, shipId FROM personnel";
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
        fname = req_query.fnameSearch;
        lname = req_query.lnameSearch;
        let query = "SELECT personnelId, firstName, lastName, rankID, shipId FROM personnel"
        let query_predicate = " WHERE firstName = \'" + fname + "\' AND lastName = \'" + lname + "\'"

        mysql.pool.query(query + query_predicate, (error, results, fields) => {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.person = results;
        });
        getPersonnel(res, mysql, context, complete);
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
    }


    router.get('/person', (req, res) => {
        let callbackCount = 0;
        let context = {};
        let mysql = req.app.get('mysql');
        getPerson(req.query, res, mysql, context, complete);

        function complete(){
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

        function complete(){
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('personnel', context);
            }
        }      
    });

    router.post('/delete', (req, res) => {
        let callbackCount = 0;
        let person_to_delete = req.body.personnelId
        console.log("Going to delete " + person_to_delete);
        let context = {};
        let mysql = req.app.get('mysql');
        deletePerson(person_to_delete, res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('personnel', context);
            }
        }      
    });

    router.get('/update', (req, res) => {
        res.render("updatePersonnel");
    });

    router.post('/update', function(req, res){
        let mysql = req.app.get('mysql');
        let [fnameUpdate, lnameUpdate, rankUpdate, shipUpdate] = [req.body.fnameUpdate, req.body.lnameUpdate, req.body.rankUpdate, req.body.shipUpdate]
        let sql = "UPDATE personnel SET firstName = \'" + fnameUpdate + "\', lastName = \'" + lnameUpdate + "\', rankID = (SELECT rankID FROM ranks WHERE rankName = \'" + rankUpdate + "\'), shipID = (SELECT shipID FROM ships WHERE shipName = \'" + shipUpdate + "\') WHERE firstName = \'" + fnameUpdate + "\' and lastName = \'" + lnameUpdate + "\'";
        let inserts = [req.body.fnameUpdate, req.body.lnameUpdate, req.body.rankUpdate, req.body.shipUpdate];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/personnel');
            }
        });
    });

    router.post('/', function(req, res){
        let mysql = req.app.get('mysql');
        let sql = "INSERT INTO personnel (firstName, lastName) VALUES (?,?)";
        let inserts = [req.body.firstName, req.body.lastName];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/personnel');
            }
        });
    });

    return router;
}();