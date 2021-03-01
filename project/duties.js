module.exports = function() {
    let express = require('express');
    let router = express.Router();

    function getDuties(res, mysql, context, complete) {
        let query = "SELECT dutyId, dutyName, priority, responsibilities FROM duties";
        mysql.pool.query(query, (error, results, fields) => {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.duties = results;
            console.log(context.duties);
            complete();
        });
    }
    router.get('/', (req, res) => {
        let callbackCount = 0;
        let context = {};
        let mysql = req.app.get('mysql');
        getDuties(res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if (callbackCount >= 1) {
                console.log(context.duties);
                res.render('duties', context);
            }
        }      
    });

    router.post('/', function(req, res){
        let mysql = req.app.get('mysql');
        let sql = "INSERT INTO duties (dutyName, priority, responsibilities) VALUES (?,?,?)";
        let inserts = [req.body.dutyName, req.body.priority, req.body.responsibilities];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/duties');
            }
        });
    });

    return router;
}();
