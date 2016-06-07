BlackJack.service('surrenderWithoutAce', function () {

    var hit = "Hit";
    var stand = "Stand";
    var split = "Split";
    var doubleOtherwiseHit = "Double.Hit";
    var doubleOtherwiseStand = "Double.Stand";
    var surrenderOtherwiseHit = "Surrender.Hit";
    //this offset tells up in what number the array starts
    //we need it when we gonna use data from array
    this.offsets = {
        dealer : 2 ,
        pairTable : 1,
        softTable : 13,
        hardTable :5
    };

    this.hardTable = [
        [hit, hit, hit, hit, hit, hit, hit, hit, hit, hit],
        [hit, hit, hit, hit, hit, hit, hit, hit, hit, hit],
        [hit, hit, hit, hit, hit, hit, hit, hit, hit, hit],
        [hit, hit, hit, hit, hit, hit, hit, hit, hit, hit],
        [hit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, hit, hit, hit, hit, hit],
        [doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, hit, hit],
        [doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, hit],
        [hit, hit, stand, stand, stand, hit, hit, hit, hit, hit],
        [stand, stand, stand, stand, stand, hit, hit, hit, hit, hit],
        [stand, stand, stand, stand, stand, hit, hit, hit, hit, hit],
        [stand, stand, stand, stand, stand, hit, hit, hit, surrenderOtherwiseHit, hit],
        [stand, stand, stand, stand, stand, hit, hit, surrenderOtherwiseHit, surrenderOtherwiseHit, hit],
        [stand, stand, stand, stand, stand, stand, stand, stand, stand, stand],
        [stand, stand, stand, stand, stand, stand, stand, stand, stand, stand],
        [stand, stand, stand, stand, stand, stand, stand, stand, stand, stand],
        [stand, stand, stand, stand, stand, stand, stand, stand, stand, stand],
        [stand, stand, stand, stand, stand, stand, stand, stand, stand, stand]];

    this.softTable = [
        [hit, hit, hit, doubleOtherwiseHit, doubleOtherwiseHit, hit, hit, hit, hit, hit],
        [hit, hit, hit, doubleOtherwiseHit, doubleOtherwiseHit, hit, hit, hit, hit, hit],
        [hit, hit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, hit, hit, hit, hit, hit],
        [hit, hit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, hit, hit, hit, hit, hit],
        [hit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, hit, hit, hit, hit, hit],
        [stand, doubleOtherwiseStand, doubleOtherwiseStand, doubleOtherwiseStand, doubleOtherwiseStand, stand, stand, hit, hit, hit],
        [stand, stand, stand, stand, stand, stand, stand, stand, stand, stand],
        [stand, stand, stand, stand, stand, stand, stand, stand, stand, stand],
        [stand, stand, stand, stand, stand, stand, stand, stand, stand, stand]];

    this.pairTable = [
        [split, split, split, split, split, split, split, split, split, split],
        [hit, hit, split, split, split, split, hit, hit, hit, hit],
        [hit, hit, split, split, split, split, hit, hit, hit, hit],
        [hit, hit, hit, hit, hit, hit, hit, hit, hit, hit],
        [doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, hit, hit],
        [hit, split, split, split, split, hit, hit, hit, hit, hit],
        [split, split, split, split, split, split, hit, hit, hit, hit],
        [split, split, split, split, split, split, split, split, split, split],
        [split, split, split, split, split, stand, split, split, stand, stand],
        [stand, stand, stand, stand, stand, stand, stand, stand, stand, stand]];

});
