'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class MoveAnItemUp_Transaction extends jsTPS_Transaction {
    constructor(initModel, id) {
        super();
        this.model = initModel;
        this.id = id;
    }

    doTransaction() {
        this.model.moveUpItem(this.id)
    }

    undoTransaction() {
        this.model.moveDownItem(this.id)
    }
}