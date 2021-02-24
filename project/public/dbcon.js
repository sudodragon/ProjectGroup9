let mysql = require('mysql');
let pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_ladaa',
  password        : '9140',
  database        : 'cs340_ladaa'
});
module.exports.pool = pool;