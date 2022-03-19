$(document).ready(function () {
    $('.instructionBtn').on("click", function () {
        showDiv('instructions');
    });

    $('.close').on("click", function () {
        closeDiv('instructions');
    });

    function closeDiv(id) {
        $('#' + id).fadeOut("slow");
    }

    function showDiv(id) {
        $('#' + id).fadeIn("slow");
    }
});