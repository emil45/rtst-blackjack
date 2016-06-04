BlackJack.factory('Player', function (Hand) {

    var Player = function () {
        this.wins = 0;
        this.loses = 0;
        this.hands = [new Hand()];
    };

    Player.prototype.resetHand = function () {
        this.hands = [new Hand()];
    };
    Player.prototype.lostHand = function () {
        this.loses++;
    };
    Player.prototype.winsHand = function () {
        this.wins++;
    };

    return Player;
});
