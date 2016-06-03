BlackJack.factory('Deck', function (Card) {

    var suits = [ 'hearts', 'diams', 'spades', 'clubs'];
    var ranks = [1, 2 ,3 , 4 , 5 ,6 ,7 , 8 ,9 ,10, 11 ,12 ,13];

    var Deck  = function (numOfDecks) {
        this.deck = generateDeck(numOfDecks);
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

    Deck.prototype.shuffle = function () {
        this.deck = shuffleDeck(this.deck);
    };

    Deck.prototype.popCard = function () {
        return this.deck.pop();
    };

    Deck.prototype.getSpecificCardByRank = function (cardRank) {
        var cardToReturn;
        var indexToSpliceFrom = -1;
        for (var i = 0; i < this.deck.length; i++) {
            if (this.deck[i].rank == cardRank) {
                cardToReturn = this.deck[i];
                indexToSpliceFrom = i;
                break;
            }
        }
        if (indexToSpliceFrom != -1) {
            this.deck.splice(indexToSpliceFrom, 1);
            return cardToReturn;
        }
        else {
            return -1;
        }
    };

    return Deck;

});

