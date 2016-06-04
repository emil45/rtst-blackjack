BlackJack.factory('Hand', function () {
    
    var Hand =  function () {
        this.cards = [];
    };

    Hand.prototype.take = function (card, hideCard) {
        if (hideCard == true)
        {
            card.hideCard();
        }
        this.cards.push(card);
    };

    Hand.prototype.sum = function () {
        return sumArrayOfCards(this.cards);
    };

    Hand.prototype.numOfCards = function () {
      return this.cards.length;
    };
    Hand.prototype.isPair = function () {
        if(this.numOfCards() == 2)
        {
            if(this.cards[0].rank == this.cards[1].rank)
            {
                return true;
            }
        }
        return false;
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

    Hand.prototype.hasHiddenCard = function () {
        var result = false;
        angular.forEach(this.cards, function (card) {
           if (card.isHidden()) {result = true;}
        });
        return result;
    };

    function sumArrayOfCards(arrayOfCards)
    {
        var sumOfCards = 0;
        var acesCount = 0;
        angular.forEach(arrayOfCards, function (card) {
            if (card.hide == false) {
                if(card.rank == 1)
                {
                    acesCount++;
                }
                sumOfCards += card.realValue();
            }
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
