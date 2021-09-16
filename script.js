const splash = document.getElementById("splash");
const itens = document.getElementById("items");
const sideList = document.getElementById("lista");
const formInput = document.querySelector("#form-input");
let inputTask = document.getElementById("task");
const adicionados = document.querySelector("#adicionados");
const checkbox = document.getElementsByClassName("checkboxes");
const btnSalvar = document.getElementById("btn-salvar");
let itemArray = [];
let itemObj = {};
let listasSalvas = [];
let id = localStorage.length + 1;
const createListItem = (item) => {
  let itemDiv = document.createElement("div");
  let itemCheckbox = document.createElement("input");
  itemCheckbox.classList.add("checkboxes");
  itemCheckbox.setAttribute("type", "checkbox");
  itemCheckbox.setAttribute("name", item);
  itemCheckbox.setAttribute("id", `${item}${id}`);
  let itemLi = document.createElement("label");
  itemLi.classList.add("line-through");
  itemLi.setAttribute("for", `${item}${id}`);
  let itemLiNode = document.createTextNode(item);
  itemLi.appendChild(itemLiNode);
  let itemSpan = document.createElement("span");
  itemSpan.innerHTML = '<i class="bi bi-trash"></i>';
  itemSpan.classList.add("delete");
  itemSpan.setAttribute("onclick", "deleteItem(this)");
  itemDiv.appendChild(itemCheckbox);
  itemDiv.appendChild(itemLi);
  itemDiv.appendChild(itemSpan);
  itemDiv.setAttribute("name", item);

  adicionados.appendChild(itemDiv);
};

formInput.addEventListener("submit", (event) => {
  event.preventDefault();
  inputTask = document.getElementById("task").value;

  if (inputTask && inputTask.trim()) {
    createListItem(inputTask);
  } else {
    alert("algo de errado não esta certo!");
  }
  inputTask.innerText = " ";
});
const salvarLista = () => {
  for (let i = 0; i < checkbox.length; i++) {
    let itemChecked = checkbox[i].checked;
    let itemName = checkbox[i].name;
    console.log(itemChecked);
    console.log(itemName);
    itemObj.name = itemName;
    itemObj.check = itemChecked;
    itemArray.push(itemObj);
    itemObj = {};
  }
  if (itemArray != "") {
    toStorage();
    itemArray = [];
    console.log(itemArray);
  } else {
    alert("lista vazia");
  }
};
btnSalvar.addEventListener("click", salvarLista);

const toStorage = () => {
  id = localStorage.length + 1;
  localStorage.setItem(`lista ${id}`, JSON.stringify(itemArray));
  adicionados.innerHTML = "";
  console.log("addedeu");
  sideList.innerHTML = "";
  fromStorage();
};
const deleteItem = (ele) => {
  let del = ele.parentElement.getAttribute("name");
  console.log(del);
  ele.parentElement.remove();
};
const deleteFromStorage = (ele) => {
  let listPosition = ele.previousSibling.innerHTML;
  localStorage.removeItem(listPosition);
  sideList.innerHTML = "";
  resetStorage()
  
  
};
const fromStorage = () => {
  let storageKeys = [];
  for (let j = 0; j < localStorage.length; j++) {
    storageKeys.push(localStorage.key(j));
  }
  storageKeys.sort();

  for (let i = 0; i < localStorage.length; i++) {
    let key = storageKeys[i];
    let newItem = document.createElement("div");
    let newItemName = document.createTextNode(key);
    let itemDelete = document.createElement("button");
    itemDelete.setAttribute("onclick", "deleteFromStorage(this)");

    itemDelete.innerHTML = '<i class="bi bi-trash"></i>';
    itemDelete.classList.add("delete-storage");
    newItem.appendChild(newItemName);
    newItem.setAttribute("onclick", "testingSideList(this)");
    newItem.classList.add("card");

    sideList.appendChild(newItem);
    sideList.appendChild(itemDelete);
  }
};
fromStorage();

const testingSideList = (ele) => {
  adicionados.innerHTML = "";
  let arrayItem = JSON.parse(localStorage.getItem(ele.innerHTML));
  arrayItem.forEach((lista) => {
    let itemDiv = document.createElement("div");
    let itemCheckbox = document.createElement("input");
    itemCheckbox.classList.add("checkboxes");
    itemCheckbox.setAttribute("type", "checkbox");
    itemCheckbox.checked = lista.check;
    itemCheckbox.setAttribute("name", lista.name);
    itemCheckbox.setAttribute("id", lista.name + id);
    let itemLi = document.createElement("label");
    itemLi.classList.add("line-through");
    itemLi.setAttribute("for", lista.name + id);
    let itemLiNode = document.createTextNode(lista.name);
    itemLi.appendChild(itemLiNode);
    let itemSpan = document.createElement("span");
    itemSpan.innerHTML = '<i class="bi bi-trash"></i>';
    itemSpan.classList.add("delete");
    itemSpan.setAttribute("onclick", "deleteItem(this)");
    itemDiv.appendChild(itemCheckbox);
    itemDiv.appendChild(itemLi);
    itemDiv.appendChild(itemSpan);
    itemDiv.setAttribute("name", lista.name);

    adicionados.appendChild(itemDiv);
  });
};


const resetStorage = () => {
  let storageArray  = []     
       for(let i =0; i<localStorage.length;i++){
        let key = localStorage.key(i)
        let refresh = JSON.parse(localStorage.getItem(key))
        
        storageArray.push(refresh)
        
       console.log(refresh)
       }
       localStorage.clear()
       for(let j = 0;j<storageArray.length; j++){
         console.log()
        localStorage.setItem(`lista ${j+1}`,JSON.stringify(storageArray[j]))

       }
fromStorage()
}

/**for (let i = 1; i < id; i++) {
    let list = JSON.parse(localStorage.getItem(`lista ${i}`));
    for (let j = 0; j < list.length; j++) {
      let name = list[j].name;
      let checked = list[j].check;

      console.log(name);
      console.log(checked);
    }
    console.log(list);
  } */
