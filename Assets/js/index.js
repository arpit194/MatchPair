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

    //To Close pop ups
    function closeDiv(id) {
        $('#' + id).fadeOut("slow");
    }

    //To display pop ups
    function showDiv(id) {
        $('#' + id).fadeIn("slow");
    }

    //To add cards to the game container
    function addCards() {
        $('#row1').html("");
        $('#row2').html("");
        cardValues = ["python", "node-js", "java", "google", "apple", "microsoft", "python", "node-js", "java", "google", "apple", "microsoft"];
        cardValues.sort(() => Math.random() - 0.5);
        cardDict = {};
        for (let i = 0; i < 6; i++) {
            let temp = cardValues.pop();
            cardDict["1" + i] = temp;
            //Append cards to the first row
            $('#row1').append(`
                <div class="cardContainer">
                    <div class="gameCard" id="1` + i + temp + `">
                        <div class="card__face card__face--front"></div>
                        <div class="card__face card__face--back"><i class="fa-brands fa-`+ temp + `"></i></div>
                    </div>
                </div>
            `);
            temp = cardValues.pop();
            cardDict["2" + i] = temp;

            //Append cards to the second row
            $('#row2').append(`
                <div class="cardContainer">
                    <div class="gameCard" id="2` + i + temp + `">
                        <div class="card__face card__face--front"></div>
                        <div class="card__face card__face--back"><i class="fa-brands fa-`+ temp + `"></i></div>
                    </div>
                </div>
            `);
        }

        //When a card is clicked
        $('.gameCard').on("click", function () {
            //Start Timer
            if (!gamestarted) {
                let interval = setInterval(() => {
                    time--;
                    $('#time').html(time);
                    if (cardsMatched == 6) {
                        clearInterval(interval);
                        gameOver("Win");
                        gameOver = true;
                    }
                    else if (time == 0) {
                        clearInterval(interval);
                        gameOver("Lose");
                        gameOver = true;
                    }
                }, 1000);
                gamestarted = true;
            }

            //To flip cards
            if (flippedCount < 2 && jQuery.inArray($(this)[0].id, flippedCards) == -1 && gameOver) {
                $(this).addClass("is-flipped");
                flippedCards.push($(this)[0].id);
                flippedCount++;
                //When two cards are already flipped
                if (flippedCount == 2) {
                    let matched = checkMatch();
                    if (matched) {
                        setTimeout(() => {
                            points++;
                            $("#" + flippedCards[0]).addClass("is-matched");
                            $("#" + flippedCards[1]).addClass("is-matched");
                            flippedCards = [];
                            flippedCount = 0;
                            cardsMatched++;
                        }, 500);
                    }
                    else {
                        setTimeout(() => {
                            $("#" + flippedCards[0]).removeClass("is-flipped");
                            $("#" + flippedCards[1]).removeClass("is-flipped");
                            flippedCards = [];
                            flippedCount = 0;
                        }, 1000);
                    }
                }
            }
        });
    }

    //To check if cards are matching
    function checkMatch() {
        if (flippedCards[0].substring(2) == flippedCards[1].substring(2)) {
            return true;
        }
        else {
            return false;
        }
    }

    //To display game results
    function gameOver(result) {
        alert("You" + result)
    }
});