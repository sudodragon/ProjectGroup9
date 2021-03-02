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

        // GET params from form
        mysql.pool.query(query + query_predicate, (error, results, fields) => {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.person = results;
            complete();
        });
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