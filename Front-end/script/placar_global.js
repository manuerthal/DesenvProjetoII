let addRows = (tbodyID, content) => {
    let tbody = document.getElementById(tbodyID);
    for (let answer of content) {
        let newRow = tbody.insertRow();
        let newCell = newRow.insertCell();
        let newCellContent = document.createTextNode(answer.person_name);
        newCell.appendChild(newCellContent);
        newCell = newRow.insertCell();
        newCellContent = document.createTextNode(answer.streak);
        newCell.appendChild(newCellContent);
        newCell = newRow.insertCell();
        newCellContent = document.createTextNode(answer.wins);
        newCell.appendChild(newCellContent);
        newCell = newRow.insertCell();
        newCellContent = document.createTextNode(answer.attempts - answer.wins);
        newCell.appendChild(newCellContent);
    }
}

let sortingType = localStorage.getItem("sortingType");
if (sortingType == null || sortingType.trim() == "") {
    localStorage.setItem("sortingType", "streak");
}
sortingType = localStorage.getItem("sortingType").trim();

(async () => {
    let response = await fetch("/answer/get_all");
    let content = await response.json();
    content.sort((a, b) => {
        return b[sortingType] - a[sortingType];
    })
    addRows("corpoTabelaRanking", content);
})();
