var BlackJack = angular.module('ngBlackJack', []);

BlackJack.controller('ngGame', function($scope, Card, Deck, Player, surrenderTables) {


    $scope.dealFirstTimeForAdvice = false;
    $scope.clickedCard = NaN;
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
        if($scope.startGame == false || $scope.player.hands[0].sum() ==0 || $scope.dealer.hands[0].sum() == 0){return;}
        if($scope.player.hands[0].sum() > 21)
            return;
        if($scope.player.hands[0].isPair())
        {
            return surrenderTables.pairTable[$scope.player.hands[0].cards[0].realValue() - surrenderTables.offsets.pairTable][$scope.dealer.hands[0].sum() - surrenderTables.offsets.dealer];
        }
        if($scope.player.hands[0].isSoft())
        {
            return surrenderTables.softTable[$scope.player.hands[0].sum() - surrenderTables.offsets.softTable][$scope.dealer.hands[0].sum() - surrenderTables.offsets.dealer];
        }
        else //hand is Hard
        {
            return surrenderTables.hardTable[$scope.player.hands[0].sum() - surrenderTables.offsets.hardTable][$scope.dealer.hands[0].sum() - surrenderTables.offsets.dealer];
        }
    };

    $scope.stand = function () {

        if($scope.manualMode)
        {
            if($scope.dealer.hands[0].sum() < 17 && $scope.player.hands[0].sum() <= 21)
            {
                dealerHitCard();
            }
        }
        else {
            dealerHitCard();

            while ($scope.dealer.hands[0].sum() < 17 && $scope.player.hands[0].sum() <= 21) {
                dealerHitCard();
            }
            checkWinner();
        }
    };

    $scope.double = function () {
        playerHitCard();
        $scope.stand();
    };

    $scope.surrender = function () {
        Materialize.toast('Only chickens Surrender', 4000);
        if ($scope.dealer.hands[0].numOfCards() == 1 && $scope.dealer.hands[0].cards[0].hide == false ) {
            dealerHitCard();
        }
        playerLost();
    };

    $scope.toggleManualMode = function() {
        $scope.manualMode = !$scope.manualMode;
    };

    $scope.manualChooseCardForHiddenCard = function (card, whoPlaying) {
        if (card.isHidden()) {
            $scope.clickedCard = card;
            // Check who activated the function - the dealer (whoPlaying = 1) or the player (whoPlaying = 2)
            if (whoPlaying == 1) {
                $("#dealerChooseCard").openModal();
            }
            else {
                $("#playerChooseCard").openModal();
            }
        }
    };
    
    $scope.manualChooseCardModal = function (rank) {
        var card = $scope.deck.getSpecificCardByRank(rank);
        $scope.clickedCard.rank = card.rank;
        $scope.clickedCard.suit = card.suit;
        $scope.clickedCard.showCard();
        $scope.clickedCard = NaN;
        $("#dealerChooseCard").closeModal();
        $("#playerChooseCard").closeModal();

    };
    
    $scope.hideCardOrShow = function (card) {
        var classForDiv = 'rank-' + card.rank + ' ' + card.suit;
        if (card.isHidden()) {
            classForDiv += ' hideCard animated pulse';
        }
        return classForDiv
    };
    
    $scope.$watch('player.hands[0].sum()',function(newSum)
    {
        if(newSum > 21)
        {
            console.log(newSum);
            playerLost();
        }
        if(newSum == 21 && $scope.player.hands[0].numOfCards() == 2) {
            if ($scope.dealer.hands[0].sum() > 0) {
                if ($scope.dealer.hands[0].cards[0].hide == false) {
                    $scope.dealer.hands[0].take($scope.deck.popCard());
                    playerWinsBlackJack();
                }
            }
            else{ //sum == 0
                $scope.dealer.hands[0].cards[0] = $scope.deck.popCard();
                $scope.dealer.hands[0].cards[0].showCard();
                $scope.dealer.hands[0].take($scope.deck.popCard());
                playerWinsBlackJack();
            }
        }
    });

    function dealerHitCard() {
        if ($scope.manualMode == false) {
            $scope.dealer.hands[0].take($scope.deck.popCard());
        }
        else {
            if ($scope.dealer.hands[0].hasHiddenCard()) {
                Materialize.toast("You already have a card, greedy bastard", 4000);
            }
            else {
                $scope.dealer.hands[0].take($scope.deck.getFakeCard(), true);
            }
        }
    }
    function playerHitCard() {
        if ($scope.player.hands[0].hasHiddenCard() && $scope.player.hands[0].numOfCards() >= 2) {
            Materialize.toast("You already have a card, greedy bastard", 4000);
        }
        else {
            if ($scope.manualMode == false) {
                $scope.player.hands[0].take($scope.deck.popCard());
            }
            else {
                $scope.player.hands[0].take($scope.deck.getFakeCard(), true);
            }
        }
    }
    function checkWinner() {
        if($scope.player.hands[0].sum() > 21)
        {
            playerLost();
        }
        else if($scope.player.hands[0].sum() > $scope.dealer.hands[0].sum()) //player sum <=21 && player sum > dealer sum
        {
            if($scope.player.hands[0].sum() == 21 && $scope.player.hands[0].numOfCards()<3) {
                //BlackJack!!!!
                playerWins();
            }
            else {
                // player bigger then dealer, player wins
                playerWins();
            }
        }
        else if($scope.dealer.hands[0].sum() > $scope.player.hands[0].sum()) {
            if ($scope.dealer.hands[0].sum() <= 21)
            {
                playerLost();
            }else if($scope.dealer.hands[0].sum() > 21 && $scope.player.hands[0].sum()<=21)
            {
                playerWins();
            }
        }
        else if($scope.dealer.hands[0].sum() == $scope.player.hands[0].sum())
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
    function playerWinsBlackJack() {
        Materialize.toast('you were born a winner.. BlackJack!', 4000);
        $scope.player.winsHand();
        $scope.showAdvice = false;
        $scope.startGame = false;
    }
});
