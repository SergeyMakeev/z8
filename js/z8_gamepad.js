var gamepads = {};

function gamepadHandler(event, connecting) {
  var gamepad = event.gamepad;
  // Note:
  // gamepad === navigator.getGamepads()[gamepad.index]

  if (connecting) {
    gamepads[gamepad.index] = gamepad;
    log_always("GP connected");
    //var gp = navigator.getGamepads()[gamepad.index];
  } else {
    delete gamepads[gamepad.index];
    log_always("GP disconnected");
  }
}


function z8_gamepad_init()
{
    window.addEventListener("gamepadconnected", function(e) { gamepadHandler(e, true); }, false);
    window.addEventListener("gamepaddisconnected", function(e) { gamepadHandler(e, false); }, false);    
}


function is_button_pressed(b) {
    if (typeof(b) == "object") {
      return b.pressed;
    }
    return b == 1.0;
  }

function z8_update_gamepad()
{
    var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
    if (!gamepads || gamepads.length <= 0) {
        return;
    }

    var gp = gamepads[0];    

    if (gp == null) {
        return
    }

    var key_a = is_button_pressed(gp.buttons[0]); 
    var key_b = is_button_pressed(gp.buttons[1]); 
    var key_x = is_button_pressed(gp.buttons[2]); 
    var key_y = is_button_pressed(gp.buttons[3]); 

    var key_l = is_button_pressed(gp.buttons[14]); 
    var key_r = is_button_pressed(gp.buttons[15]); 
    var key_u = is_button_pressed(gp.buttons[12]); 
    var key_d = is_button_pressed(gp.buttons[13]); 


    var val = 0;
    if (key_a) {
        val = val | 16;
    }
    if (key_b) {
        val = val | 32;
    }
    if (key_x) {
        val = val | 64;
    }
    if (key_y) {
        val = val | 128;
    }
    if (key_l) {
        val = val | 1;
    }
    if (key_r) {
        val = val | 2;
    }
    if (key_u) {
        val = val | 4;
    }
    if (key_d) {
        val = val | 8;
    }

    // gamepad port #10
    _s(cpu.state.ports[10], val);


/*
    for(var i = 0; i < gp.buttons.length; i++) {
        if (is_button_pressed(gp.buttons[i])) {
            log_always("BTN: " + i);
        }

    }
*/
}