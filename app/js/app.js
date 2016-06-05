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

    toastr.options = {
        "newestOnTop": true,
        "positionClass": "toastr-bottom-center",
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": 5000,
        "extendedTimeOut": 1000,
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut",
    };

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
        if($scope.startGame == false  || $scope.dealer.hands[0].sum() == 0||($scope.player.hands[0].numOfCards()==2 && $scope.player.hands[0].hasHiddenCard())){return;}
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
        toastr.error('Only chickens Surrender');
        if ($scope.dealer.hands[0].numOfCards() == 1 && $scope.dealer.hands[0].cards[0].hide == false ) {
            dealerHitCard();
        }
        playerLost();
    };

    $scope.toggleManualMode = function() {
        console.log("hello")
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
    
    $scope.getWinRatio = function() {
        var winRatio = (($scope.player.wins / ($scope.player.loses + $scope.player.wins)) * 100).toFixed(0);
        if (isNaN(winRatio)) {
            return 0;
        }
        else {
            return winRatio + "%";
        }
    };

    function dealerHitCard() {
        if ($scope.manualMode == false) {
            $scope.dealer.hands[0].take($scope.deck.popCard());
        }
        else {
            if ($scope.dealer.hands[0].hasHiddenCard()) {
                toastr.warning("You already have a card, greedy bastard");
            }
            else {
                $scope.dealer.hands[0].take($scope.deck.getFakeCard(), true);
            }
        }
    }
    function playerHitCard() {
        if ($scope.player.hands[0].hasHiddenCard() && $scope.player.hands[0].numOfCards() >= 2) {
            toastr.warning("You already have a card, greedy bastard");
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
            playerWins();
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
            toastr.info("It's a tie baby");
            $scope.showAdvice = false;
            $scope.startGame = false;
        }
    }
    function playerLost() {
        toastr.error('You lost this one');
        $scope.player.lostHand();
        $scope.showAdvice = false;
        $scope.startGame = false;
    }

    function playerWins() {
        toastr.success("You Won This Round");
        $scope.player.winsHand();
        $scope.showAdvice = false;
        $scope.startGame = false;
    }
    function playerWinsBlackJack() {
        toastr.success('You were born a winner, BlackJack!');
        $scope.player.winsHand();
        $scope.showAdvice = false;
        $scope.startGame = false;
    }
});
