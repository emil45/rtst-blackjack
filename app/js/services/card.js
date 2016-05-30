BlackJack.factory('Card', function () {

    var Card  = function (rank, suit) {
        this.rank = rank;
        this.suit = suit;
        this.hide = false;
    };

    Card.prototype.showCard = function () {
        this.hide = false;
    };

    Card.prototype.hideCard = function () {
        this.hide = true;
    };

    Card.prototype.getRank = function () {
        return this.rank;
    };

    Card.prototype.getSuit = function () {
        return this.suit;
    };

    return Card;

});
