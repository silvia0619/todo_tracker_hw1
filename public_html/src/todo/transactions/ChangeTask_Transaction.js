'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeTase_Transaction extends jsTPS_Transaction {
    constructor(initModel, theId, newTask, oldTask) {
        super();
        this.model = initModel;
        this.theId = theId;
        this.newTask = newTask;
        this.oldTask = oldTask;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        //this.itemAdded = this.model.addNewItem();
        this.model.setModelDescription(this.theId, this.newTask);
    }

    undoTransaction() {
        this.model.setModelDescription(this.theId, this.oldTask);
    }
}