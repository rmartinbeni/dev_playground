    
    var upPressed = false;
    var downPressed = false;
    var wPressed = false;
    var sPressed = false;

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler(e) {
        if (e.keyCode == 38) {
            upPressed = true;
        } else if (e.keyCode == 40) {
            downPressed = true;
        } else if (e.keyCode == 87) {
            wPressed = true;
        } else if (e.keyCode == 83) {
            sPressed = true;
        }
    }

    function keyUpHandler(e) {
        if (e.keyCode == 38) {
            upPressed = false;
        } else if (e.keyCode == 40) {
            downPressed = false;
        } else if (e.keyCode == 87) {
            wPressed = false;
        } else if (e.keyCode == 83) {
            sPressed = false;
        }
    }