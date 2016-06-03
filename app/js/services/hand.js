BlackJack.factory('Hand', function () {
    
    var Hand =  function () {
        this.cards = [];
    };

    Hand.prototype.take = function (card) {
        this.cards.push(card);
    }

    Hand.prototype.sum = function () {
        return sumArrayOfCards(this.cards);
    };

    Hand.prototype.numOfCards = function () {
      return this.cards.length;
    };
    Hand.prototype.isSoft = function () {
        var sum = 0;
        var foundAce =false;
        angular.forEach(this.cards, function (card) {
            sum+= card.realValue();
            if (card.realValue() == 1)
            {foundAce = true}
        });
        if(foundAce == true && sum < 12)
        {
            return true;
        }
        return false;
    };

    function sumArrayOfCards(arrayOfCards)
    {
        var sumOfCards = 0;
        var acesCount = 0;
        angular.forEach(arrayOfCards, function (card) {
            if(card.rank == 1)
            {
                acesCount++;
            }
            sumOfCards += card.realValue();
        });
        //To calculate if Ace will count as 11 or 1
        if(sumOfCards < 12 && acesCount > 0)
        {
            sumOfCards += 10;
        }
        return sumOfCards
    }

    return Hand;

});
