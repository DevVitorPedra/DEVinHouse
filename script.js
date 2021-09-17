/**DEV To-do List
 * Primeiro projeto de participação do DEVinHouse
 * feito durante a quarta semana do curso
 * objetivo era criar um To-to list simples adicionando item e salvando a lista
 * com os item que foram feitos
 * Devido a ao tempo de conclusão do projeto decidi incluir algumas funcionalidade
 * Listas separadas,botão delete para cada lista
 * */
//1.. Manipulação de item do DOM
const splash = document.getElementById("splash");
const itens = document.getElementById("items");
const sideList = document.getElementById("lista");
const formInput = document.querySelector("#form-input");
let inputTask = document.getElementById("task");
const adicionados = document.querySelector("#adicionados");
const checkbox = document.getElementsByClassName("checkboxes");
const btnSalvar = document.getElementById("btn-salvar");
//2..Arrays e objetos para listas de itens
let itemArray = [];
let itemObj = {};
let listasSalvas = [];
//Id para adicionar itens com chaves difererentes a partir do 1
let id = localStorage.length + 1;
//3.. Função para criação dos itens na lista
// Evento ativado pelo botão "inserir tarefa"
const createListItem = (item) => {
  let itemDiv = document.createElement("div");
  let itemCheckbox = document.createElement("input");
  //Classe para receber poder controlar todos os checkbox
  itemCheckbox.classList.add("checkboxes");
  itemCheckbox.setAttribute("type", "checkbox");
  //Adiciona o name para resgatar o valor na função que lê o localStorage
  itemCheckbox.setAttribute("name", item);
  itemCheckbox.setAttribute("id", `${item}${id}`);
  let itemLi = document.createElement("label");
  //Adiciona classe que quando ativada o check box ela risca o texto
  itemLi.classList.add("line-through");
  itemLi.setAttribute("for", `${item}${id}`);
  let itemLiNode = document.createTextNode(item);
  itemLi.appendChild(itemLiNode);
  //Span como botão de delete para os itens dentro da lista
  let itemSpan = document.createElement("span");
  //Icone de lixeira do bootstrap
  itemSpan.innerHTML = '<i class="bi bi-trash"></i>';
  //Classe para estilo
  itemSpan.classList.add("delete");
  //Chama função delete pra cada item
  itemSpan.setAttribute("onclick", "deleteItem(this)");
  itemDiv.appendChild(itemCheckbox);
  itemDiv.appendChild(itemLi);
  itemDiv.appendChild(itemSpan);
  itemDiv.setAttribute("name", item);

  adicionados.appendChild(itemDiv);
};
//4.. Formulario para inserção de itens
formInput.addEventListener("submit", (event) => {
  //previne o carregamento da página
  event.preventDefault();
  //regata o valor do input
  inputTask = document.getElementById("task").value;
  //verifica se existe um valor e retira caso só tenha espaços
  if (inputTask && inputTask.trim()) {
    //chama a função que cria o item
    createListItem(inputTask);
  } else {
    alert("A caixa não pode estar vazia!!");
  }
});

//5.. Função para salvar a lista no localStorage
const salvarLista = () => {
  //Loop entre os itens na lista
  for (let i = 0; i < checkbox.length; i++) {
    //Verifica o status do checkbox
    let itemChecked = checkbox[i].checked;
    //Recupera o nome
    let itemName = checkbox[i].name;
    //Insere as informações em um objeto
    itemObj.name = itemName;
    itemObj.check = itemChecked;
    //Insere o objeto na array
    itemArray.push(itemObj);
    //Reinicia o objeto
    itemObj = {};
  }
  // Verifica se exitem valores a serem salvos
  if (itemArray != "") {
    //Função que salva no localStorage
    toStorage();
    //como salvou reinicia para não duplicar itens
    itemArray = [];
  } else {
    // Emite um alerta que não existe nada a ser salvo
    alert("lista vazia");
  }
};
// Adiciona o eventListener ao botão "Salvar"
btnSalvar.addEventListener("click", salvarLista);
//6.. Função que salva os itens no localStorage
const toStorage = () => {
  id = localStorage.length + 1;
  //Cria um id único para cada item no localStorage
  localStorage.setItem(`lista ${id}`, JSON.stringify(itemArray));
  //Reseta a lista de itens
  adicionados.innerHTML = "";
  //Reseta a lista de listas salvas na lateral direita
  sideList.innerHTML = "";
  //Carrega uma nova lista do localStorage
  fromStorage();
};
//7.. Função que deleta itens da lista baseada na posição do botão
const deleteItem = (ele) => {
  let del = ele.parentElement.getAttribute("name");
  //Remove a div com os elementos selecionados
  ele.parentElement.remove();
};
//8.. Função para deletar itens do localStorage
const deleteFromStorage = (ele) => {
  //seleciona o irmão que possui o nome da lista
  let listPosition = ele.previousSibling.innerHTML;
  //usa o nome do irmão para deletar a lista no localStorage
  localStorage.removeItem(listPosition);
  //reseta a lista
  sideList.innerHTML = "";
  //chama a função que mantém os nomes em ordem
  resetStorage();
};
//9.. Função que resgata as listas salvas do localStorage
const fromStorage = () => {
  //Resgata as chaves do localStorage
  let storageKeys = [];
  for (let j = 0; j < localStorage.length; j++) {
    storageKeys.push(localStorage.key(j));
  }
  //Organiza as chaves em ordem alfabética
  storageKeys.sort();
  //Loop para criar elementos html no sidelist a direita da página
  for (let i = 0; i < localStorage.length; i++) {
    let key = storageKeys[i];
    let newItem = document.createElement("div");
    let newItemName = document.createTextNode(key);
    let itemDelete = document.createElement("button");
    //Adiciona a função de deletar do localStorage
    itemDelete.setAttribute("onclick", "deleteFromStorage(this)");
    //Icone de lixeira do bootstrap
    itemDelete.innerHTML = '<i class="bi bi-trash"></i>';
    itemDelete.classList.add("delete-storage");
    newItem.appendChild(newItemName);
    // Função para carregar os itens da lista salva na tela
    newItem.setAttribute("onclick", "populateSideList(this)");
    newItem.classList.add("card");
    sideList.appendChild(newItem);
    sideList.appendChild(itemDelete);
  }
};
// Chama a função no carregamento da página
fromStorage();
//10..Função para carregar os itens da lista salva na tela
const populateSideList = (ele) => {
  //Reseta a lista para não duplicar os itens
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
    //Após criar todos os elementos adiciona à tela
    adicionados.appendChild(itemDiv);
  });
};

//11.. Função para resetar as chaves do localStorage, para não haver conflitos de chave
const resetStorage = () => {
  //Resgata todo o localStorage dentro de uma array
  let storageArray = [];
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let refresh = JSON.parse(localStorage.getItem(key));
    storageArray.push(refresh);
  }
  //Limpa o localStorage para inserir os mesmos itens, porém, com chaves sequenciais
  localStorage.clear();
  for (let j = 0; j < storageArray.length; j++) {
    localStorage.setItem(`lista ${j + 1}`, JSON.stringify(storageArray[j]));
  }
  //Chama novamente a função para popular a sideList
  fromStorage();
};