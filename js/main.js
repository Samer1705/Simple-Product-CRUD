
// CRUD Operation (Create,Retrieve,Update,Delete)....

var product;
var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productCategory = document.getElementById('productCategory');
var productDesc = document.getElementById('productDesc');

var productContainer;
if (localStorage.getItem('productsProejct3') != null) {
    productContainer = JSON.parse(localStorage.getItem('productsProejct3'));
    displayData(productContainer);
}
else {
    productContainer = [];
}

function addProduct() {
    if (validationByName() && validationByPrice()) {
        product = {
            name: productName.value,
            price: productPrice.value,
            category: productCategory.value,
            desc: productDesc.value
        }
        console.log(product);
        productContainer.push(product);
        console.log(productContainer);
        localStorage.setItem('productsProejct3', JSON.stringify(productContainer));
        displayData(productContainer);
        clearData();

    }
    else {
        alert("Error");
    }
}

function displayData(list) {
    var tableBody = ``;
    for (var i = 0; i < list.length; i++) {
        tableBody += `
        <tr>
            <td>${i}</td>
            <td>${list[i].name}</td>
            <td>${list[i].price}</td>
            <td>${list[i].category}</td>
            <td>${list[i].desc}</td>
            <td><button class="btn btn-outline-info" onclick="editData(${i})">Edit</button></td>
            <td><button class="btn btn-outline-danger" onclick="deleteData(${i})">Delete</button></td>
        </tr>`;
    }
    document.getElementById('myTable').innerHTML = tableBody;
}

function clearData() {
    productName.value = '';
    productPrice.value = '';
    productCategory.value = '';
    productDesc.value = '';
}

function deleteData(index) {
    productContainer.splice(index, 1);
    localStorage.setItem('productsProejct3', JSON.stringify(productContainer));
    displayData(productContainer);
}
var i;
function editData(index) {
    document.getElementById('update').classList.remove('d-none');
    document.getElementById('add').classList.add('d-none');
    productName.value = productContainer[index].name;
    productPrice.value = productContainer[index].price;
    productCategory.value = productContainer[index].category;
    productDesc.value = productContainer[index].desc;
    i = index;
}
function updateData(i) {
    productContainer[i].name = productName.value;
    productContainer[i].price = productPrice.value;
    productContainer[i].category = productCategory.value;
    productContainer[i].desc = productDesc.value;
    localStorage.setItem('productsProejct3', JSON.stringify(productContainer));
    displayData(productContainer);
    document.getElementById('update').classList.add('d-none');
    document.getElementById('add').classList.remove('d-none');
}
function search(x) {
    var searchContainer = [];
    for (let i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(x.toLowerCase())) {
            searchContainer.push(productContainer[i]);
        }
        displayData(searchContainer);
    }
}
function getI() {
    return i;
}

function validationByName() {
    var regex = /^[A-Z][a-z]{3,8}$/;
    if (regex.test(productName.value)) {
        if(productName.classList.contains('is-invalid')){
            productName.classList.replace('is-invalid','is-valid');
        }
        else{
            productName.classList.add('is-valid');  

        }
        return true;
    }
    else {
        if(productName.classList.contains('is-valid')){
            productName.classList.replace('is-valid','is-invalid');
        }
        else{
            productName.classList.add('is-invalid');  

        }
        return false;
    }
}
function validationByPrice() {
    var regex = /^[1-9][0-9][0-9]|1000\$$/;
    if (regex.test(productPrice.value)) {
        if(productPrice.classList.contains('is-invalid')){
            productPrice.classList.replace('is-invalid','is-valid');
        }
        else{
            productPrice.classList.add('is-valid');  

        }
        return true;
    }
    else {
        if(productPrice.classList.contains('is-valid')){
            productPrice.classList.replace('is-valid','is-invalid');
        }
        else{
            productPrice.classList.add('is-invalid');  

        }
        return false;
    }
}