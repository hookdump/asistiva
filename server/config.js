module.exports = {
  responseHeaders: {
    'Content-Type': 'text/json',
    'Access-Control-Allow-Origin': 'http://localhost:8000',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type'
  },
  mysql_config: {
    host     : 'localhost',
    user     : 'root',
    password : 'soke6540',
    database : 'asistiva',
    connectionLimit: 10
  }
}
