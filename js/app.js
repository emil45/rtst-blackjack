var BlackJack = angular.module('ngBlackJack', []);

BlackJack.controller('ngGame', function($scope, Card, Deck) {
    
    $scope.startGame = false;
    $scope.playerWins = 0;
    $scope.playerLoses = 0;
    $scope.playerCards = [];
    $scope.dealerCards = [];
    
    $scope.dealCards = function () {
        $scope.deck = new Deck();
        $scope.deck.shuffle();

        var firstPlayerCard = $scope.deck.popCard();
        var secondPlayerCard = $scope.deck.popCard();
        var firstDealerCard = $scope.deck.popCard();
        var secondDealerCard = $scope.deck.popCard();
        secondDealerCard.hideCard();

        $scope.playerCards.push(firstPlayerCard, secondPlayerCard);
        $scope.dealerCards.push(firstDealerCard, secondDealerCard);

        $scope.startGame = true
    };

    $scope.hitCardForPlayer = function () {
        var anotherCard = $scope.deck.popCard();
        $scope.playerCards.push(anotherCard);
    };

    $scope.getPlayerSumOfCards = function () {
        var sumOfCards = 0;
        angular.forEach($scope.playerCards, function (card) {
            sumOfCards += card.rank;
        });
        return sumOfCards
    };

});
