let inputField = document.getElementById('inputField');
let addbtn = document.getElementById('addButton');
let buttonName = addbtn.innerText;
let records = document.getElementById('records');
let editId = null;
let arrData = [];

let objStr = localStorage.getItem('arrSavedData');
if (objStr != null) {
    arrData = JSON.parse(objStr)
}
displayData();

addbtn.onclick = () => {
    let inputValue = inputField.value;
    if(editId!=null){
        arrData.splice(editId,1,{ name: inputValue });
        editId = null;
    }else{
        arrData.push({ name: inputValue })
    } 
    saveItem(arrData);
    inputField.value = "";
    addbtn.innerHTML = buttonName;
}

// Save Changes
function saveItem(arr) {
    let str = JSON.stringify(arr);
    localStorage.setItem('arrSavedData', str);
    displayData();
}


// Data display function
function displayData() {
    let visibleContent = '';
    arrData.forEach((user,i) => {
        visibleContent += `
        <tr>
            <th scope="row" class="fs-5">${i+1}</th>
            <td class="fs-4">${user.name}</td>
            <td><i class="bi fs-2 text-white px-3 rounded mx-3 bg-primary bi-pencil-square" onclick='editItem(${i})'></i> <i
                class="bi fs-2 text-white rounded bg-danger px-3 bi-trash3-fill" onclick='deleteItem(${i})'></i>
                <td>
        </tr>`
    })
    records.innerHTML = visibleContent;
}

// Edit function
function editItem(id){
    editId = id;
    inputField.value = arrData[id].name;
    addbtn.innerHTML = 'Save Changes'
}

// Delete function
function deleteItem(id){
    arrData.splice(id,1);
    saveItem(arrData);
}