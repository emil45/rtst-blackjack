BlackJack.factory('Player', function (Hand) {

    var Player = function()
    {
        this.wins = 0;
        this.loses = 0;
        this.hand = new Hand();
    };

    Player.prototype.resetHand = function() {
        this.hand = new Hand();
    };

    Player.prototype.lostHand = function () {
        this.loses++;
    };
    Player.prototype.winsHand = function () {
        this.wins++;
    };

    return Player;
});
