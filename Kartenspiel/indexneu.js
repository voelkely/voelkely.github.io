// jeder Spieler startet das Spiel mit 3 zufälligen Karten
let initialNumberOfCards = 3;
let hiddenCardSrc = 'img/cards/green_back.png';
// null repräsentiert voerst nichts. Wird ein neues Spiel gestartet wird der Variable ein neues Objetc zugewiesen.
let currentGame = null;
// =============== Wiedergabe ==================
// function die ein volles Deck an Karten auf der rechten Seite darstellt 
function renderDeck(deck, hideCards) {
    let deckElement = document.getElementById("card-deck");
    renderCards(deck, deckElement, hideCards);
}
;
// function: die "hand" des jeweiligen Spielers 
function renderPlayerHand(player) {
    let container = null;
    if (player.cpu) {
        container = document.getElementById('computer-player-hand');
    }
    else {
        container = document.getElementById('human-player-hand');
    }
    ;
    // Karten sichtbar ja oder nein?
    renderCards(player.hand, container, player.cpu);
}
;
// Karte wird vom Deck in die Mitte des Tisches gelegt
function renderCurrentCard(card) {
    let currentCardElement = document.getElementById("current-card");
    renderCards([card], currentCardElement, false);
}
// function erstellt html elemente für jede Karte 
function renderCards(cards, container, hideCards) {
    // zu beginn ein leerer parent container
    container.innerHTML = '';
    cards.forEach(function (card) {
        let cardElement;
        if (hideCards) {
            cardElement = createCardElement(hiddenCardSrc);
        }
        else {
            cardElement = createCardElement(card.image, card.id, true);
        }
        ;
        container.appendChild(cardElement);
    });
}
function createCardElement(imageSrc, cardId = null, selectable = false) {
    let cardElement = document.createElement("span");
    cardElement.classList.add("card");
    if (selectable) {
        cardElement.classList.add("selectable");
        cardElement.dataset.cardId = cardId.toString();
        cardElement.addEventListener('click', function () {
            // event handler weiss welche Karte ausgesucht wurde 
            userPlayCard(parseInt(this.dataset.cardId));
        }, false);
    }
    let cardImageElement = document.createElement("img");
    cardImageElement.setAttribute("src", imageSrc);
    cardImageElement.setAttribute("alt", "card");
    cardElement.appendChild(cardImageElement);
    return cardElement;
}
// ================= Spiel ==================
function startNewGame() {
    let game = createNewGame();
    currentGame = game;
    // zu beginn zieht jeder Spieler 3 karten
    let i;
    for (i = 1; i <= initialNumberOfCards; i++) {
        game.player1.hand.push(drawRandomCard(game.deck));
        game.player2.hand.push(drawRandomCard(game.deck));
    }
    // Karten vom Computer (versteckt)
    renderPlayerHand(game.player1);
    // Meine Karten (sichtbar)
    renderPlayerHand(game.player2);
    // Erste Karte auf dem Tisch, startet das Spiel
    let initialCard = drawRandomCard(game.deck);
    // Spiel soll wissen welche Karte auf dem Tisch liegt
    game.currentPlay.push(initialCard);
    // update display
    renderCurrentCard(initialCard);
    // Karte wird durch kilcken gezogen
    document.getElementById('draw-card').addEventListener('click', userDrawCard, false);
    // Das Deck verändert sich da eine neue Karte gezogen /geworfen wurde
    renderDeck(game.deck, true);
    // Spieler 2 (ich) beginnt zuerst
    setCurrentPlayer(game, game.player2);
}
// 2 sachen:
// * der name des spielers blinkt
// * speichert die info welcher Spieler grade dran ist
function setCurrentPlayer(game, player) {
    let cpuPlayerHeadingElement = document.getElementById("cpu-player-heading");
    let humanPlayerHeadingElement = document.getElementById("human-player-heading");
    game.currentPlayer = player;
    if (player.cpu) {
        cpuPlayerHeadingElement.classList.add('blinking');
        humanPlayerHeadingElement.classList.remove('blinking');
    }
    else {
        cpuPlayerHeadingElement.classList.remove('blinking');
        humanPlayerHeadingElement.classList.add('blinking');
    }
}
// function eine zufällige Karte wird vom Deck gezogen
function drawRandomCard(deck) {
    let randomIndex = Math.floor((Math.random() * deck.length));
    let card = deck.splice(randomIndex, 1)[0];
    return card;
}
// Spiel wird repräsentiert. Infos über:
// 1. Die Spieler
// 2. Karten Deck welches genutzt wird
// 3. Karten die grade auf dem Tisch liegen
// 4. wer grade dran ist
function createNewGame() {
    let game = {
        player1: createPlayer({ cpu: true, name: 'Player 1 - Computer' }),
        player2: createPlayer({ cpu: false, name: 'Player 2 - Human' }),
        deck: createNewDeck(),
        currentPlay: [],
        currentPlayer: null
    };
    return game;
}
// Spieler hat 3 Eigenschaften:
// * Karten die ich besitze
// * ob es der Computer oder der Spieler ist
// * der Name
function createPlayer(options) {
    let player = {
        hand: [],
        cpu: options.cpu,
        name: options.name
    };
    return player;
}
// wenn der Sieler eine Karte spielt
function userDrawCard() {
    if (currentGame.currentPlayer != currentGame.player2) {
        alert("It's computer's turn!");
        return;
    }
    ;
    // ein Spielzug
    draw(currentGame.player2);
    // nun ist der Computer dran
    setCurrentPlayer(currentGame, currentGame.player1);
    // dem Computer erlauben einen Spielzug durchzuführen
    computerPlayCard();
}
// wenn der Spieler eine Karte spielt
function userPlayCard(cardId) {
    // checken, wer dran ist
    if (currentGame.currentPlayer != currentGame.player2) {
        alert("It's computer's turn!");
        return;
    }
    ;
    // Karten welcher der Speiler benutzt
    let cardIndex = currentGame.player2.hand.findIndex(function (card) {
        return (card.id == cardId);
    });
    let card = currentGame.player2.hand.splice(cardIndex, 1)[0];
    // checken, ob der Zug möglich ist 
    if (!isValidMove(card)) {
        // wenn nicht wird die vorherige Karte wieder sichtbar
        currentGame.player2.hand.push(card);
        alert('Invalid move!');
    }
    else {
        // spiel die karte
        makeMove(card, currentGame.player2);
        // jetzt ist wieder PC dran
        setCurrentPlayer(currentGame, currentGame.player1);
        // PC darf einen Spielzug durchführen
        computerPlayCard();
    }
}
// Logik des Computers
function computerPlayCard() {
    let player = currentGame.player1;
    // die erste Karte finden, welche der Computer spielen kann
    let cardIndex = player.hand.findIndex(isValidMove);
    // falls es keine gibt, muss der Computer eine karte ziehen
    if (cardIndex == -1) {
        draw(player);
    }
    else {
        let card = player.hand.splice(cardIndex, 1)[0];
        makeMove(card, player);
    }
    ;
    // computer ist fertig, nun ist der Spieler dran
    setCurrentPlayer(currentGame, currentGame.player2);
}
// beiden ist es erlaubt eine Karte vom Stapel zu ziehen
function draw(player) {
    let deck = currentGame.deck;
    // falls die Karten rechts ausgehen, wird die oberste Karte behalten udn der rest wird zum neuen Deck 
    if (deck.length === 0) {
        let cards = currentGame.currentPlay.splice(0, currentGame.currentPlay.length - 1);
        cards.forEach(function (card) { deck.push(card); });
        renderDeck(deck, true);
    }
    player.hand.push(drawRandomCard(deck));
    // neue wiedergabe
    renderPlayerHand(player);
    renderDeck(deck, true);
}
// ist der Spielzug möglich? 
function isValidMove(card) {
    let currentCard = currentGame.currentPlay[currentGame.currentPlay.length - 1];
    return ((currentCard.rank == card.rank) || (currentCard.suit == card.suit));
}
// wenn der Spieler dran ist müssen diese dinge passieren:
function makeMove(card, player) {
    // Das Spiel muss die neue Karte speichern die nun auf dem Tisch liegt 
    currentGame.currentPlay.push(card);
    // update
    renderCurrentCard(card);
    // das Deck des Spielers aktualisieren, da er ja karten los wird oder neue dazukommen
    renderPlayerHand(player);
    // hat der Sieler keine Karten mehr, hat er das Spiel gewonnen
    if (player.hand.length == 0) {
        winTheGame(player);
    }
}
// Ein Alert tritt auf
function winTheGame(player) {
    console.log(player.name + ' Du hast gewonnen!');
    startNewGame();
}
// Nues Spiel starten
window.onload = function () {
    document.getElementById("neues Spiel").addEventListener('click', startNewGame, false);
    renderDeck(createNewDeck(), true);
};
// ============= Deck =============
// Function erstellt eine Liste der verwendeten Karten
function createNewDeck() {
    let deck = [
        {
            id: 1,
            rank: 'Two',
            suit: 'hearts',
            image: 'img/cards/2H.png'
        },
        {
            id: 2,
            rank: 'Three',
            suit: 'hearts',
            image: 'img/cards/3H.png'
        },
        {
            id: 3,
            rank: 'Four',
            suit: 'hearts',
            image: 'img/cards/4H.png'
        },
        {
            id: 4,
            rank: 'Five',
            suit: 'hearts',
            image: 'img/cards/5H.png'
        },
        {
            id: 5,
            rank: 'Six',
            suit: 'hearts',
            image: 'img/cards/6H.png'
        },
        {
            id: 6,
            rank: 'Seven',
            suit: 'hearts',
            image: 'img/cards/7H.png'
        },
        {
            id: 7,
            rank: 'Eight',
            suit: 'hearts',
            image: 'img/cards/8H.png'
        },
        {
            id: 8,
            rank: 'Nine',
            suit: 'hearts',
            image: 'img/cards/9H.png'
        },
        {
            id: 9,
            rank: 'Ten',
            suit: 'hearts',
            image: 'img/cards/10H.png'
        },
        {
            id: 10,
            rank: 'Jack',
            suit: 'hearts',
            image: 'img/cards/JH.png'
        },
        {
            id: 11,
            rank: 'Queen',
            suit: 'hearts',
            image: 'img/cards/QH.png'
        },
        {
            id: 12,
            rank: 'King',
            suit: 'hearts',
            image: 'img/cards/KH.png'
        },
        {
            id: 13,
            rank: 'Ace',
            suit: 'hearts',
            image: 'img/cards/AH.png'
        },
        {
            id: 14,
            rank: 'Two',
            suit: 'diamonds',
            image: 'img/cards/2D.png'
        },
        {
            id: 15,
            rank: 'Three',
            suit: 'diamonds',
            image: 'img/cards/3D.png'
        },
        {
            id: 16,
            rank: 'Four',
            suit: 'diamonds',
            image: 'img/cards/4D.png'
        },
        {
            id: 17,
            rank: 'Five',
            suit: 'diamonds',
            image: 'img/cards/5D.png'
        },
        {
            id: 18,
            rank: 'Six',
            suit: 'diamonds',
            image: 'img/cards/6D.png'
        },
        {
            id: 19,
            rank: 'Seven',
            suit: 'diamonds',
            image: 'img/cards/7D.png'
        },
        {
            id: 20,
            rank: 'Eight',
            suit: 'diamonds',
            image: 'img/cards/8D.png'
        },
        {
            id: 21,
            rank: 'Nine',
            suit: 'diamonds',
            image: 'img/cards/9D.png'
        },
        {
            id: 22,
            rank: 'Ten',
            suit: 'diamonds',
            image: 'img/cards/10D.png'
        },
        {
            id: 23,
            rank: 'Jack',
            suit: 'diamonds',
            image: 'img/cards/JD.png'
        },
        {
            id: 24,
            rank: 'Queen',
            suit: 'diamonds',
            image: 'img/cards/QD.png'
        },
        {
            id: 25,
            rank: 'King',
            suit: 'diamonds',
            image: 'img/cards/KD.png'
        },
        {
            id: 26,
            rank: 'Ace',
            suit: 'diamonds',
            image: 'img/cards/AD.png'
        },
        {
            id: 27,
            rank: 'Two',
            suit: 'spades',
            image: 'img/cards/2S.png'
        },
        {
            id: 28,
            rank: 'Three',
            suit: 'spades',
            image: 'img/cards/3S.png'
        },
        {
            id: 29,
            rank: 'Four',
            suit: 'spades',
            image: 'img/cards/4S.png'
        },
        {
            id: 30,
            rank: 'Five',
            suit: 'spades',
            image: 'img/cards/5S.png'
        },
        {
            id: 31,
            rank: 'Six',
            suit: 'spades',
            image: 'img/cards/6S.png'
        },
        {
            id: 32,
            rank: 'Seven',
            suit: 'spades',
            image: 'img/cards/7S.png'
        },
        {
            id: 33,
            rank: 'Eight',
            suit: 'spades',
            image: 'img/cards/8S.png'
        },
        {
            id: 34,
            rank: 'Nine',
            suit: 'spades',
            image: 'img/cards/9S.png'
        },
        {
            id: 35,
            rank: 'Ten',
            suit: 'spades',
            image: 'img/cards/10S.png'
        },
        {
            id: 36,
            rank: 'Jack',
            suit: 'spades',
            image: 'img/cards/JS.png'
        },
        {
            id: 37,
            rank: 'Queen',
            suit: 'spades',
            image: 'img/cards/QS.png'
        },
        {
            id: 38,
            rank: 'King',
            suit: 'spades',
            image: 'img/cards/KS.png'
        },
        {
            id: 39,
            rank: 'Ace',
            suit: 'spades',
            image: 'img/cards/AS.png'
        },
        {
            id: 40,
            rank: 'Two',
            suit: 'clubs',
            image: 'img/cards/2C.png'
        },
        {
            id: 41,
            rank: 'Three',
            suit: 'clubs',
            image: 'img/cards/3C.png'
        },
        {
            id: 42,
            rank: 'Four',
            suit: 'clubs',
            image: 'img/cards/4C.png'
        },
        {
            id: 43,
            rank: 'Five',
            suit: 'clubs',
            image: 'img/cards/5C.png'
        },
        {
            id: 44,
            rank: 'Six',
            suit: 'clubs',
            image: 'img/cards/6C.png'
        },
        {
            id: 45,
            rank: 'Seven',
            suit: 'clubs',
            image: 'img/cards/7C.png'
        },
        {
            id: 46,
            rank: 'Eight',
            suit: 'clubs',
            image: 'img/cards/8C.png'
        },
        {
            id: 47,
            rank: 'Nine',
            suit: 'clubs',
            image: 'img/cards/9C.png'
        },
        {
            id: 48,
            rank: 'Ten',
            suit: 'clubs',
            image: 'img/cards/10C.png'
        },
        {
            id: 49,
            rank: 'Jack',
            suit: 'clubs',
            image: 'img/cards/JC.png'
        },
        {
            id: 50,
            rank: 'Queen',
            suit: 'clubs',
            image: 'img/cards/QC.png'
        },
        {
            id: 51,
            rank: 'King',
            suit: 'clubs',
            image: 'img/cards/KC.png'
        },
        {
            id: 52,
            rank: 'Ace',
            suit: 'clubs',
            image: 'img/cards/AC.png'
        },
    ];
    return deck;
}
//# sourceMappingURL=indexneu.js.map