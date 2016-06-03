BlackJack.service('surrenderAgainst2to10', function () {

    var hit = "May I suggest you to Hit, sir?";
    var stand = "If I was in your place, I would Stand";
    var split = "Can I just say you should Split";
    var doubleOtherwiseHit = "You should Double otherwise Hit, no doubt about it";
    var doubleOtherwiseStand = "A wise man once said Double otherwise stand";
    var surrenderOtherwiseHit = "You have no choice but to Surrender otherwise Hit";


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
        [hit, hit, split, split, split, split, hit, hit, hit, hit],
        [hit, hit, split, split, split, split, hit, hit, hit, hit],
        [hit, hit, hit, hit, hit, hit, hit, hit, hit, hit],
        [doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, doubleOtherwiseHit, hit, hit],
        [hit, split, split, split, split, hit, hit, hit, hit, hit],
        [split, split, split, split, split, split, hit, hit, hit, hit],
        [split, split, split, split, split, split, split, split, split, split],
        [split, split, split, split, split, stand, split, split, stand, stand],
        [stand, stand, stand, stand, stand, stand, stand, stand, stand, stand],
        [split, split, split, split, split, split, split, split, split, split]];

});
