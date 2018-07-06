// CARD LIST
var tiles = [
  'fa-diamond',
  'fa-anchor',
  'fa-bolt',
  'fa-cube',
  'fa-paper-plane-o',
  'fa-leaf',
  'fa-bicycle',
  'fa-bomb',
];

tiles = tiles.concat(tiles);

// ARRAY FOR CARD FLIPPED AND MATCHED
let openCards = [];
let matchedCards = [];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// loops into the card list and create its HTML
let pila = document.getElementById('mazzo');

function display(tiles) {
    for(tile of tiles) {
        const lista = document.createElement('li');
        const carta = pila.appendChild(lista);
        const icona = lista.appendChild(document.createElement('i'));
        carta.classList.add('card');
        icona.classList.add('fa', tile);

        lista.addEventListener('click', function() {
            if(lista.classList.contains('open')) { }
            else {
                mosse(1);
            }
            stelle();

//pushes the flipped cards in the openCards array
        if(lista.classList.contains('open')) { }
        else if(openCards.length < 2) {
            lista.classList.add('open', 'show');
            openCards.push(this);
            classi();
           }
        });
    }
}

// compares the symbol and populate the matchedCards array
let svelate = document.getElementsByClassName('match');

function classi() {
    if(openCards.length == 2) {
        const carta1 = openCards[0].innerHTML;
        const carta2 = openCards[1].innerHTML;
        if(carta1 === carta2) {
            openCards[0].className = 'card match';
            openCards[1].className = 'card match';
            matchedCards.push(svelate);
            openCards.splice(0, 2);
            theEnd();
        } else {
            openCards[0].className = 'card wrong';
            openCards[1].className = 'card wrong';
            window.setTimeout(svuota, 750);
        }
        function svuota() {
            openCards[0].className = 'card';
            openCards[1].className = 'card';
            openCards.splice(0, 2);
        }
    }
}

// TIMER
let secondi, minuti, scorrere;
    function tempo() {
        secondi= 0;
        minuti = 0;
        scorrere = setInterval(tempo1, 1000);
        function tempo1() {
            secondi++;
            if(secondi == 60) {
                minuti++;
                secondi = 0;
            }
            document.getElementById('timer').textContent = `${secondi}  seconds and ${minuti} minutes`;
        }
    }
tempo();

// MOVES COUNTER
let inc = 0;
let mosse = function (n) {
    inc += n / 2;
    if(Number.isInteger(inc)) {
    document.getElementById('contatore').innerHTML = inc;
    }
}

// STAR RATING
let grado1 = document.getElementById('rank1');
let grado2 = document.getElementById('rank2');
let grado3 = document.getElementById('rank3');

function stelle() {
    let moves = document.getElementById('contatore').innerHTML;
    if((moves > 16) && (moves <= 24)) {
        grado3.classList.add('nascondi');
    } else if (moves > 24){
        grado2.classList.add('nascondi');
        grado3.classList.add('nascondi');
    }
}

// START/RESET BUTTON
let pulsante = document.getElementById('newGame');
let newDeck = shuffle(tiles);

// populates the game at the page loading
window.onload = display(newDeck);

pulsante.addEventListener('click', startButton);

function startButton() {
// CARDS SHUFFLE;
    pila.innerHTML = '';
    shuffle(tiles);
    display(newDeck);

// CLEAR STAR RATING
    grado2.classList.remove('nascondi');
    grado3.classList.remove('nascondi');

// CLEAR TIMER
    clearInterval(scorrere);
    tempo();

// CLEAR COUNTER
    resetCounter();
}

function resetCounter() {
    inc = 0;
    document.getElementById('contatore').innerHTML = inc;
}

// MODAL/END GAME
let messaggio = document.getElementById('vittoria');
let chiudi = document.querySelector('.close');

function theEnd() {
    if(svelate.length == 16) {
        toggleModal();
        document.getElementById('sonoro').play();
        const secIntervallo = setTimeout(clearInterval(scorrere), 100);
    }
    const starRating1 = grado1.innerHTML;
    const starRating2 = grado2.innerHTML;
    const starRating3 = grado3.innerHTML;
    const movimenti = document.getElementById('contatore').innerHTML;
    const tempistica = document.getElementById('timer').innerHTML;

    if ((grado2.classList.contains('nascondi')) && (grado3.classList.contains('nascondi'))) {
        document.getElementById('stelle').innerHTML = starRating1;
    } else if (grado3.classList.contains('nascondi')) {
        document.getElementById('stelle').innerHTML = starRating1 + starRating2;
    } else {
        document.getElementById('stelle').innerHTML = starRating1 + starRating2 + starRating3;
    }
    document.getElementById('mosse').innerHTML = movimenti;
    document.getElementById('tempo').innerHTML = tempistica;


}

// PLAY AGAIN BUTTON
let giocaAncora = document.getElementById('playAgain');
giocaAncora.addEventListener('click', function () {
    startButton();
    toggleModal();
});

// CLOSE MODAL
chiudi.addEventListener('click', toggleModal);
window.onclick = function(event) {
    if (event.target === messaggio) {
        messaggio.style.display = "none";
    }
}

function toggleModal() {
    messaggio.classList.toggle('show-modal');
}

/*
 * DONE - set up the event listener for a card. If a card is clicked:
 *  DONE - display the card's symbol (put this functionality in another function that you call from this one)
 *  DONE - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  DONE - if the list already has another card, check to see if the two cards match
 *   DONE  + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *   DONE + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *   DONE + increment the move counter and display it on the page (put this functionality in another function that you call from this one)

 *  DONE + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
