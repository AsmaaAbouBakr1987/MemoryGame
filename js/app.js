/*
 * Create a list that holds all of your cards
 */

const ListClasses = ['fa-diamond','fa-diamond', 'fa-paper-plane-o','fa-paper-plane-o',
					'fa-anchor','fa-anchor','fa-bolt','fa-bolt','fa-cube','fa-cube',
					'fa-leaf','fa-leaf','fa-bicycle','fa-bicycle','fa-bomb','fa-bomb'];



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

const ulParent = document.querySelector(".deck");

shuffle(ListClasses).forEach(function(item) {
  	let listElem = document.createElement("li");
  	listElem.classList.add("card");
    let htmlTextToAdd = `<i class="fa ${item}"></i>`
    listElem.insertAdjacentHTML('afterbegin', htmlTextToAdd);

    ulParent.appendChild(listElem);
});


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


let chosenLi = document.getElementsByClassName("card");
let openCard = [];
let indexIDS = [];
let indexMatched = [];


for(let i = 0;i<chosenLi.length;i++){
    chosenLi[i].addEventListener("click", function showSympol(){
        console.log('openCards:', openCard);
        console.log('IDs:', indexIDS);

    	if (!indexIDS.includes(i) && !indexMatched.includes(i)){
    		console.log('NOT IN ARRAY');
    		let cName = chosenLi[i].querySelector("i").className;
            let currentEl = chosenLi[i];


            if (indexIDS.length < 2){
        		
        		chosenLi[i].classList.add('open', 'show');
                openCard.push({cn:cName, id:i});
                indexIDS.push(i);
                console.log(openCard);
        		console.log('LESS THAN 3');

        		//Matching
        		if( (indexIDS.length === 2) && (openCard[0].cn === openCard[1].cn) ){
        			openCard.forEach( function (e){
	                	// console.log(e)
	                   chosenLi[e.id].classList.remove('open', 'show'); 
	                   chosenLi[e.id].classList.add('match');
	                   indexMatched.push(i);
	                   openCard = [];
	                   indexIDS = [];
                	});
        		}

            } else {
            	console.log(indexIDS.length);
            	console.log('Greater THAN 3');
            	indexIDS.forEach( function (e){
                	// console.log(e)
                   chosenLi[e].classList.remove('open', 'show'); 
                   openCard = [];
                   indexIDS = [];
                });
            }


    	} else {
    		console.log('IN ARRAY');
    	}
	});
}
