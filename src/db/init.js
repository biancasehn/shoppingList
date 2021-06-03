const Database = require('./config');

const initDb = {
    async init() {
        const db = await Database()

        await db.exec(`CREATE TABLE shoppingList (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            item TEXT NOT NULL UNIQUE,
            status TEXT DEFAULT "toBuy"
        );`)

        await db.run(`INSERT INTO shoppingList (item) VALUES ("banana");`)

        await db.run(`INSERT INTO shoppingList (item) VALUES ("eggs");`)

        await db.close() //fechando a conexao com o db
    }
}

initDb.init()