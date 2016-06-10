BlackJack.factory('Deck', function (Card) {

    var suits = [ 'hearts', 'diams', 'spades', 'clubs'];
    var ranks = [1, 2 ,3 , 4 , 5 ,6 ,7 , 8 ,9 ,10, 11 ,12 ,13];

    var Deck  = function (numOfDecks) {
        this.numberOfDecks = numOfDecks;
        this.deck = generateDeck(this.numberOfDecks);
        this.deck = shuffleDeck(this.deck);
    };

    function generateDeck (numOfDecks) {
        if (numOfDecks == undefined){numOfDecks=1}
        var newDeck = [];
        for(var i=0;i<numOfDecks;i++) {
            angular.forEach(ranks, function (rank) {
                angular.forEach(suits, function (suit) {
                    var card = new Card(rank, suit);
                    newDeck.push(card);
                })
            });
        }
        return newDeck;
    }

    function shuffleDeck(deckToShuffle)
    {
        var deckLength = deckToShuffle.length;
        var i, t;

        while (deckLength) {
            i = Math.floor(Math.random() * deckLength--);

            t = deckToShuffle[deckLength];
            deckToShuffle[deckLength] = deckToShuffle[i];
            deckToShuffle[i] = t;
        }
        return deckToShuffle;
    }

    Deck.prototype.getFakeCard = function () {
        return new Card(0, "fake");
    };
    
    Deck.prototype.popCard = function () {
        if(this.deck.length <10)
        {
            //generating a new deck
            this.deck = generateDeck(this.numberOfDecks);
            this.deck = shuffleDeck(this.deck);
        }
        return this.deck.pop();
    };

    Deck.prototype.getSpecificCardByRank = function (cardRank) {
        return new Card(cardRank, suits[0]);
    };

    return Deck;

});

