import Modal from './modal.js'
import ErrorMessage from './errorMessage.js'

const modal = Modal()
const errorMessage = ErrorMessage()

//variables
const ulList = document.getElementById("itemsUL")
const btnClearAllItems = document.getElementById("resetList")
const inputForm = document.getElementById("inputContainer")
const valueInput = document.getElementById("newItem")
const mainDiv = document.getElementById("main")
const modalBtnClearList = document.querySelector(".btnReset")

const Url = "https://shoppinglist-application-v2.herokuapp.com"

// Manipulation functions
const createNewItem = (valueNewItem,newItemId, lengthDb) => {
  const newDiv = document.createElement('div')
  newDiv.setAttribute("class", "itemsList")

  const newLi = document.createElement('LI')
  newLi.innerHTML = valueNewItem
  newLi.setAttribute("class", "toBuy")
  newLi.setAttribute("id", "item-li")
  newLi.setAttribute("itemId", newItemId)

  const btnDeleteItem = document.createElement("button")
  btnDeleteItem.innerHTML = "X"
  btnDeleteItem.setAttribute("id", "deleteItem")
  btnDeleteItem.setAttribute("itemId", newItemId)

  newDiv.appendChild(newLi)
  newDiv.appendChild(btnDeleteItem)

  ulList.appendChild(newDiv)
  valueInput.value = ''
  if (lengthDb === 2) {
  addClearButton()
  }
}

const createBtnClearItems = () => {
  const btnClearAllItems = document.createElement("button")
  btnClearAllItems.innerHTML = "Clear items"
  btnClearAllItems.setAttribute("id", "resetList")
  btnClearAllItems.setAttribute("type", "submit")

  mainDiv.appendChild(btnClearAllItems)
}

const addClearButton = () => {
  btnClearAllItems ? btnClearAllItems.style.display = "" : createBtnClearItems()
}

const removeClearButton = () => {
  document.getElementById("resetList").style.display = "none";
}
//Handler functions -----> Leave only the fetches(?)
const addNewItem = (event) => {
  event.preventDefault()
  errorMessage.close()
  
  const valueNewItem = valueInput.value.toLowerCase()

  fetch(`${Url}/`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      newItem: valueNewItem,
    })
  })
  .then(response => {
    if (response.status >= 200 && response.status < 300) {
      return response.json() 
    } else throw errorMessage.open() 
  })
  .then(data => {
    const { newItemId, lengthDb } = data
    createNewItem(valueNewItem, newItemId, lengthDb)
  })
  .catch(err => console.log('Request failed', err))
}

const deleteItem = (event) => {
  event.preventDefault();
  const itemToBeDeleted = event.target
  const itemId = event.target.getAttribute("itemId")

  fetch(`${Url}/delete/${itemId}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  })
  .then(response => {
    if (response.status >= 200 && response.status < 300) {
      return response.json()
    }
  })
  .then(lengthDb => {
      itemToBeDeleted.parentElement.remove()
      if (lengthDb < 2) {
        removeClearButton()
      }
  })
  .catch(err => console.log('Request failed', err))
}

const clearList = (event) => {
  event.preventDefault();
  modal.close()
    fetch(`${Url}/delete`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
  
      // removing all the divs under ulList
      while (ulList.firstChild) {
        //everytime the first child is removed, the second one becomes the first
        ulList.removeChild(ulList.firstChild);
      }
      removeClearButton();
      }
    })
    .catch(err => console.log('Request failed',err))     
}

const lineThroughItem = (event) => {
  const itemId = event.target.getAttribute("ItemId")

  fetch(`${Url}/lineThrough/${itemId}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  })
  .then(response => {
    if (response.status >= 200 && response.status < 300) {
      return response.json()
    }
  })
  .then(data => {
    event.target.setAttribute('class', data)
  })
  .catch(err => console.log('Request failed', err))
}

//addEventListeners:
  // Add new item
inputForm.onsubmit = (addNewItem)

  // Delete item / Line through item
ulList.addEventListener('click', (event => {
  event.target.id === "deleteItem" ? deleteItem(event) : lineThroughItem(event)
}))

  // Clear List
mainDiv.addEventListener('click', (event => {
  if (event.target.id ==="resetList") {
    modal.open()
  }
}))

modalBtnClearList.addEventListener('click', clearList)