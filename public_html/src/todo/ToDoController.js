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
        if (theTarget.className == "task-col") {                    //handle task

            //make an input box w/ value
            var taskBox = document.createElement("input");
            taskBox.setAttribute("class", "task-inputbox");
            taskBox.type = "text";
            taskBox.value = theTarget.innerHTML;

            //replace 
            theTarget.replaceWith(taskBox);

            //clicked outside
            document.addEventListener('click', function (event) {
                if (event.target !== taskBox) {
                    theTarget.innerHTML = taskBox.value;
                    taskBox.replaceWith(theTarget);

                    //set
                    theModel.setModelDescription(pureId, taskBox.value);
                }
            });
        }
        else if (theTarget.className == "due-date-col") {           //handle due date
            //make an input box w/ value
            var dueDateBox = document.createElement("input");
            dueDateBox.setAttribute("class", "due-date-inputbox");
            dueDateBox.type = "date";
            dueDateBox.value = theTarget.innerHTML;

            //replace
            theTarget.replaceWith(dueDateBox);

            //clicked outside
            document.addEventListener('click', function (event) {
                if (event.target !== dueDateBox) {
                    theTarget.innerHTML = dueDateBox.value;
                    dueDateBox.replaceWith(theTarget);

                    //set
                    theModel.setModelDueDate(pureId, dueDateBox.value);
                }
            });
        } else if (theTarget.className == "status-col") {           //handle status
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

            //replace
            theTarget.replaceWith(selectBox);

            //clicked outside
            document.addEventListener('click', function (event) {
                if (event.target !== selectBox) {
                    selectBox.replaceWith(theTarget);
                    theTarget.innerHTML = selectBox.value;

                    //set
                    theModel.setModelStatus(pureId, selectBox.value);
                }
            });
        } else if (theTarget.className == "list-item-control material-icons") {    //handle three up down delete
            const idForIcons = theTarget.parentNode.parentNode.id.split('-').pop();
            if(theTarget.innerHTML == "keyboard_arrow_up"){
                theModel.moveUpItem(idForIcons);

            }else if(theTarget.innerHTML == "keyboard_arrow_down") {
                theModel.moveDownItem(idForIcons);

            }else if(theTarget.innerHTML == "close") {
                theModel.handleRemoveItem(idForIcons);
            }
        }
    }
}