var BlackJack = angular.module('ngBlackJack', ['ngSanitize']);

BlackJack.controller('ngGame', function($scope, Card, Deck, Player, surrenderAgainst2to10) {
    
    $scope.startGame = false;
    $scope.numOfDecks = 4;

    var strategyTables = new surrenderAgainst2to10();
    $scope.player = new Player();

    $scope.dealCards = function () {
        $scope.deck = new Deck($scope.numOfDecks);
        $scope.deck.shuffle();

        $scope.dealerCards = [];
        $scope.dealerHandSum = 0;
        $scope.player.resetHand();

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

    $scope.getAdvice = function () {
        if($scope.startGame == false){return;}
        if($scope.player.handSum > 21)
            return "lost";
        if($scope.player.numberOfCards() == 2)
        {
           if($scope.player.hand[0].rank == $scope.player.hand[1].rank)
           {
               return strategyTables.pairTable[$scope.player.hand[0].rank - 1][$scope.dealerHandSum - 1];
           }
        }
        if($scope.player.isHandSoft($scope.player.hand))
        {
            return strategyTables.softTable[$scope.player.handSum - 13][$scope.dealerHandSum - 1];
        }
        else //hand is Hard
        {
            return strategyTables.hardTable[$scope.player.handSum - 5][$scope.dealerHandSum - 1];
        }
    };

    $scope.surrender = function () {
        $scope.player.lostHand();
        $scope.startGame = false;
    };

    $scope.$watchCollection('player.hand', function (newValue)
    {
        $scope.player.handSum = getPlayerSumOfCards(newValue);
    });

    $scope.$watchCollection('dealerCards', function (newValue)
    {
        $scope.dealerHandSum = getDealerSumOfCards(newValue);
    });

    $scope.$watch('player.handSum',function(newSum)
    {
        if(newSum > 21)
        {
            $scope.player.lostHand();
            $scope.startGame = false;
        }
    });

    function getPlayerSumOfCards() {
        return sumArrayOfCards($scope.player.hand);
    }

    function getDealerSumOfCards() {
        return sumArrayOfCards($scope.dealerCards);
    }

    function sumArrayOfCards(arrayOfCards)
    {
        var sumOfCards = 0;
        var acesCount = 0;
        angular.forEach(arrayOfCards, function (card) {
            if(card.rank == 1)
            {
                acesCount++;
                sumOfCards += 1;
            }
            else if(card.rank >= 10)
            {
                sumOfCards += 10;
            }
            else
            {sumOfCards += card.rank;}
        });
        if(sumOfCards < 12 && acesCount > 0)
        {
            sumOfCards += 10;
        }
        return sumOfCards
    }
});
