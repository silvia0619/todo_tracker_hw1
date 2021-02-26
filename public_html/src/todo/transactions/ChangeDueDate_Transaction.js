'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeDueDate_Transaction extends jsTPS_Transaction {
    constructor(initModel, theId, newDate) {
        super();
        this.model = initModel;
        this.theId = theId;
        this.newDate = newDate;
    }

    doTransaction() {
        this.oldDate = this.model.setModelDueDate(this.theId, this.newDate);
    }

    undoTransaction() {
        console.log("undo clicked with oldDate", this.oldDate);
        this.model.setModelDueDate(this.theId, this.oldDate);
    }
}