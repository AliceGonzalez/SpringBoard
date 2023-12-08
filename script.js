const gameContainer = document.getElementById("game"); //APPLY CODE TO THE GAME CONTAINER SECTION
let noClick = false;
let flippedCards = 0;
let cardOne = null;
let cardTwo = null;
const COLORS = [ //CREATE ARRAY OF COLORS
  "red","blue","green","orange","purple","red","blue","green","orange","purple"
];

function shuffle(array) { //FUNCTION TO SHUFFLE ARRAY
  let counter = array.length;

  while (counter > 0) {// While there are elements in the array
    let index = Math.floor(Math.random() * counter);// Pick a random index
    counter--;// Decrease counter by 1


    let temp = array[counter];// And swap the last element with it
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}
//THEN
let shuffledColors = shuffle(COLORS); //CREATE VARIABLE WITH COLORS ALREADY SHUFFLED


function createDivsForColors(colorArray) { //CREATE FUNCTION THAT ITERATE SUFFLED COLORS
  for (let color of colorArray) { //FOR EACH LOOP DUE TO BEING AN ARRAY
    const newDiv = document.createElement("div");//CREATE VARIABLE THAT CREATES NEW DIV
    newDiv.classList.add(color);//ADD A CLASS FOR THE VALUE WE ARE SEARCHING
    newDiv.addEventListener("click", handleCardClick);//IF DIV IS CLICKED, CALL FUNCTION
    gameContainer.append(newDiv);//APPEND DIV TO ELEMENT ID OF GAME
  }
}

// ****TODO COMPLETE THIS CODE BELOW****//
function handleCardClick(e) {
  if(noClick || e.target.classList.contains("flipped")) {
    return;
  }
  if(e.target.classList.contains("flipped")) return;

  let currentCard = e.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!cardOne || !cardTwo) {//WHEN YOU FLIP 2 CARDS
   currentCard.classList.add("flipped");//ADD CLASS "FLIPPED" TO CLICKED CARD

   if(!cardOne){
    cardOne = currentCard;
   } else {
    cardTwo = currentCard;
   }
  } 

  if (cardOne && cardTwo) { // IF CARD ONE AND CARD TWO
    noClick = true; ///ARE NOT CLICKED

    let cOne = cardOne.className; //CARD ONE CLASS
    let cTwo = cardTwo.className; //CARD TWO CLASS

    if (cOne === cTwo) { //IF BOTH ARE THE SAME
      flippedCards += 2; //FLIP BOTH CARDS (can choose any variable)
      cardOne.removeEventListener('click', handleCardClick); //REMOVE CLICK EVENT ON THIS CARD
      cardTwo.removeEventListener('click', handleCardClick);//REMOVE CLICK EVENT ON THIS CARD
      cardOne = cardTwo = null;
      noClick = false;
    } else {
      setTimeout (function () {
        cardOne.style.backgroundColor = "";
        cardTwo.style.backgroundColor = "";
       [cardOne, cardTwo].forEach(card => card.classList.remove("flipped"));
        cardOne = cardTwo =null;
        noClick = false;
      }, 1000);
    }
  }
  if (flippedCards === COLORS.length) alert("GAME OVER!"); //WHEN ALL CARDS ARE FLIPPED SHOW GAME OVER!
}
 
createDivsForColors(shuffledColors); //WHEN DOME LOADS CREATE THE CARDS WITH SUFFLED COLORS


