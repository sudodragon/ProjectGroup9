module.exports = function() {
    let express = require('express');
    let router = express.Router();
    router.get('/', (req, res) => {
        res.render('personToDuty');
    });
    return router;
}();