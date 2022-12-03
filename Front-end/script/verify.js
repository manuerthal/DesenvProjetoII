let nameVal = localStorage.getItem("name");
if (nameVal === null) {
    nameVal = prompt("Qual é seu nome?");
    localStorage.setItem("name", nameVal);
}