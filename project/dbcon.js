let mysql = require('mysql');
let pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : '',
  password        : '',
  database        : 'cs340_ladaa'
});
module.exports.pool = pool;