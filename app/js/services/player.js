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
    Player.prototype.isHandSoft = function (hand) {
        var sum=0;
        var foundAce =false;
        angular.forEach(hand, function (card) {
            if(card.rank>=10){sum+= 10}
            else{sum+= card.rank}
            if (card.rank == 1)
            {foundAce = true}
        });
        if(foundAce ==true && sum<12)
        {
            return true;
        }
        return false;
    };

    Player.prototype.lostHand = function () {
        this.loses++;
    };
    Player.prototype.surrender = function () {
        this.lostHand();
    };

    return Player;
});
