


class Z8_KEYBOARD_STATE {

    constructor() {
        
        this.p = [];

        for(var i = 0; i < 10; i++) {
            this.p.push(0);
        }

        this.p[0] = 0;  // 1 2 3 4 5 6 
        this.p[1] = 0;  // 7 8 9 0 - =
        this.p[2] = 0;  // Q W E R T Y
        this.p[3] = 0;  // U I O P [ ]
        this.p[4] = 0;  // A S D F G H
        this.p[5] = 0;  // J K L ; ' \
        this.p[6] = 0;  // LSHIFT Z X C V B
        this.p[7] = 0;  // N M , . / RSHIFT
        this.p[8] = 0;  // LCTRL RCTRL LALT RALT SPACE ENTER
        this.p[9] = 0; // LEFT RIGHT UP DOWN ESC ~

    }
}



var keyboard = new Z8_KEYBOARD_STATE();


function z8_update_keyboard()
{
    for(var i = 0; i < 10; i++) {

        var v = _g(cpu.state.ports[i]);
        if (v != keyboard.p[i]) {
            _s(cpu.state.ports[i], keyboard.p[i]);
        }
    }
}

function z8_keycode_to_index(event_code) {
    switch(event_code) {
        case "Digit1":
            return [0, 0];
        case "Digit2":
            return [0, 1];
        case "Digit3":
            return [0, 2];
        case "Digit4":
            return [0, 3];
        case "Digit5":
            return [0, 4];
        case "Digit6":
            return [0, 5];

        case "Digit7":
            return [1, 0];
        case "Digit8":
            return [1, 1];
        case "Digit9":
            return [1, 2];
        case "Digit0":
            return [1, 3];
        case "Minus":
            return [1, 4];
        case "Equal":
            return [1, 5];

        case "KeyQ":
            return [2, 0];
        case "KeyW":
            return [2, 1];
        case "KeyE":
            return [2, 2];
        case "KeyR":
            return [2, 3];
        case "KeyT":
            return [2, 4];
        case "KeyY":
            return [2, 5];

        case "KeyU":
            return [3, 0];
        case "KeyI":
            return [3, 1];
        case "KeyO":
            return [3, 2];
        case "KeyP":
            return [3, 3];
        case "BracketLeft":
            return [3, 4];
        case "BracketRight":
            return [3, 5];

        case "KeyA":
            return [4, 0];
        case "KeyS":
            return [4, 1];
        case "KeyD":
            return [4, 2];
        case "KeyF":
            return [4, 3];
        case "KeyG":
            return [4, 4];
        case "KeyH":
            return [4, 5];

        case "KeyJ":
            return [5, 0];
        case "KeyK":
            return [5, 1];
        case "KeyL":
            return [5, 2];
        case "Semicolon":
            return [5, 3];
        case "Quote":
            return [5, 4];
        case "Backslash":
            return [5, 5];

        case "ShiftLeft":
            return [6, 0];
        case "KeyZ":
            return [6, 1];
        case "KeyX":
            return [6, 2];
        case "KeyC":
            return [6, 3];
        case "KeyV":
            return [6, 4];
        case "KeyB":
            return [6, 5];

        case "KeyN":
            return [7, 0];
        case "KeyM":
            return [7, 1];
        case "Comma":
            return [7, 2];
        case "Period":
            return [7, 3];
        case "Slash":
            return [7, 4];
        case "ShiftRight":
            return [7, 5];

        case "ControlLeft":
            return [8, 0];
        case "ControlRight":
            return [8, 1];
        case "AltLeft":
            return [8, 2];
        case "AltRight":
            return [8, 3];
        case "Space":
            return [8, 4];
        case "Enter":
            return [8, 5];

        case "ArrowLeft":
            return [9, 0];
        case "ArrowRight":
            return [9, 1];
        case "ArrowUp":
            return [9, 2];
        case "ArrowDown":
            return [9, 3];
        case "Escape":
            return [9, 4];
        case "Backquote":
            return [9, 5];
    }

    // default (unknown) key is '0'
    return [1, 3];
}

function z8_keyboard_init()
{
    // http://nokarma.org/2011/02/27/javascript-game-development-keyboard-input/index.html
    window.addEventListener('keydown', function(event) {
        //log_always("DN:" + event.code);

        var key_index = z8_keycode_to_index(event.code);
        var port = key_index[0];
        var bit = key_index[1];

        //log_always(port);
        //log_always(bit);

        var bits = (1 << bit);
        
        //log_always(bits);

        var val = keyboard.p[port];
        val = val | bits;
        keyboard.p[port] = val;

    }, false);


    window.addEventListener('keyup', function(event) {
        //log_always("UP:" + event.code);

        var key_index = z8_keycode_to_index(event.code);
        var port = key_index[0];
        var bit = key_index[1];

        //log_always(port);
        //log_always(bit);

        var bits = ~(1 << bit);

        //log_always(bits);

        var val = keyboard.p[port];
        val = val & bits;
        keyboard.p[port] = val;

    }, false);

     
        
}