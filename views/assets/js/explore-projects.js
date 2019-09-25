var selectGame = $("#selectGame");
var game = $("#game");
var authoring = $("#authoring");
var both = $("#both");
var buildBtn = $('#buildBtn');
var buildOption = $("input[name=buildOption]");
var operationContainer = $("#operationContainer");

console.log(groupArray);

selectGame.on('change', function(e) {

    var index = parseInt(e.target.value);

    game.attr('value', groupArray[index].game);
    authoring.attr('value', groupArray[index].authoring);
    both.attr('value', groupArray[index].game + '|' +groupArray[index].authoring);
    operationContainer.show();

});

buildOption.on('change', function(e) {
    buildBtn.prop('disabled', false);
});