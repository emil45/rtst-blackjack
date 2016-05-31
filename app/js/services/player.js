BlackJack.factory('Player', function () {

    var Player = function()
    {
        this.wins = 0;
        this.loses = 0;
        this.handSum = 0;
        this.hand=[];
    };

    Player.prototype.takeCard = function (newCard) {
        this.hand.push(newCard);
    };

    Player.prototype.numberOfCards = function () {
        return this.hand.length;
    };

    Player.prototype.resetHand = function() {
        this.hand = [];
    };
    return Player;
});
