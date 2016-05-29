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

    Player.prototype.numberOfCards = function (newCard) {
        return this.hand.length;
    };
    
    return Player;
});
