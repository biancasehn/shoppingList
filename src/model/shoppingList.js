const Database = require('../db/config')

module.exports = {
    async get() {
        const db = await Database();

        const shoppingList = await db.all(`SELECT * FROM shoppingList`)

        await db.close()

        return shoppingList.map(item => ({
            id: item.id,
            item: item.item,
            status: item.status
        }));
    },

    async addItem(newItem) {
        const db = await Database();
        try {
            await db.run(`INSERT INTO shoppingList (item) VALUES ("${newItem}");`)

            const newItemId = await db.get(`SELECT id FROM shoppingList WHERE item = "${newItem}"`)

            const shoppingListTable = await db.all(`SELECT * FROM shoppingList`)

            await db.close()

            const lengthDb = shoppingListTable.length
            
            return {
                newItemId: newItemId.id,
                lengthDb
            }

        } catch(e) {
            return e
        }
        
    },

    async deleteItem(itemId) {
        const db = await Database()

        await db.run(`DELETE FROM shoppingList WHERE id = ${itemId};`)

        const shoppingListTable = await db.all(`SELECT * FROM shoppingList`)
        
        await db.close()
        
        const lengthDb = shoppingListTable.length

        return lengthDb
    },

    async clearItems() {
        const db = await Database()

        await db.run(`DELETE FROM shoppingList`)

        await db.close()
    },

    async lineThrough(itemId) {
        const db = await Database();   
        
        let currentStatus = await db.get(`SELECT status FROM shoppingList WHERE id = ${itemId}`)
        if (currentStatus.status === "toBuy") {
            currentStatus = "bought" 
        } else if (currentStatus.status === "bought") {
            currentStatus = "toBuy"
        }

        await db.run(`UPDATE shoppingList SET status='${currentStatus}' WHERE id = ${itemId};`)
        
        await db.close()

        return currentStatus
    }
}