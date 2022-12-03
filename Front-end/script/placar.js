(async () => {
    const response = await fetch('/answer/get?name='+localStorage.getItem('name'));
    const content = await response.json();

    let winsElem = document.getElementById("wins");
    let streakElem = document.getElementById("streak");
    let lostElem = document.getElementById("lost");

    winsElem.textContent = content["wins"]
    streakElem.textContent = content["streak"]
    lostElem.textContent = content["attempts"] - content["wins"]
})();