let addRows = (tbodyID, content) => {
    let tbody = document.getElementById(tbodyID);
    for (let answer of content) {
        let newRow = tbody.insertRow();
        for (let key in answer) {
            if (key === 'id') continue;
            let newCell = newRow.insertCell();
            let newCellContent = document.createTextNode(answer[key]);
            newCell.appendChild(newCellContent);
        }
    }
}

(async () => {
    let response = await fetch("/answer/get_all");
    let content = await response.json();
    addRows("corpoTabelaRanking", content);
})();
