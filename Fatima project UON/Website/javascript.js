let p = document.getElementById('submit-error');
let inputs = document.querySelectorAll('input');
// inputs.forEach(element => {
//     element.addEventListener('input', (e)=>{

//     })
// });


function logIn() {
    let detail = [];
    let clear = true;

    let login_input = document.getElementById('login-box').getElementsByTagName('input');
    for (let i of login_input) { i.value == '' ? clear = false : detail.push(i.value) };

    // let local = localStorage.getItem(login_input[0].value);
    // let local_email = JSON.parse(local);

    switch (true) {
        case !clear:
            p.innerHTML = 'Please fill the complete information'
            break;
        case detail[0] != "acpsadmin":
            p.innerHTML = 'This username does not exist please check your username'
            break;
        case detail[1] != "autocps$123":
            p.innerHTML = 'Password does not match'
            break;
        default:
            p.innerHTML = '<b style="color: green">Successfully login</b>'
            localStorage.setItem('login', true)
            location.href = './index.html'
    }
}

function logOut() {
    localStorage.setItem('login', false);
}

const passInput = document.querySelector('#password');
const eye = document.querySelector('#eye');
const eyeclick = () => {
    if (passInput.type == 'password') {
        passInput.type = 'text';
        eye.innerHTML = 'Hide';
        eye.classList.remove('show');
        eye.classList.add('hide');
    }
    else {
        passInput.type = 'password'
        eye.innerHTML = 'Show';;
        eye.classList.remove('hide');
        eye.classList.add('show');
    }
};


















const new_btn = document.querySelector('.btn-new');
const edit_btn = document.querySelector('.btn-edit');
const del_btn = document.querySelector('.btn-del');
const cross = document.querySelector('#cross');
const submit_btn = document.getElementById('submit-btn');
const mod = document.getElementById('mod');
const table = document.getElementById('all-data');
let allRecords = [];

function setTwoDigit(a) {
    let b = a.toString()
    if (b.length == 1) b = "0" + b
    return b;
}

new_btn.onclick = () => {
    mod.style.display = 'block';
    let no
    if (!table.firstElementChild) no = 0
    else no = table.firstElementChild.firstElementChild.innerHTML
    let login_input = document.getElementById("mod").querySelectorAll('input');
    login_input[0].value = ++no;

    let d = new Date()
    let year = setTwoDigit(d.getFullYear())
    let month = setTwoDigit(d.getMonth() + 1)
    let day = setTwoDigit(d.getDate())
    let hour = setTwoDigit(d.getHours())
    let minutes = setTwoDigit(d.getMinutes())
    let format_date = `${year}-${month}-${day} ${hour}:${minutes}`
    login_input[2].value = format_date
    login_input[5].value = "Active"
}
cross.addEventListener('click', () => {
    mod.style.display = 'none'
})


submit_btn.onclick = (e) => {
    e.preventDefault();

    let detail = [];

    let login_input = document.getElementById("mod").querySelectorAll('input');
    for (let i of login_input) {
        i.value == '' ? detail.push('-') : detail.push(i.value)
        i.value = ''
    }
    if (detail[1] == "-" || detail[2] == "-") {
        console.log("please fill")
        return false
    }
    detail[2] = detail[2].replace('T', " | ");
    detail[3] = detail[3].replace('T', " | ");

    mod.style.display = 'none';
    let html = `
        <tr>
            <td>${detail[0]}</td>
            <td>${detail[1]}</td>
            <td>${detail[2]}</td>
            <td>${detail[3]}</td>
            <td>${detail[4]}</td>
            <td>${detail[5]}</td>
        </tr>`;
    table.insertAdjacentHTML("afterbegin", html);
    allRecords.unshift(html)
    // console.log(allRecords)
    saveTable();
}
// console.log(allRecords)









del_btn.onclick = (e) => {
    e.preventDefault()

    let trs = document.querySelector('.table').querySelectorAll('tr')
    trs = Array.from(trs)
    trs.forEach(element => {
        element.insertAdjacentHTML("beforeend", '<td><p class="del-box" onclick="deleteRow(this)">x</p></td>');
    });
}

function deleteRow(element) {
    let row = element.parentElement.parentElement
    console.log(row)
    
    // if (row.innerHTML = allRecords[]) {
    //     let confi = confirm("Do you Want to delete this row?")
    // }
}

// let arr = [1,2,3,4,5]
// console.log(arr.indexOf())




function saveTable() {
    localStorage.setItem('table', allRecords);
}
// saveTable();
function getTable() {
    let all = localStorage.getItem('table')
    if (all !== null) {
        all = all.split(",")
        all.forEach(element => {
            allRecords.unshift(element)
        });
    }
    allRecords = allRecords.reverse()
    // console.log(allRecords)
    all = all.toString()
    all = all.replaceAll(',', ' ')
    // console.log(all)
    table.innerHTML = all 
}
getTable();