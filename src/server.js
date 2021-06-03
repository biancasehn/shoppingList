const express = require('express');
const server = express();
const path = require('path');
const cors = require('cors');
const shoppingListController = require('./controllers/shoppingList');
const { Console } = require('console');
// const routes = express.Router();

//definindo o port
const PORT = process.env.PORT || 3000;

server.set('views', path.join(__dirname, 'views'))

//usando template engine
server.set('view engine', 'ejs')

//middleware: dizendo pro express buscar arquivos estaticos (css, images, js) na pasta public
server.use(express.static("public"))

server.use(cors())

//middleware que permite pegar o body do req
// server.use(express.urlencoded({ extended: true }))
server.use(express.json())

//pegando os dados da db pra mostrar no get
server.get('/', shoppingListController.getData)
server.post('/', shoppingListController.addItem)
server.delete('/delete/:id', shoppingListController.deleteItem)
server.delete('/delete', shoppingListController.clearItems)
server.get('/lineThrough/:id', shoppingListController.lineThrough)

server.listen(PORT, () => console.log("rodando"))