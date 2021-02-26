'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class DeleteAnItem_Transaction extends jsTPS_Transaction {
    constructor(initModel, id) {
        super();
        this.model = initModel;
        this.id = id;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        var returnVals = this.model.handleRemoveItem(this.id);
        this.removedItem = returnVals[0];
        this.index = returnVals[1];
        console.log(this.index);
    }

    undoTransaction() {
        this.model.addItemToCurrentList(this.index, this.removedItem);
    }
}