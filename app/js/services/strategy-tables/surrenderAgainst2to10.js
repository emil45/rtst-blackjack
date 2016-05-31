BlackJack.factory('surrenderAgainst2to10', function () {

    var Tables = function () {

    };
    var hit = "H";
    var stand = "S";
    var split = "P";
    var doubleOtherwiseHit = "Dh";
    var doubleOtherwiseStand = "Ds";
    var surrenderOtherwiseHit = "Rh";

    Tables.prototype.hardTable = [
        [hit, hit, hit, hit, hit, hit, hit, hit, hit, hit],
        [hit, hit, hit, hit, hit, hit, hit, hit, hit, hit],
        [hit, hit, hit, hit, hit, hit, hit, hit, hit, hit],
        [hit, hit, hit, hit, hit, hit, hit, hit, hit, hit],
        [hit, hit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, hit, hit, hit, hit],
        [hit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, hit],
        [hit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit],
        [hit, hit, stand, stand, stand, hit, hit, hit, hit, hit],
        [hit, stand, stand, stand, stand, stand, hit, hit, hit, hit],
        [hit, stand, stand, stand, stand, stand, hit, hit, hit, hit],
        [hit, stand, stand, stand, stand, stand, hit, hit, hit, surrenderOtherwiseHit],
        [hit, stand, stand, stand, stand, stand, hit, hit, surrenderOtherwiseHit, surrenderOtherwiseHit],
        [stand, stand, stand, stand, stand, stand, stand, stand, stand, stand],
        [stand, stand, stand, stand, stand, stand, stand, stand, stand, stand],
        [stand, stand, stand, stand, stand, stand, stand, stand, stand, stand],
        [stand, stand, stand, stand, stand, stand, stand, stand, stand, stand],
        [stand, stand, stand, stand, stand, stand, stand, stand, stand, stand]];

    Tables.prototype.softTable = [
        [hit, hit, hit, doubleOtherwiseHit, doubleOtherwiseHit, hit, hit, hit, hit, hit],
        [hit, hit, hit, doubleOtherwiseHit, doubleOtherwiseHit, hit, hit, hit, hit, hit],
        [hit, hit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, hit, hit, hit, hit, hit],
        [hit, hit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, hit, hit, hit, hit, hit],
        [hit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, hit, hit, hit, hit, hit],
        [stand, doubleOtherwiseStand, doubleOtherwiseStand, doubleOtherwiseStand, doubleOtherwiseStand, stand, stand, hit, hit, hit],
        [stand, stand, stand, stand, stand, stand, stand, stand, stand, stand],
        [stand, stand, stand, stand, stand, stand, stand, stand, stand, stand],
        [stand, stand, stand, stand, stand, stand, stand, stand, stand, stand]];

    Tables.prototype.pairTable = [
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

    return Tables;

});
