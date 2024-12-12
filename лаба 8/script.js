function add() {
    const parent = document.getElementById('elements');

    const element = document.createElement('div');
    element.className = 'line';
    
    const elementId = Date.now().toString() + (Math.floor(Math.random() * 1000)).toString();
    element.id = elementId;
    
    element.appendChild(document.createElement('input'));
    element.appendChild(document.createElement('input'));

    const up = document.createElement('button');
    const down = document.createElement('button');
    const deleteButton = document.createElement('button');

    up.innerText = '↑';
    up.onclick = function () { moveUp(elementId); }
    
    down.innerText = '↓'
    down.onclick = function () { moveDown(elementId); }

    deleteButton.innerText = 'x';
    deleteButton.onclick = function () { deleteLine(elementId); }

    element.appendChild(up);
    element.appendChild(down);
    element.appendChild(deleteButton);

    parent.appendChild(element);
}

function moveUp(id) {
    const elements = document.getElementsByClassName('line'); 
    let oldElements = Array.from(elements); //an array of lines

    //find index of our element
    let index = 0;
    for (let i in oldElements) {
        if (oldElements[i].id == id) {
            index = i;
            break;
        }
    }

    //if index == 0 there is no point moving this element up
    if (index == 0) {
        return;
    }

    let newElements = [];
    const moving = oldElements[index];
    oldElements = oldElements.filter(x => x.id != id);

    if (index == 1) {
        //put our element first, then put the rest of the array
        newElements = newElements.concat(moving).concat(oldElements);
    } else {
        //slice an array in order to move our element up
        newElements = oldElements.slice(0, index - 1).concat(moving).concat(oldElements.slice(index - 1));
    }

    //removing inner html
    const parent = document.getElementById('elements');
    parent.innerHTML = '';

    //adding new list
    for (let element of newElements) {
        parent.appendChild(element);
    }
}

function moveDown(id) {
    const elements = document.getElementsByClassName('line'); 
    let oldElements = Array.from(elements); //an array of lines

    //find index of our element
    let index = 0;
    for (let i in oldElements) {
        if (oldElements[i].id == id) {
            index = i;
            break;
        }
    }
    
    //if element is last there is no point moving it down
    if (index == oldElements.length - 1) {
        return;
    }

    let newElements = [];
    const moving = oldElements[index];
    oldElements = oldElements.filter(x => x.id != id);
    if (index == oldElements.length - 1) {
        //add it to the end of the array
        newElements = newElements.concat(oldElements).concat(moving);
    } else {
        //slice an array in order to move our element down
        newElements = oldElements.slice(0, index + 1).concat(moving).concat(oldElements.slice(index + 1));
    }

    //removing inner html
    const parent = document.getElementById('elements');
    parent.innerHTML = '';

    //adding new list
    for (let element of newElements) {
        parent.appendChild(element);
    }
}

function deleteLine(id) {
    const elements = document.getElementsByClassName('line'); 
    let oldElements = Array.from(elements); //an array of lines

    //filtering array, removing our element
    let newElements = oldElements.filter(x => x.id != id); 

    const parent = document.getElementById('elements');
    parent.innerHTML = '';

    //adding new list
    for (let element of newElements) {
        parent.appendChild(element);
    }
}

function createObject() {
    const elements = document.getElementsByClassName('line'); 
    let array = Array.from(elements); //an array of lines

    if (array.length == 0) {
        return undefined;
    }

    let obj = {};

    for (let element of array) {
        let children = element.children;
        let firstValue = children[0].value;
        let secondValue = children[1].value;
        obj[firstValue] = secondValue;
    }

    return obj;
}

function save() {
    const parent = document.getElementById('save-output');

    parent.innerHTML = '';

    let obj = createObject();

    if (obj == undefined) {
        return;
    }

    const child = document.createElement('p');
    child.innerText = JSON.stringify(obj);

    parent.appendChild(child);
}