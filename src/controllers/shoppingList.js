const path = require('path');
const shoppingList = require('../model/shoppingList')

module.exports = {
    async getData (req, res) {
        const items = await shoppingList.get();
        return res.render('index', { items })
    },

    async addItem (req, res) {
      const newItem = req.body.newItem;
      if (newItem) {
        const data = await shoppingList.addItem(newItem);
        
        if (data.newItemId) {
          return res.json(data)
        } else {
          res.status(403).json(data)
        }
        
      } else {
        console.log('Entre um item')
      }
    },

    async deleteItem (req,res) {
      const itemId = req.params.id
      if (itemId) {
        const lengthDb = await shoppingList.deleteItem(itemId)
        return res.json(lengthDb)
      } else {
        console.log('Item inválido')
      }
    },

    async clearItems (req,res) {
      await shoppingList.clearItems()
      return res.json('ok')
    },

    async lineThrough (req,res) {
      const itemId = req.params.id

      const itemStatus = await shoppingList.lineThrough(itemId)

      return res.json(itemStatus)
    },
}

