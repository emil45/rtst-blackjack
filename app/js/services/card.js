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

    return Card;

});
