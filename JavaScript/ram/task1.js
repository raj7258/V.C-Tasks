let formDiv = document.getElementById("form");
function onAdd(event) {
  event.preventDefault();
  let tag, number, position;
  tag = document.getElementById("tags").value;
  number = document.getElementById("number").value;
  position = document.getElementById("position").value;
  if (tag === "email" || tag === "file" || tag === "date" || tag === "number") {
    addEmail(tag, number, position);
  } else if (tag === "text") {
    addText(tag, number, position);
  } else if (tag === "checkbox") {
    addCheckbox(tag, number, position);
  } else if (tag === "radio") {
    addRadiobutton(tag, number, position);
  }
}

function addEmail(type, number, position) {
  let div = document.createElement("div");
  for (i = 1; i <= number; i++) {
    let label = document.createElement("label");
    let input = document.createElement("input");
    let br = document.createElement("br");
    label.innerHTML = type;
    label.contentEditable = true;
    input.type = type;
    div.appendChild(label);
    div.appendChild(input);
    div.appendChild(br);
    formDiv.insertBefore(div, formDiv.children[position - 1]);
  }
}
function addText(type, number, position) {
  let div = document.createElement("div");
  for (i = 1; i <= number; i++) {
    let label = document.createElement("label");
    let input = document.createElement("input");
    let br = document.createElement("br");
    label.innerHTML = "Add Label";
    label.contentEditable = true;
    input.type = type;
    div.appendChild(label);
    div.appendChild(input);
    div.appendChild(br);
    formDiv.insertBefore(div, formDiv.children[position - 1]);
  }
}

function addCheckbox(type, number, position) {
  let div1 = document.createElement("div");
  for (let i = 0; i < number; i++) {
    let div = document.createElement("div");
    let p = document.createElement("span");
    div.style.border = "1px solid black";
    div.style.width = "20%";
    p.textContent = "Cars:";
    p.contentEditable = true;
    div.appendChild(p);
    let br = document.createElement("br");
    div.appendChild(br);
    let label = document.createElement("label");
    label.contentEditable = true;
    label.textContent = "label name";
    let userInput = document.createElement("input");
    userInput.type = "checkbox";

    div.appendChild(label);
    div.appendChild(userInput);

    div.innerHTML += `<button type="button" class="btn button" onclick="addAnotherCheckbox(this)"> Add Another</button>`;
    div1.append(div);
    formDiv.insertBefore(div1, formDiv.children[position - 1]);
  }
}

function addAnotherCheckbox(that) {
  let addElement = that.parentElement;
  addElement.innerHTML += `<br><label for="Checkbox" contenteditable="true">label name </label><input type="checkbox" name="checkbox">`;
}

function addRadiobutton(type, number, position) {
  let div1 = document.createElement("div");
  for (let i = 0; i < number; i++) {
    let div = document.createElement("div");
    let p = document.createElement("span");
    div.style.border = "1px solid black";
    div.style.width = "20%";
    p.textContent = "Adult";
    p.contentEditable = true;
    div.appendChild(p);
    let br = document.createElement("br");
    div.appendChild(br);
    let label = document.createElement("label");
    label.contentEditable = true;
    label.textContent = "label name";

    let userInput = document.createElement("input");
    userInput.type = type;
    userInput.name = "radio-button";

    div.appendChild(label);
    div.appendChild(userInput);

    div.innerHTML += `<button type="button" class="btn button" onclick="addAnotherRadiobutton(this)">Add Another</button>`;
    div1.append(div);
    formDiv.insertBefore(div1, formDiv.children[position - 1]);
  }
}

function addAnotherRadiobutton(that) {
  let addElement = that.parentElement;
  addElement.innerHTML += `<br><label for="Radio" contenteditable="true">label name </label><input type="radio" name="radio-button">`;
}

function onFormSubmit(e) {
  e.preventDefault();
  console.log(document.getElementById("form").getElementsByTagName("div"));
  // localStorage.setItem("data", formDiv.innerHTML);
  // window.open("file:///D:/V.C-Tasks/JavaScript/ram/form.html");
}
