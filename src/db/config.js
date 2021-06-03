const sqlite3 = require('sqlite3');
const { open } = require('sqlite')

//abrir a conexao com o db:

module.exports = () => open({
    filename: './database.sqlite',
    driver: sqlite3.Database
})