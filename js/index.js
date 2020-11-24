(function () {
  const container = document.querySelector("#monster-container");
  const monstrForm = document.querySelector("#create-monster");
  const back = document.querySelector("#back");
  const forward = document.querySelector("#forward");
  let page = 1;

  document.addEventListener("DOMContentLoaded", () => {
    getMonsters();
    back.addEventListener("click", navButtonClick);
    forward.addEventListener("click", navButtonClick);
  });
  function navButtonClick(e) {
    if (e.target.id === "back") {
      page--;
    } else if (e.target.id === "forward") {
      page++;
    }
    removeAllChildNodes(container);
    getMonsters();
  }
  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
  function getMonsters() {
    return fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
      .then((response) => response.json())
      .then((monstersData) => {
        return displayData(monstersData);
      });
  }
  function displayData(monster) {
    let ul = document.createElement("ul");
    container.appendChild(ul);
    for (let m of monster) {
      let name = m.name;
      let age = m.age;
      let des = m.description;
      let li = document.createElement("li");
      li.append(name, " ", age, " ", des);
      ul.appendChild(li);
    }
  }
  function setUpForm() {
    const form = document.createElement("form");

    form.addEventListener("submit", handleFormSubmit);
    form.innerHTML = `Name: <input type="text" name="name"> 
    Age: <input type="text" name="age"> Description: <input type="text" name="description">
    <input type="submit">`;
    monstrForm.appendChild(form);
    return form;
  }
  function handleFormSubmit(e) {
    e.preventDefault();
    let inputs = form.querySelectorAll("input[type=text]");
    const data = {};
    for (let input of inputs) {
      data[input.name] = input.value;
    }
    createMonster(data);
  }
  const form = setUpForm();

  function createMonster(body) {
    return fetch("http://localhost:3000/monsters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((newMonster) => {
        displayData(newMonster);
      });
  }
})();
