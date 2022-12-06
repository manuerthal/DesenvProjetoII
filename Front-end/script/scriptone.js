
//Emanoela Rodrigues Erthal
const tiles = document.querySelector(".tile-container");
const backspaceAndEnterRow = document.querySelector("#backspaceAndEnterRow");
const keyboardFirstRow = document.querySelector("#keyboardFirstRow");
const keyboardSecondRow = document.querySelector("#keyboardSecondRow");
const keyboardThirdRow = document.querySelector("#keyboardThirdRow");

var dicionario;

const keysFirstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const keysSecondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const keysThirdRow = ["Z", "X", "C", "V", "B", "N", "M"];

const rows = 6; //Formato dinamico que permite mudar a quantidade de fileiras e colunas posteriormente.
const columns = 6;

let currentRow = 0;
let currentColumn = 0; 
let palavraMap = [];
var palavra;

const guesses = []; //Armazena as tentativas já feitas para serem exibidas na tela.

function __init__() {
  startGame();
  main();
}

__init__();

async function setDic() {
  await fetch("./seis.txt")
    .then((response) => response.text())
    .then((text) => {
      dicionario = text.split("\n");
    });
} //Cria a variável dicionário com base no arquivo cinco.txt

function gameWin(){
  window.alert("Parabéns! Você acertou a palavra.");
  (async () => {
      const response = await fetch('/answer/increase_streak', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: 'name='+localStorage.getItem("name")
      })
  })();
  window.location.reload();
}

function gameLost(){
  (async () => {
    const response = await fetch('/answer/end_streak', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: 'name='+localStorage.getItem("name")
      })
  })();
  window.alert("Game Over! Suas tentativas acabaram, recarregue a página para iniciar um novo jogo.");
  window.location.reload();
}

function startGame() {
  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    //Cria a parte principal do jogo baseado nas constantes fileiras e colunas.
    guesses[rowIndex] = new Array(columns);
    const tileRow = document.createElement("div");
    tileRow.setAttribute("id", "row" + rowIndex);
    tileRow.setAttribute("class", "tile-row");
    for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
      const tileColumn = document.createElement("div");
      tileColumn.setAttribute("id", "row" + rowIndex + "column" + columnIndex);
      tileColumn.setAttribute(
        "class",
        rowIndex === 0 ? "tile-column typing" : "tile-column disabled"
      );
      tileRow.append(tileColumn);
      guesses[rowIndex][columnIndex] = "";
    }
    tiles.append(tileRow);
  }
}

// Função que executa o programa após do dicionário ter carregado
async function main() {
  await setDic();
  palavra =
    dicionario[Math.floor(Math.random() * dicionario.length)].toUpperCase();

  console.log(palavra);

  // Define o status da palavra. [ Green, Yellow or Red ]
  for (let index = 0; index < palavra.length; index++) {
    const LETTER = palavra[index];
    palavraMap.push({ letter: LETTER, index: index });
  }
}

function moveToNextRow() {
  //Após uma tentativa ser efetuada, é movido para a próxima fileira para que inicie-se uma nova tentativa
  let typingColumns = document.querySelectorAll(".typing");
  for (let index = 0; index < typingColumns.length; index++) {
    typingColumns[index].classList.remove("typing");
    typingColumns[index].classList.add("disabled");
  }
  currentRow++;
  currentColumn = 0;

  const currentRowEl = document.querySelector("#row" + currentRow);
  let currentColumns = currentRowEl.querySelectorAll(".tile-column");
  for (let index = 0; index < currentColumns.length; index++) {
    currentColumns[index].classList.remove("disabled");
    currentColumns[index].classList.add("typing");
  }
}

/*  QUANDO O TECLADO É ACIONADO  */
document.onkeydown = function (evt) {
  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const KEY = evt.key.toUpperCase();

  if (KEY === "ENTER") {
    checkGuess();
  } else if (KEY === "BACKSPACE") {
    handleBackspace();
  } else {
    LETTERS.includes(KEY) && handleKeyboardOnClick(KEY);
  }
};

async function checkGuess() {
  const guess = guesses[currentRow].join("");

  if (guess.length === columns) {
    if (dicionario.includes(guess + "\r")) {
      var guessObject = [];
      for (let index in guess) {
        const LETTER = guess[index];
        guessObject.push({ letter: LETTER, index: index });
      }
  
      var currentColumns = document.querySelectorAll(".typing");
      for (let index = 0; index < columns; index++) {
        if (palavraMap[index].letter !== guessObject[index].letter) {
          currentColumns[index].classList.add("wrong"); //Adiciona a classe "errado" se a letra não estiver na palavra.
        }
        if (palavraMap[index].letter === guessObject[index].letter) {
          currentColumns[index].classList.add("right"); //Adiciona a classe "certo" se a letra estiver na palavra.
        } else {
          if (palavra.includes(guess[index])) {
            currentColumns[index].classList.add("displaced"); //Adiciona a classe "deslocado" se a letra estiver na palavra, mas em outro lugar.
          }
        }
      }
      
      
      if (guess+"\r" === palavra) {
        gameWin();
      }
      if (currentRow === rows - 1) {
        //Mostra a mensagem que você perdeu o jogo após atingir todas as tentativas disponíveis.
        gameLost();
      } else {
        moveToNextRow();
      }
   
    } 
    else{
      var span = document.getElementById("erro")
  
      if( span.style.display === "none"){
        span.style.display = "flex"
        span.innerText = "Palavra não encontrada no sistema"

        setTimeout(() => {
        span.style.display = "none"
        }, 2000);
      } 
     
    }
  }

  
}
function handleBackspace() {
  if (currentColumn != 0) {
    currentColumn--;
    guesses[currentRow][currentColumn] = "";
    const tile = document.querySelector(
      "#row" + currentRow + "column" + currentColumn
    );
    tile.textContent = "";
  }
}

function handleKeyboardOnClick(key) {
  //Funcionamento do teclado quando for utilizado
  if (currentColumn != columns) {
    const currentTile = document.querySelector(
      "#row" + currentRow + "column" + currentColumn
    );
    currentTile.textContent = key;
    guesses[currentRow][currentColumn] = key;
    currentColumn++;
  }
}

/*  _HTML_ELEMENTS  */
const createKeyboardRow = (keys, keyboardRow) => {
  //Função que cria a fileira do teclado dada as informações de qual fileira é e qual tecladas será armazenada.
  keys.forEach((key) => {
    var buttonElement = document.createElement("button");
    buttonElement.textContent = key;
    buttonElement.setAttribute("id", key);
    buttonElement.addEventListener("click", () => handleKeyboardOnClick(key));
    keyboardRow.append(buttonElement);
  });
};

createKeyboardRow(keysFirstRow, keyboardFirstRow); //Executa a função de criar o teclado para cada fileira.
createKeyboardRow(keysSecondRow, keyboardSecondRow);
createKeyboardRow(keysThirdRow, keyboardThirdRow);

const backspaceButton = document.createElement("button"); //Funcionamento do botão de delete
backspaceButton.addEventListener("click", handleBackspace);
backspaceButton.textContent = "DELETE";
backspaceAndEnterRow.append(backspaceButton);

const enterButton = document.createElement("button"); //Funcionamento do botão de enter
enterButton.addEventListener("click", checkGuess);
enterButton.textContent = "ENTER";
backspaceAndEnterRow.append(enterButton);