'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeTask_Transaction extends jsTPS_Transaction {
    constructor(initModel, theId, newTask) {
        super();
        this.model = initModel;
        this.theId = theId;
        this.newTask = newTask;
    }

    doTransaction() {
        this.oldTask = this.model.setModelDescription(this.theId, this.newTask);
    }

    undoTransaction() {
        console.log("undo clicked with oldTask", this.oldTask);
        this.model.setModelDescription(this.theId, this.oldTask);
    }
}