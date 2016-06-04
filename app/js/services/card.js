BlackJack.factory('Card', function () {

    var Card  = function (rank, suit) {
        this.rank = rank;
        this.suit = suit;
        this.hide = false;
    };
    Card.prototype.realValue = function () {
        if(this.rank<=13 && this.rank>=10){
            return 10;
        }
        else{return this.rank}

    };
    Card.prototype.showCard = function () {
        this.hide = false;
    };

    Card.prototype.hideCard = function () {
        this.hide = true;
    };

    return Card;

});
