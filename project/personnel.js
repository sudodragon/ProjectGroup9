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
            console.log(context.personnel);
            complete();
        });
    }
    router.get('/', (req, res) => {
        let callbackCount = 0;
        let context = {};
        let mysql = req.app.get('mysql');
        getPersonnel(res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if (callbackCount >= 1) {
                console.log(context.personnel);
                res.render('personnel', context);
            }
        }      
    });

//**************This section for ISNERT is untested******************
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