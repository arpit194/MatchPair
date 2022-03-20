$(document).ready(function () {
    //variables
    let flippedCount = 0;
    let points = 0;
    let flippedCards = [];
    let cardValues = [];
    let cardDict = {};
    let time = 30;
    let gamestarted = false;
    let gameOver = true;
    let cardsMatched = 0;
    let difficulty = "Easy";

    $('#time').html(time);

    //Event Handlers 
    $('.instructionBtn').on("click", function () {
        showDiv('instructions');
    });

    $('.settingBtn').on("click", function () {
        showDiv('settings');
    });

    $('.close').on("click", function () {
        closeDiv('instructions');
        closeDiv('settings');
    });

    $('#instructions').on("click", function () {
        closeDiv('instructions');
    });

    $('#settings').on("click", function () {
        closeDiv('settings');
    });
});