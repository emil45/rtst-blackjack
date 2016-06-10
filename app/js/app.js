var BlackJack = angular.module('ngBlackJack', []);

BlackJack.controller('ngGame', function($scope, Card, Deck, Player, noSurrender, surrenderWithAce, surrenderWithoutAce) {

    $scope.dealFirstTimeForAdvice = false;
    $scope.clickedCard = NaN;
    $scope.manualMode = false;
    $scope.showAdvice = false;
    $scope.splitCards = false;
    $scope.startGame = false;
    $scope.numOfDecks = 4;
    $scope.player = new Player();
    $scope.dealer = new Player();
    document.getElementById('badge3').innerHTML = 'keyboard_backspace';
    $scope.blackjackTable = surrenderWithoutAce;
    $scope.deck = new Deck($scope.numOfDecks);

    toastr.options = {
        "newestOnTop": true,
        "positionClass": "toastr-bottom-center"
    };

    function resetHandsAndDealCards() {
        $scope.player.resetHand();
        $scope.dealer.resetHand();

        playerHitCard();
        playerHitCard();
        dealerHitCard();
    }

    $scope.dealCards = function () {
        resetHandsAndDealCards();
        $scope.doubleClicked = false;
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
        if(isThereAnyHiddenCardsOnTable())
        {
            toastr.warning('There is a hidden card on table, flip it first please');
            return;
        }
        playerHitCard();
    };

    $scope.getAdvice = function () {
        if($scope.startGame == false  || isThereAnyHiddenCardsOnTable()||$scope.player.hands[0].sum() > 21){return;}
        var advice;
        var playerSum = $scope.player.hands[0].sum();
        var dealerSum = $scope.dealer.hands[0].sum();
        if($scope.player.hands[0].isPair())
        {
            advice = $scope.blackjackTable.pairTable[$scope.player.hands[0].cards[0].realValue() - $scope.blackjackTable.offsets.pairTable][dealerSum - $scope.blackjackTable.offsets.dealer];
        }
        else if($scope.player.hands[0].isSoft())
        {
            advice = $scope.blackjackTable.softTable[playerSum - $scope.blackjackTable.offsets.softTable][dealerSum - $scope.blackjackTable.offsets.dealer];
        }
        else //hand is Hard
        {
            advice = $scope.blackjackTable.hardTable[playerSum - $scope.blackjackTable.offsets.hardTable][dealerSum - $scope.blackjackTable.offsets.dealer];
        }
        if(advice.includes('.')) {
            if (isAnyActionWasPerformed()) {
                //take the otherwise
                advice = advice.split('.')[1];
            }
            else {
                //take the first
                advice = advice.split('.')[0];
            }
        }
        return advice;
    };

    $scope.stand = function () {
        if(isThereAnyHiddenCardsOnTable())
        {
            toastr.warning('There is a hidden card on the table, flip it first please');
            return;
        }
        hitDealerCardsUntilDead()
    };

    $scope.double = function () {
        if(isThereAnyHiddenCardsOnTable())
        {
            toastr.warning('There is a hidden card on the table, flip it first please');
            return;
        }
        if(isAnyActionWasPerformed())
        {
            toastr.warning('you can\'t double after you hit.. rules of jail');
            return;
        }
        playerHitCard();
        if($scope.manualMode ==true)
        {$scope.doubleClicked = true;}
        else{
            hitDealerCardsUntilDead();
        }
    };

    $scope.surrender = function () {
        if ($scope.blackjackTable == noSurrender) {
            toastr.warning('You can\'t surrender in this type of game mode');
        }
        else {
            if(isThereAnyHiddenCardsOnTable())
            {
                toastr.warning('There is a hidden card on the table, flip it first please');
                return;
            }
            if(isAnyActionWasPerformed())
            {
                toastr.warning('You can\'t surrender after you hit, you had your chance');
                return;
            }
            if($scope.dealer.hands[0].cards[0].rank == 1 && $scope.blackjackTable == surrenderWithoutAce)
            {
                toastr.warning('You can\'t surrender if the dealer has an Ace, Be A Man For Once!');
                return;
            }
            toastr.error('Only chickens Surrender');

            if ($scope.dealer.hands[0].numOfCards() == 1) {
                dealerHitCard();
            }
            playerLost();
        }
    };

    $scope.toggleManualMode = function() {
        $scope.manualMode = !$scope.manualMode;
    };

    $scope.toggleGameMode = function (chosenGameMode) {
        switch (chosenGameMode) {
            case 'noSurrender':
                document.getElementById('badge1').innerHTML = 'keyboard_backspace';
                document.getElementById('badge2').innerHTML = '';
                document.getElementById('badge3').innerHTML = '';
                $scope.blackjackTable = noSurrender;
                break;
            case 'surrenderWithAce':
                document.getElementById('badge2').innerHTML = 'keyboard_backspace';
                document.getElementById('badge1').innerHTML = '';
                document.getElementById('badge3').innerHTML = '';
                $scope.blackjackTable = surrenderWithAce;
                break;
            case 'surrenderWithoutAce':
                document.getElementById('badge3').innerHTML = 'keyboard_backspace';
                document.getElementById('badge1').innerHTML = '';
                document.getElementById('badge2').innerHTML = '';
                $scope.blackjackTable = surrenderWithoutAce;
                break;
            default:
                document.getElementById('badge3').innerHTML = 'keyboard_backspace';
                document.getElementById('badge1').innerHTML = '';
                document.getElementById('badge2').innerHTML = '';
                $scope.blackjackTable = surrenderWithoutAce;
        }
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
        checkPlayerHandStatusAfterATake();
        //if the double button clicked - we need to start deal cards to the dealer only after the card was flipped
        //that's way this if is here ↓↓
        if($scope.doubleClicked)
        {
            hitDealerCardsUntilDead();
        }
    };
    
    $scope.hideCardOrShow = function (card) {
        var classForDiv = 'rank-' + card.rank + ' ' + card.suit;
        if (card.isHidden()) {
            classForDiv += ' hideCard animated pulse';
        }
        return classForDiv
    };
    
    $scope.getWinRatio = function() {
        var winRatio = (($scope.player.wins / ($scope.player.loses + $scope.player.wins)) * 100).toFixed(1);
        if (isNaN(winRatio)) {
            return 0;
        }
        else {
            return winRatio + "%";
        }
    };

    $scope.openSimulateModal = function () {
        $("#simulate").openModal();
    };

    $scope.simulateGames = function() {
        $("#simulate").closeModal();
        var gamesToSimulate = parseInt(document.getElementById('simulateCount').getElementsByClassName('value')[0].innerHTML);
        $scope.manualMode = false;
        $scope.deck = new Deck($scope.numOfDecks);
        for (var i = 0; i < gamesToSimulate; i++) {
            $scope.startGame = true;
            resetHandsAndDealCards();
            while($scope.startGame == true)
            {
                var advice = $scope.getAdvice();
                switch (advice){
                    case "Hit":
                        $scope.hitCardForPlayer();
                        break;
                    case "Stand":
                        $scope.stand();
                        break;
                    case "Double":
                        $scope.double();
                        break;
                    case "Surrender":
                        $scope.surrender();
                        break;
                    default: //split
                        $scope.hitCardForPlayer();
                }
            }
        }
        $scope.player.resetHand();
        $scope.dealer.resetHand();
    };

    function hitDealerCardsUntilDead() {
        dealerHitCard();
        //if sum of player is more than 21 after double and dealer takes card
        //it's gonna be 2 losses - that why this if is here
        if ($scope.player.hands[0].sum() > 21){return;}
        while ($scope.dealer.hands[0].sum() < 17 && $scope.player.hands[0].sum() <= 21) {
            dealerHitCard();
        }
        checkWinner();
    }
    function isAnyActionWasPerformed() {
        if($scope.dealer.hands[0].numOfCards() == 1 && $scope.player.hands[0].numOfCards() == 2)
        {
            return false;
        }
        return true;
    }
    function dealerHitCard() {
        if ($scope.manualMode == true && $scope.dealer.hands[0].numOfCards() == 0) {
            $scope.dealer.hands[0].take($scope.deck.getFakeCard(), true);
        }
        else {
            $scope.dealer.hands[0].take($scope.deck.popCard());
        }
    }

    function checkPlayerHandStatusAfterATake()
    {
        var playerSum = $scope.player.hands[0].sum();
        if(playerSum>21)
        {
            playerLost();
        }
        //BlackJack for Player ↓↓↓
        if (playerSum == 21 && $scope.player.hands[0].numOfCards() == 2) {
            if ($scope.dealer.hands[0].sum() > 0) {
                $scope.dealer.hands[0].take($scope.deck.popCard());
                playerWinsBlackJack();
            }
            else { //sum == 0
                $scope.dealer.hands[0].cards[0] = $scope.deck.popCard();
                $scope.dealer.hands[0].cards[0].showCard();
                $scope.dealer.hands[0].take($scope.deck.popCard());
                playerWinsBlackJack();
            }
        }
    }

    function playerHitCard() {
        if ($scope.manualMode == false) {
            $scope.player.hands[0].take($scope.deck.popCard());
        }
        else {
            $scope.player.hands[0].take($scope.deck.getFakeCard(), true);
        }
        checkPlayerHandStatusAfterATake();
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

    function isThereAnyHiddenCardsOnTable()
    {
        return ($scope.player.hands[0].hasHiddenCard() ||$scope.dealer.hands[0].hasHiddenCard());

    }
});
