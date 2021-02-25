'use strict'

import ToDoList from './ToDoList.js'
import ToDoListItem from './ToDoListItem.js'
import jsTPS from '../common/jsTPS.js'
import AddNewItem_Transaction from './transactions/AddNewItem_Transaction.js'
import ChangeTase_Transaction from './transactions/ChangeTask_Transaction.js'

/**
 * ToDoModel
 * 
 * This class manages all the app data.
 */
export default class ToDoModel {
    constructor() {
        // THIS WILL STORE ALL OF OUR LISTS
        this.toDoLists = [];

        // THIS IS THE LIST CURRENTLY BEING EDITED
        this.currentList = null;

        // THIS WILL MANAGE OUR TRANSACTIONS
        this.tps = new jsTPS();

        // WE'LL USE THIS TO ASSIGN ID NUMBERS TO EVERY LIST
        this.nextListId = 0;

        // WE'LL USE THIS TO ASSIGN ID NUMBERS TO EVERY LIST ITEM
        this.nextListItemId = 0;
    }

    /**
     * addItemToCurrentList
     * 
     * This function adds the itemToAdd argument to the current list being edited.
     * 
     * @param {*} itemToAdd A instantiated item to add to the list.
     */
    addItemToCurrentList(itemToAdd) {
        this.currentList.push(itemToAdd);
    }

    /**
     * addNewItemToCurrentList
     * 
     * This function adds a brand new default item to the current list.
     */
    addNewItemToCurrentList() {
        let newItem = new ToDoListItem(this.nextListItemId++);
        this.addItemToList(this.currentList, newItem);
        return newItem;
    }

    /**
     * addItemToList
     * 
     * Function for adding a new item to the list argument using the provided data arguments.
     */
    addNewItemToList(list, initDescription, initDueDate, initStatus) {
        let newItem = new ToDoListItem(this.nextListItemId++);
        newItem.setDescription(initDescription);
        newItem.setDueDate(initDueDate);
        newItem.setStatus(initStatus);
        list.addItem(newItem);
        if (this.currentList) {
            this.view.refreshList(list);
        }
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * setModelDescription(theId, newTask)
     */
    setModelDescription(theId, newTask) {
        for (var i = 0; i < this.currentList.items.length; i++) {
            if (this.currentList.items[i].id == theId) {
                this.currentList.items[i].setDescription(newTask);
            }
        }
    }

    /**
     * setModelDueDate(theId, newDueDate)
     */
    setModelDueDate(theId, newDueDate) {
        for (var i = 0; i < this.currentList.items.length; i++) {
            if (this.currentList.items[i].id == theId) {
                this.currentList.items[i].setDueDate(newDueDate);
            }
        }
    }

    /**
     * setModelStatus(theId, newStatus)
     */
    setModelStatus(theId, newStatus) {
        for (var i = 0; i < this.currentList.items.length; i++) {
            if (this.currentList.items[i].id == theId) {
                this.currentList.items[i].setStatus(newStatus);
            }
        }
    }

    /**
     * handleRemoveItem(theId)
     */
    handleRemoveItem(theId) {
        var removeItem;
        for (var i = 0; i < this.currentList.items.length; i++) {
            if (this.currentList.items[i].id == theId) {
                removeItem = this.currentList.items[i]
                this.removeItem(removeItem);
            }
        }
        return removeItem;
    }

    /**DOES NOT WORK PROPERLY
     * moveUpItem(theId)
     */
    moveUpItem(theId) {
        var theIndex;
        for (var i = 0; i < this.currentList.items.length; i++) {
            if (this.currentList.items[i].id == theId) {
                theIndex = i;
            }
        }
        if (theIndex > 0) {
            this.currentList.items.splice(theIndex - 1, 2, this.currentList.items[theIndex], this.currentList.items[theIndex - 1]);
            console.log(this.currentList.items);
            this.view.viewList(this.currentList);
        }
    }

    /**DOES NOT WORK PROPERLY
     * moveDownItem(theId)
     */
    moveDownItem(theId) {
        var theIndex;
        for (var i = 0; i < this.currentList.items.length; i++) {
            if (this.currentList.items[i].id == theId) {
                theIndex = i;
            }
        }
        if (theIndex < this.currentList.items.length) {
            this.currentList.items.splice(theIndex, 2, this.currentList.items[theIndex + 1], this.currentList.items[theIndex]);
            console.log(this.currentList.items);
            this.view.viewList(this.currentList);
        }
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * addNewItemTransaction
     * 
     * Creates a new transaction for adding an item and adds it to the transaction stack.
     */
    addNewItemTransaction() {
        let transaction = new AddNewItem_Transaction(this);
        this.tps.addTransaction(transaction);
    }

    /**
     * changeTaskTransaction
     * 
     * Creates a new transaction for changing a task and adds it to the transaction stack.
     */
    changeTaskTransaction(theId, newTask) {
        let transaction = new ChangeTase_Transaction(this, theId, newTask);
        this.tps.addTransaction(transaction);
    }

    deleteItemTransaction() {
        let transaction = new DeleteAnItem_Transaction(this, theId);
        this.tps.addTransaction(transaction);
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * addNewList
     * 
     * This function makes a new list and adds it to the application. The list will
     * have initName as its name.
     * 
     * @param {*} initName The name of this to add.
     */
    addNewList(initName) {
        let newList = new ToDoList(this.nextListId++);
        if (initName)
            newList.setName(initName);
        this.toDoLists.push(newList);
        this.view.appendNewListToView(newList);
        return newList;
    }

    /**
     * Adds a brand new default item to the current list's items list and refreshes the view.
     */
    addNewItem() {
        let newItem = new ToDoListItem(this.nextListItemId++);
        this.currentList.items.push(newItem);
        this.view.viewList(this.currentList);
        return newItem;
    }

    /**
     * Makes a new list item with the provided data and adds it to the list.
     */
    loadItemIntoList(list, description, due_date, assigned_to, completed) {
        let newItem = new ToDoListItem();
        newItem.setDescription(description);
        newItem.setDueDate(due_date);
        newItem.setAssignedTo(assigned_to);
        newItem.setCompleted(completed);
        this.addItemToList(list, newItem);
    }



    /**
     * Load the items for the listId list into the UI.
     */
    loadList(listId) {
        let listIndex = -1;
        for (let i = 0; (i < this.toDoLists.length) && (listIndex < 0); i++) {
            if (this.toDoLists[i].id === listId)
                listIndex = i;
        }
        if (listIndex >= 0) {
            let listToLoad = this.toDoLists[listIndex];
            this.currentList = listToLoad;
            this.view.viewList(this.currentList);
        }
        var selectedList = this.toDoLists[listIndex];
        this.toDoLists.splice(listIndex, 1);
        this.toDoLists.unshift(selectedList);
        this.view.refreshLists(this.toDoLists);
        document.getElementById("todo-list-" + listId).setAttribute("class", "highlight");
        //document.getElementById("todo-list-" + listId).style.backgroundColor = "#f5bc75";
    }

    /**
     * Redo the current transaction if there is one.
     */
    redo() {
        if (this.tps.hasTransactionToRedo()) {
            this.tps.doTransaction();
        }
    }

    /**
     * Remove the itemToRemove from the current list and refresh.
     */
    removeItem(itemToRemove) {
        this.currentList.removeItem(itemToRemove);
        this.view.viewList(this.currentList);
    }

    /**
     * Finds and then removes the current list.
     */
    removeCurrentList() {
        const handleDelete = async () => {
            document.getElementById("add-list-button").style.visibility = 'visible';
            let indexOfList = -1;
            for (let i = 0; (i < this.toDoLists.length) && (indexOfList < 0); i++) {
                if (this.toDoLists[i].id === this.currentList.id) {
                    indexOfList = i;
                }
            }
            this.toDoLists.splice(indexOfList, 1);
            for (let i = 0; i < this.toDoLists.length; i++) {
                this.toDoLists[i].id = i;
            }
            this.currentList = null;
            this.view.clearItemsList();
            this.view.refreshLists(this.toDoLists);
            modal.style.display = "none";
            console.log("this.toDoLists", this.toDoLists);
        }

        var modal = document.getElementById("myModal");

        // Get the button that opens the modal
        var btn = document.getElementById("delete-list-button");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        var confirm = document.getElementById("confirm");
        var cancel = document.getElementById("cancel");

        // When the user clicks the button, open the modal 
        btn.onclick = function () {
            modal.style.display = "block";
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }

        confirm.onclick = function () {
            handleDelete();
        }

        cancel.onclick = function () {
            modal.style.display = "none";
        }


        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    // WE NEED THE VIEW TO UPDATE WHEN DATA CHANGES.
    setView(initView) {
        this.view = initView;
    }

    /**
     * Undo the most recently done transaction if there is one.
     */
    undo() {
        if (this.tps.hasTransactionToUndo()) {
            this.tps.undoTransaction();
        }
    }
}