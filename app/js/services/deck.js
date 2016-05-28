BlackJack.factory('Deck', function (Card) {

    var suits = [ 'heart', 'diamond', 'spade', 'club'];
    var ranks = [1, 2 ,3 , 4 , 5 ,6 ,7 , 8 ,9 ,10, 11 ,12 ,13];

    var Deck  = function () {
        this.deck = generateDeck();
    };

    function generateDeck () {
        var newDeck = [];
        angular.forEach(ranks, function (rank) {
            angular.forEach(suits, function (suit) {
                var card = new Card(rank, suit);
                newDeck.push(card);
            })
        });
        return newDeck;
    }

    Deck.prototype.shuffle = function () {
        var deckLength = this.deck.length;
        var i, t;

        while (deckLength) {
            i = Math.floor(Math.random() * deckLength--);

            t = this.deck[deckLength];
            this.deck[deckLength] = this.deck[i];
            this.deck[i] = t;
        }
    };

    Deck.prototype.popCard = function () {
        return this.deck.pop();
    };

    return Deck;

});

