function refreshPage() {
    var listTask = JSON.parse(localStorage.getItem('listTask'));
    var text = '';
    if (listTask == null || listTask.length == 0){
        text = `
        <div id="empty">
        Welcome to my Todo App. <br> <br>
        Press 'Add new task' for adding your first task.
        </div>
        `;
    }
    else {
        listTask.forEach((val, idx) => {
            text += `
            <div class = "block" id="${idx}">
            <div class="item-block">
                <p class="label-item">Title</p>
                <p class="text-item">${val[0]}</p>
            </div>
            <div class="item-block">
                <p class="label-item">From</p>
                <p class="text-item">${val[1]}</p>
                <p class="label-item">To</p>
                <p class="text-item">${val[2]}</p>
            </div> 
            <button class="btn ${val[3]?'complete':'uncomplete'}" onclick="changeState(${idx})">${val[3]?'Complete':'Mark as Complete'}</button>
            <button class="btn delete" onclick="deleteTask(${idx})">Delete</button>
            </div>
            `
        });
    }
    document.getElementById('todoList').innerHTML = text;
}

function changeState(idx){
    var listTask = JSON.parse(localStorage.getItem('listTask'));
    listTask[idx][3] = !listTask[idx][3];
    localStorage.setItem('listTask', JSON.stringify(listTask));
    refreshPage();
}

function deleteTask(idx){
    var listTask = JSON.parse(localStorage.getItem('listTask'));
    listTask.splice(idx, 1);
    localStorage.setItem('listTask', JSON.stringify(listTask));
    refreshPage();
}

const inputText = document.getElementsByClassName('input-text')[0];
const startTime = document.getElementById('start-time');
const endTime = document.getElementById('end-time');
const btn = document.getElementsByClassName('btn add')[1];

btn.addEventListener('click', () => {
    if (inputText.value.trim() != "" && startTime.value != "" && endTime.value != "") {
        var listTask = JSON.parse(localStorage.getItem('listTask'));
        if (listTask == null) {
            listTask = []
        }
        listTask.push([inputText.value.trim(), startTime.value, endTime.value, false]);
        localStorage.setItem('listTask', JSON.stringify(listTask));
        console.log(inputText.value);
        refreshPage();
    }
});

document.getElementById("delete-all").addEventListener("click", () => {
    localStorage.clear();
    refreshPage();
})

document.getElementById('add-task-button').addEventListener('click', () => {
    document.getElementById('add-task-container').classList.add('show');
});

document.getElementsByClassName('btn close')[0].addEventListener('click', () => {
    document.getElementById('add-task-container').classList.remove('show');
});

refreshPage();
