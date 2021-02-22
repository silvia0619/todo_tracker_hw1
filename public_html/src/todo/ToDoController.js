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
        console.log("????????????????", theTarget.className);
        if(theTarget.className == "task-col") {
            console.log("????????????????this is task-col");
            var taskBox = document.createElement("input");
            taskBox.type = "text";
            taskBox.value = theTarget.innerHTML;
            theTarget.replaceWith(taskBox);
            document.addEventListener('click', function (event) {
                console.log("inside of the todoController event here", event.target);
                if (event.target !== taskBox) {
                    var newTask = taskBox.value;
                    taskBox.replaceWith(theTarget);
                    console.log('!!!!!!!!!!!!!!!newValue', newTask);
                }
            });
        }else if (theTarget.className == "due-date-col") {
            console.log("????????????????this is due-date-col");
            var dueDateBox = document.createElement("input");
            dueDateBox.type = "date";
            dueDateBox.value = theTarget.innerHTML;
            theTarget.replaceWith(dueDateBox);
            document.addEventListener('click', function (event) {
                console.log("inside of the todoController event here", event.target);
                if (event.target !== dueDateBox) {
                    var newDueDate = dueDateBox.value;
                    dueDateBox.replaceWith(theTarget);
                    console.log('!!!!!!!!!!!!!!!newValue', newDueDate);
                }
            });
        }else if (theTarget.className == "status-col") {
            console.log("????????????????this is due-date-col");
            var selectBox = document.createElement("select");
            var optComplete = document.createElement("option");
            optComplete.text = "complete"
            var optIncomplete = document.createElement("option");
            optIncomplete.text = "incomplete"
            selectBox.options[0] = optComplete;
            selectBox.options[1] = optIncomplete;
            selectBox.value = theTarget.innerHTML;
            theTarget.replaceWith(selectBox);
            document.addEventListener('click', function (event) {
                console.log("inside of the todoController event here", event.target);
                if (event.target !== selectBox) {
                    var newStatus = selectBox.value;
                    selectBox.replaceWith(theTarget);
                    console.log('!!!!!!!!!!!!!!!newStatus', newStatus);
                }
            });
        }else {

        }
        
        
    }
}