var BlackJack = angular.module('ngBlackJack', []);

BlackJack.controller('ngGame', function($scope, Card, Deck, Player, surrenderAgainst2to10) {
    
    $scope.startGame = false;
    $scope.dealerCards = [];
    $scope.DealerHandSum=0;

    var strategyT = new surrenderAgainst2to10();
    $scope.player = new Player();

    
    $scope.dealCards = function () {
        $scope.deck = new Deck();
        $scope.deck.shuffle();

        var firstPlayerCard = $scope.deck.popCard();
        var secondPlayerCard = $scope.deck.popCard();
        var firstDealerCard = $scope.deck.popCard();

        $scope.player.takeCard(firstPlayerCard);
        $scope.player.takeCard(secondPlayerCard);

        $scope.dealerCards.push(firstDealerCard);

        $scope.startGame = true
    };

    $scope.hitCardForPlayer = function () {
        var anotherCard = $scope.deck.popCard();
        $scope.player.takeCard(anotherCard);
    };

    $scope.getPlayerSumOfCards = function () {
        return $scope.sumArrayOfCards($scope.player.hand);
    };

    $scope.sumArrayOfCards = function (arrayOfCards)
    {
        var sumOfCards = 0;
        var acesCount = 0;
        angular.forEach(arrayOfCards, function (card) {
            if(card.rank ==1)
            {
                acesCount++;
                sumOfCards+=1;
            }
            else if(card.rank >=10)
            {
                sumOfCards+=10;
            }
            else
            {sumOfCards += card.rank;}
        });
        if(sumOfCards<12&& acesCount>0)
        {
            sumOfCards+=10;
        }
        return sumOfCards
    };
    $scope.getDealerSumOfCards = function () {
        return $scope.sumArrayOfCards($scope.dealerCards);
    };
    $scope.playerLost = function () {
        $scope.player.loses++;
    };

    $scope.getAdvice = function () {
        if($scope.player.handSum>21)
            return "lost";
        if($scope.player.numberOfCards() ==2)
        {
           if($scope.player.hand[0].rank == $scope.player.hand[1].rank)
           {
               return strategyT.pairTable[$scope.player.hand[0].rank-1][$scope.DealerHandSum-1];
           }
        }
        if($scope.player.isHandSoft($scope.player.hand))
        {
            return strategyT.softTable[$scope.player.handSum-13][$scope.DealerHandSum-1];
        }
        else //hand is Hard
        {
            return strategyT.hardTable[$scope.player.handSum - 5][$scope.DealerHandSum-1];
        }
    };
    $scope.calcAdvice = function () {
        $scope.advice = $scope.getAdvice();
    };

    

    $scope.$watchCollection('player.hand', function (newValue)
    {
        $scope.player.handSum = $scope.getPlayerSumOfCards(newValue);
    });
    $scope.$watchCollection('dealerCards', function (newValue)
    {
        $scope.DealerHandSum = $scope.getDealerSumOfCards(newValue);
    });
    $scope.$watch('player.handSum',function(newSum)
    {
        if(newSum>21)
        {
            $scope.playerLost();
        }
    });

});
