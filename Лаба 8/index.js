function addElement() {
    const container = document.getElementById('container');
    const elementDiv = document.createElement('div');
    elementDiv.className = 'element';

    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.placeholder = 'Введите текст';

    const numberInput = document.createElement('input');
    numberInput.type = 'number';
    numberInput.placeholder = 'Введите цифры';

    const moveUpButton = document.createElement('button');
    moveUpButton.innerHTML = '&#8593;';
    moveUpButton.onclick = () => moveElement(elementDiv, -1);

    const moveDownButton = document.createElement('button');
    moveDownButton.innerHTML = '&#8595;';
    moveDownButton.onclick = () => moveElement(elementDiv, 1);

    const removeButton = document.createElement('button');
    removeButton.innerText = 'x';
    removeButton.onclick = () => elementDiv.remove();

    elementDiv.appendChild(textInput);
    elementDiv.appendChild(numberInput);
    elementDiv.appendChild(moveUpButton);
    elementDiv.appendChild(moveDownButton);
    elementDiv.appendChild(removeButton);
    container.appendChild(elementDiv);
}

function moveElement(element, direction) {
    const parent = element.parentNode;
    const siblings = Array.from(parent.children);
    const index = siblings.indexOf(element);
    const newIndex = index + direction;

    if (newIndex >= 0 && newIndex < siblings.length) {
        parent.insertBefore(element, siblings[newIndex + (direction > 0 ? 1 : 0)]);
    }
}

function saveElements() {
    const elements = document.querySelectorAll('.element');
    const result = {};

    elements.forEach(element => {
        const text = element.querySelector('input[type="text"]').value;
        const number = element.querySelector('input[type="number"]').value;
        if (text && number) {
            result[text] = number;
        }
    });

    const outputText = JSON.stringify(result) || 'Нет элементов для отображения.';
    
    document.getElementById('output').innerText = outputText;
}