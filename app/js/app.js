var BlackJack = angular.module('ngBlackJack', []);

BlackJack.controller('ngGame', function($scope, Card, Deck, Player, surrenderAgainst2to10) {


    $scope.dealFirstTimeForAdvice = false;
    $scope.manualMode = false;
    $scope.showAdvice = false;
    $scope.splitCards = false;
    $scope.startGame = false;
    $scope.numOfDecks = 4;
    $scope.player = new Player();
    $scope.dealer = new Player();

    $scope.dealCards = function () {
        $scope.deck = new Deck($scope.numOfDecks);
        
        $scope.player.resetHand();
        $scope.dealer.resetHand();

        playerHitCard();
        playerHitCard();
        dealerHitCard();

        $scope.dealFirstTimeForAdvice = true;
        $scope.showAdvice = true;
        $scope.startGame = true;
    };

    $scope.openRulesModal = function () {
        $("#rules").openModal();
    };

    $scope.openTeamModal = function () {
        $("#team").openModal();
    };

    $scope.hitCardForPlayer = function () {
        playerHitCard();
    };

    $scope.getAdvice = function () {
        if($scope.startGame == false){return;}
        if($scope.player.handSum > 21)
            return;
        if($scope.player.numberOfCards() == 2)
        {
           if($scope.player.hand[0].rank == $scope.player.hand[1].rank)
           {
               return surrenderAgainst2to10.pairTable[$scope.player.hand[0].rank - 1][$scope.dealer.handSum - 2];
           }
        }
        if($scope.player.isHandSoft($scope.player.hand))
        {
            return surrenderAgainst2to10.softTable[$scope.player.handSum - 13][$scope.dealer.handSum - 2];
        }
        else //hand is Hard
        {
            return surrenderAgainst2to10.hardTable[$scope.player.handSum - 5][$scope.dealer.handSum - 2];
        }
    };

    $scope.stand = function () {

        dealerHitCard();

        while($scope.dealer.handSum < 17 && $scope.player.handSum <= 21)
        {
            dealerHitCard();
        }
        checkWinner();
    };

    $scope.double = function () {
        playerHitCard();
        $scope.stand();
    };

    $scope.surrender = function () {
        Materialize.toast('Only chickens Surrender', 4000);
        dealerHitCard();
        playerLost();
    };

    $scope.$watchCollection('player.hand', function (newValue)
    {
        $scope.player.handSum = getPlayerSumOfCards(newValue);
    });

    $scope.$watchCollection('dealer.hand', function (newValue)
    {
        $scope.dealer.handSum = getDealerSumOfCards(newValue);
    });

    $scope.$watch('player.handSum',function(newSum)
    {
        if(newSum > 21)
        {
            playerLost();
        }
    });

    $scope.toggleManualMode = function() {
        $scope.manualMode = !$scope.manualMode;
    };
    
    $scope.manualChooseCard = function (rank, whoPlaying) {
        var card = $scope.deck.getSpecificCardByRank(rank);
        // Check who activated the function - the player (whoPlaying = 1) or the dealer (whoPlaying = 2)
        if (whoPlaying == 1) {
            $scope.player.takeCard(card);
            $scope.player.handSum = getPlayerSumOfCards();
            $("#playerChooseCard").closeModal();
        }
        else {
            $scope.dealer.takeCard(card);
            $scope.dealer.handSum = getDealerSumOfCards();
            $("#dealerChooseCard").closeModal();
        }

    };

    function dealerHitCard() {
        if ($scope.manualMode == false) {
            $scope.dealer.takeCard($scope.deck.popCard());
            $scope.dealer.handSum = getDealerSumOfCards();
        }
        else {
            $("#dealerChooseCard").openModal();
        }
    }
    function playerHitCard() {
        if ($scope.manualMode == false) {
            $scope.player.takeCard($scope.deck.popCard());
            $scope.player.handSum = getPlayerSumOfCards();
        }
        else {
            $("#playerChooseCard").openModal();
        }

    }
    function checkWinner() {
        if($scope.player.handSum > 21)
        {
            playerLost();
        }
        else if($scope.player.handSum > $scope.dealer.handSum) //player sum <=21 && player sum > dealer sum
        {
            if($scope.player.handSum == 21 && $scope.player.numberOfCards()<3) {
                playerWins();
            }
            else {
                // player bigger then dealer, player wins
                playerWins();
            }
        }
        else if($scope.dealer.handSum > $scope.player.handSum) {
            if ($scope.dealer.handSum <= 21)
            {
                playerLost();
            }else if($scope.dealer.handSum > 21 && $scope.player.handSum<=21)
            {
                playerWins();
            }
        }
        else if($scope.dealer.handSum == $scope.player.handSum)
        {
            // Tie
            Materialize.toast("It's a tie baby", 4000);
            $scope.showAdvice = false;
            $scope.startGame = false;
        }
    }
    function playerLost() {
        Materialize.toast('You lost this one', 4000);
        $scope.player.lostHand();
        $scope.showAdvice = false;
        $scope.startGame = false;
    }
    function playerWins() {
        Materialize.toast('You won this round', 4000);
        $scope.player.winsHand();
        $scope.showAdvice = false;
        $scope.startGame = false;
    }
    function getPlayerSumOfCards() {
        return sumArrayOfCards($scope.player.hand);
    }
    function getDealerSumOfCards() {
        return sumArrayOfCards($scope.dealer.hand);
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
