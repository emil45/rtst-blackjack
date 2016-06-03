var BlackJack = angular.module('ngBlackJack', []);

BlackJack.controller('ngGame', function($scope, Card, Deck, Player, surrenderTables) {


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
        if($scope.player.hand.sum() > 21)
            return;
        if($scope.player.hand.numOfCards() == 2)
        {
           if($scope.player.hand.cards[0].rank == $scope.player.hand.cards[1].rank)
           {
               return surrenderTables.pairTable[$scope.player.hand.cards[0].realValue() - surrenderTables.offsets.pairTable][$scope.dealer.hand.sum() - surrenderTables.offsets.dealer];
           }
        }
        if($scope.player.hand.isSoft())
        {
            return surrenderTables.softTable[$scope.player.hand.sum() - surrenderTables.offsets.softTable][$scope.dealer.hand.sum() - surrenderTables.offsets.dealer];
        }
        else //hand is Hard
        {
            return surrenderTables.hardTable[$scope.player.hand.sum() - surrenderTables.offsets.hardTable][$scope.dealer.hand.sum() - surrenderTables.offsets.dealer];
        }
    };

    $scope.stand = function () {

        dealerHitCard();

        while($scope.dealer.hand.sum() < 17 && $scope.player.hand.sum() <= 21)
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

    $scope.toggleManualMode = function() {
        $scope.manualMode = !$scope.manualMode;
    };
    
    $scope.manualChooseCard = function (rank, whoPlaying) {
        var card = $scope.deck.getSpecificCardByRank(rank);
        // Check who activated the function - the player (whoPlaying = 1) or the dealer (whoPlaying = 2)
        if (whoPlaying == 1) {
            $scope.player.hand.take(card);
            $("#playerChooseCard").closeModal();
        }
        else {
            $scope.dealer.hand.take(card);
            $("#dealerChooseCard").closeModal();
        }
    };
    $scope.$watch('player.hand.sum()',function(newSum)
    {
        if(newSum > 21)
        {
            playerLost();
        }
    });

    function dealerHitCard() {
        if ($scope.manualMode == false) {
            $scope.dealer.hand.take($scope.deck.popCard());
        }
        else {
            $("#dealerChooseCard").openModal();
        }
    }
    function playerHitCard() {
        if ($scope.manualMode == false) {
            $scope.player.hand.take($scope.deck.popCard());
        }
        else {
            $("#playerChooseCard").openModal();
        }

    }
    function checkWinner() {
        if($scope.player.hand.sum() > 21)
        {
            playerLost();
        }
        else if($scope.player.hand.sum() > $scope.dealer.hand.sum()) //player sum <=21 && player sum > dealer sum
        {
            if($scope.player.hand.sum() == 21 && $scope.player.hand.numOfCards()<3) {
                playerWins();
            }
            else {
                // player bigger then dealer, player wins
                playerWins();
            }
        }
        else if($scope.dealer.hand.sum() > $scope.player.hand.sum()) {
            if ($scope.dealer.hand.sum() <= 21)
            {
                playerLost();
            }else if($scope.dealer.hand.sum() > 21 && $scope.player.hand.sum()<=21)
            {
                playerWins();
            }
        }
        else if($scope.dealer.hand.sum() == $scope.player.hand.sum())
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
});
