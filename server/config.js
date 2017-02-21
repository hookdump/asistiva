module.exports = {
  responseHeaders: {
    'Content-Type': 'text/json',
    'Access-Control-Allow-Origin': 'http://localhost:8000',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type'
  },
  psql_config: {
    host     : 'localhost',
    user     : 'asistiva',
    password : '',
    database : 'asistiva',
    connectionLimit: 10
  }
}
