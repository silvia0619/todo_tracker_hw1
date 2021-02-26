'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeStatus_Transaction extends jsTPS_Transaction {
    constructor(initModel, theId, newStatus) {
        super();
        this.model = initModel;
        this.theId = theId;
        this.newStatus = newStatus;
    }

    doTransaction() {
        this.oldStatus = this.model.setModelStatus(this.theId, this.newStatus);
    }

    undoTransaction() {
        console.log("undo clicked with oldStatus", this.oldStatus);
        this.model.setModelStatus(this.theId, this.oldStatus);
    }
}