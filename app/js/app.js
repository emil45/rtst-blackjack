var BlackJack = angular.module('ngBlackJack', []);

BlackJack.controller('ngGame', function($scope, Card, Deck, Player) {
    
    $scope.startGame = false;
    $scope.dealerCards = [];
    $scope.DealerHandSum=0;

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
                sumOfCards+=11;
            }
            else if(card.rank >=10)
            {
                sumOfCards+=10;
            }
            else
            {sumOfCards += card.rank;}
        });
        while(sumOfCards>21 && acesCount>0)
        {
            sumOfCards-=10;
            acesCount--;
        }
        return sumOfCards
    }
    $scope.getDealerSumOfCards = function () {
        return $scope.sumArrayOfCards($scope.dealerCards);
    };
    $scope.playerLost = function () {
        $scope.player.loses++;
    };

    $scope.getAdvice = function () {
        if($scope.player.numberOfCards() ==2)
        {
           if($scope.player.hand[0] == $scope.player.hand[1])
           {
               return $scope.player.hand[0] + $scope.getDealerSumOfCards()
           }
        }
        if(!isArrayContainAces($scope.player.hand))
        {
            return $scope.getPlayerSumOfCards() +$scope.getDealerSumOfCards();
        }
        //array contain Aces, Checking if hand is soft or hard
        //TODO: add check if hand is soft or hard and act


    };
    function isArrayContainAces(array) {
        angular.forEach(array, function (card) {
            if (card.rank == 1)
            {return true}
        });
        return false;

    }

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
