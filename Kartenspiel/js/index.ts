interface Card {
  id: number;
  rank: string;
  suit: string;
  image: string;
}

interface Player {
  hand: Card[],
  cpu: boolean,
  name: string,
}

interface Game {
  player1: Player;
  player2: Player;
  deck: Card[];
  currentPlay: Card[];
  currentPlayer: Player;
}

let initialNumberOfCards: number = 3;
let hiddenCardSrc: string = 'img/cards/green_back.png'
let currentGame: Game = null;


// =============== Rendering ==================

function renderDeck(deck: Card[], hideCards: boolean) {
  let deckElement : HTMLElement = document.getElementById("card-deck")
  renderCards(deck, deckElement, hideCards);
};

function renderPlayerHand(player: Player) {
  let container: HTMLElement = null;
  if (player.cpu) {
    container = document.getElementById('computer-player-hand')
  } else {
    container = document.getElementById('human-player-hand')
  };

  renderCards(player.hand, container, player.cpu);
};

function renderCurrentCard(card: Card) {
  let currentCardElement : HTMLElement = document.getElementById("current-card")
  renderCards([card], currentCardElement, false);
}

function renderCards(cards: Card[], container: HTMLElement, hideCards: boolean) {
  container.innerHTML = '';

  cards.forEach(function(card : Card){
    let cardElement: HTMLElement;

    if (hideCards) {
      cardElement = createCardElement(hiddenCardSrc);
    } else {
      cardElement = createCardElement(card.image, card.id, true);
    };

    container.appendChild(cardElement);
  });
}

function createCardElement(imageSrc: string, cardId: number = null, selectable: boolean = false) {
  let cardElement : HTMLElement = document.createElement("span");
  cardElement.classList.add("card");

  if (selectable) {
    cardElement.classList.add("selectable");
    cardElement.dataset.cardId = cardId.toString();
    cardElement.addEventListener(
      'click', function() {
        userPlayCard(parseInt(this.dataset.cardId));
      }, false
    )
  }

  let cardImageElement : HTMLElement = document.createElement("img");
  cardImageElement.setAttribute("src", imageSrc);
  cardImageElement.setAttribute("alt", "card");

  cardElement.appendChild(cardImageElement);

  return cardElement;
}

// ================= Game ==================

function startNewGame() {
  let game: Game = createNewGame();
  currentGame = game;

  let i: number;
  for(i = 1; i <= initialNumberOfCards; i++) {
    game.player1.hand.push(drawRandomCard(game.deck));
    game.player2.hand.push(drawRandomCard(game.deck));
  }

  renderPlayerHand(game.player1);
  renderPlayerHand(game.player2);

  let initialCard = drawRandomCard(game.deck);
  game.currentPlay.push(initialCard);
  renderCurrentCard(initialCard);

  document.getElementById('draw-card').addEventListener(
    'click', userDrawCard, false
  );

  renderDeck(game.deck, true);
  setCurrentPlayer(game, game.player2);
}

function setCurrentPlayer(game: Game, player: Player) {
  let cpuPlayerHeadingElement: HTMLElement = document.getElementById("cpu-player-heading");
  let humanPlayerHeadingElement: HTMLElement = document.getElementById("human-player-heading");

  game.currentPlayer = player;

  if (player.cpu) {
    cpuPlayerHeadingElement.classList.add('blinking');
    humanPlayerHeadingElement.classList.remove('blinking');
  } else {
    cpuPlayerHeadingElement.classList.remove('blinking');
    humanPlayerHeadingElement.classList.add('blinking');
  }
}

function drawRandomCard(deck: Card[]) {
  let randomIndex: number = Math.floor((Math.random() * deck.length));
  let card: Card = deck.splice(randomIndex, 1)[0];
  return card;
}

function createNewGame() {
  let game: Game = {
    player1: createPlayer({cpu: true, name: 'Player 1 - Computer'}),
    player2: createPlayer({cpu: false, name: 'Player 2 - Human'}),
    deck: createNewDeck(),
    currentPlay: [],
    currentPlayer: null
  };

  return game
}

function createPlayer(options: any) {
  let player: Player = {
    hand: [],
    cpu: options.cpu,
    name: options.name
  }

  return player
}

function userDrawCard() {
  if (currentGame.currentPlayer != currentGame.player2) {
    alert("It's computer's turn!");
    return;
  };

  draw(currentGame.player2);
  setCurrentPlayer(currentGame, currentGame.player1);
  computerPlayCard();
}

function userPlayCard(cardId: number) {
  if (currentGame.currentPlayer != currentGame.player2) {
    alert("It's computer's turn!");
    return;
  };

  let cardIndex: number = currentGame.player2.hand.findIndex(function(card: Card) {
    return (card.id == cardId);
  });

  let card: Card = currentGame.player2.hand.splice(cardIndex, 1)[0];
  if (!isValidMove(card)) {
    currentGame.player2.hand.push(card);
    alert('Invalid move!');
  } else {
    makeMove(card, currentGame.player2);
    setCurrentPlayer(currentGame, currentGame.player1);
    computerPlayCard();
  }
}

function computerPlayCard() {
  let player: Player = currentGame.player1;
  let cardIndex: number = player.hand.findIndex(isValidMove);

   if (cardIndex == -1) {
     draw(player);
   } else {
     let card: Card = player.hand.splice(cardIndex, 1)[0];
     makeMove(card, player);
   };
  setCurrentPlayer(currentGame, currentGame.player2);
}

function draw(player: Player) {
  let deck: Card[] = currentGame.deck;

  if (deck.length === 0) {
    let cards: Card[] = currentGame.currentPlay.splice(0, currentGame.currentPlay.length - 1);
    cards.forEach(function(card){ deck.push(card) });
    renderDeck(deck, true);
  }

  player.hand.push(drawRandomCard(deck));
  renderPlayerHand(player);
  renderDeck(deck, true);
}

function isValidMove(card: Card) {
  let currentCard: Card = currentGame.currentPlay[currentGame.currentPlay.length - 1];
  return ((currentCard.rank == card.rank) || (currentCard.suit == card.suit));
}

function makeMove(card: Card, player: Player) {
  currentGame.currentPlay.push(card);
  renderCurrentCard(card);
  renderPlayerHand(player);

  if (player.hand.length == 0){
    winTheGame(player);
  }
}

function winTheGame(player: Player) {
  console.log(player.name + ' won the game!');
  startNewGame();
}

window.onload = function () {
  document.getElementById("new-game").addEventListener(
    'click', startNewGame, false
  );
  renderDeck(createNewDeck(), true);
}

// ============= Deck =============

function createNewDeck() {
  let deck: Card[] = [
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

  return deck
}
