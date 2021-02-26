'use strict'

/**
 * ToDoController
 * 
 * This class serves as the event traffic manager, routing all
 * event handling responses.
 */
export default class ToDoController {
    constructor() { }

    setModel(initModel) {
        this.model = initModel;
        let appModel = this.model;

        // SETUP ALL THE EVENT HANDLERS SINCE THEY USE THE MODEL
        document.getElementById("add-list-button").onmousedown = function () {
            appModel.addNewList();
        }
        document.getElementById("undo-button").onmousedown = function () {
            appModel.undo();
        }
        document.getElementById("redo-button").onmousedown = function () {
            appModel.redo();
        }
        document.getElementById("delete-list-button").onmousedown = function () {
            appModel.removeCurrentList();
        }
        document.getElementById("add-item-button").onmousedown = function () {
            appModel.addNewItemTransaction();
        }
    }

    // PROVIDES THE RESPONSE TO WHEN A USER CLICKS ON A LIST TO LOAD
    handleLoadList(listId) {
        // UNLOAD THE CURRENT LIST AND INSTEAD LOAD THE CURRENT LIST
        this.model.loadList(listId);

    }

    handleEditTask(theTarget) {
        var theModel = this.model;
        const pureId = theTarget.parentNode.id.split('-').pop();

        //make an input box w/ value
        var taskBox = document.createElement("input");
        taskBox.setAttribute("class", "task-inputbox");
        taskBox.type = "text";
        taskBox.value = theTarget.innerHTML;

        //change the task 
        taskBox.addEventListener("change", function () {
            taskBox.replaceWith(theTarget);

            //set
            theModel.changeTaskTransaction(pureId, taskBox.value);
        });
        
        //replace 
        console.log("task-col clicked", theTarget, taskBox);
        theTarget.replaceWith(taskBox);

    }

    handleEditDueDate(theTarget) {
        var theModel = this.model;
        const pureId = theTarget.parentNode.id.split('-').pop();
        //make an input box w/ value
        var dueDateBox = document.createElement("input");
        dueDateBox.setAttribute("class", "due-date-inputbox");
        dueDateBox.type = "date";
        dueDateBox.value = theTarget.innerHTML;

        //change the due date 
        dueDateBox.addEventListener("change", function () {
            console.log("changed");
            //theTarget.innerHTML = taskBox.value;
            dueDateBox.replaceWith(theTarget);

            //set
            theModel.changeDueDateTransaction(pureId, dueDateBox.value);
        });

        //replace
        theTarget.replaceWith(dueDateBox);
    }
    handleEditStatus(theTarget) {
        var theModel = this.model;
        const pureId = theTarget.parentNode.id.split('-').pop();

        //make an input box w/ value
        var selectBox = document.createElement("select");
        selectBox.setAttribute("class", "status-selectbox");
        selectBox.setAttribute("id", "selectStatus");

        //add two options
        var optComplete = document.createElement("option");
        optComplete.text = "complete"
        var optIncomplete = document.createElement("option");
        optIncomplete.text = "incomplete"
        selectBox.options[0] = optComplete;
        selectBox.options[1] = optIncomplete;
        selectBox.value = theTarget.innerHTML;

        //change the due date 
        selectBox.addEventListener("change", function () {
            if (selectBox.value == "incomplete") {
                theTarget.setAttribute("id", "incomplete");
            } else {
                theTarget.setAttribute("id", "complete");
            }
            selectBox.replaceWith(theTarget);

            //set
            theModel.changeStatusTransaction(pureId, selectBox.value);
        });

        //replace
        theTarget.replaceWith(selectBox);
    }
    handleItemButtons(theTarget) {
        var theModel = this.model;
        const idForIcons = theTarget.parentNode.parentNode.id.split('-').pop();
        if (theTarget.innerHTML == "keyboard_arrow_up") {
            theModel.moveUpItemTransaction(idForIcons);

        } else if (theTarget.innerHTML == "keyboard_arrow_down") {
            theModel.moveDownItemTransaction(idForIcons);

        } else if (theTarget.innerHTML == "close") {
            theModel.deleteItemTransaction(idForIcons);
        }
    }
}