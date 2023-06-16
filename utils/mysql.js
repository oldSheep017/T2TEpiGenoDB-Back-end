const mysql = require('mysql2')

const mysqlConnectionConfig = {
	host: '47.243.4.52',
	user: 'root',
	password: 'HDwzk@525',
	database: 'CGGE',
	
}

const sqlConnect = function (sql) {
	return new Promise((resolve, reject) => {
		const con = mysql.createConnection(mysqlConnectionConfig)
		con.query(sql, function (err, results, fields) {
			if (err) {
				reject(err)
			}
			resolve(results)
		})
	})
}

module.exports = sqlConnect
