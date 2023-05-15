const inputBox = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

button.addEventListener('click', function() {
    if (inputBox.value == null) {
        return
    };
    listItem = document.createElement('li');
    deleteButton = document.createElement('button');
    
    listItem.innerHTML = inputBox.value;
    deleteButton.textContent = '❌';

    listItem.appendChild(deleteButton);
    list.appendChild(listItem);

    deleteButton.addEventListener('click', function() {
        list.removeChild(listItem);
    });

    inputBox.focus();
    inputBox.value = '';
});

