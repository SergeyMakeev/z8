

function getParam(param){
    return new URLSearchParams(window.location.search).get(param);
  }

var lsName = "z8_source";

function get_ls_storage_name() {
    return lsName;
}

function copy_program_to_ls_if_need(forceLoad) {

    var codeUrl = getParam("code");
    if (codeUrl) {

        log_always("code: " + codeUrl);

        if (ide_supports_ls()) {

            var src_text = localStorage.getItem(get_ls_storage_name());
            if (src_text && forceLoad == false) {
                // there is something already in local storage
                log_always("Can't load from URL. LS '" + get_ls_storage_name() + "' already contain something.");
                return;
            }
                fetch(codeUrl)
                .then(function(response) {
                response.text().then(function(text) {
                    // text;

                    var editor = ace.edit("editor");
                    editor.session.setValue(text, -1);
                });
                });
        } else
        {
            log_always("Can't load from URL. LS doesn't supported.");
        }
    }
}

function create_ide() {

    // index.html?ls=z8_tutorial01&code=tutorials/tutorial01.z8

    var lsNameLocal = getParam("ls");
    if (lsNameLocal) {
        lsName = lsNameLocal;
    }

    log_always("ls: " + get_ls_storage_name());

    var debug_log = ace.edit("debug_log", {
        theme: "ace/theme/dracula",
        mode: "ace/mode/z8_debug",
        wrap: true,
        autoScrollEditorIntoView: true,
        highlightActiveLine: false,
        readOnly: true
    });


    debug_log.renderer.setShowGutter(false);

    var editor = ace.edit("editor", {
        theme: "ace/theme/dracula",
        mode: "ace/mode/z8",
        wrap: true,
        autoScrollEditorIntoView: true
    });

    copy_program_to_ls_if_need(false);

    // load save source code
    if (ide_supports_ls()) {
        console.log("load");
        src = localStorage.getItem(get_ls_storage_name());
        if (src)
        {
            editor.session.setValue(src, -1);
        }
    }

    editor.session.setAnnotations([{
    row: 1,
    column: 0,
    text: "Error Message", // Or the Json reply from the parser 
    type: "error" // also warning and information
    }]);  
    
    editor.session.selection.on('changeCursor', function(e) {
        var cursor = editor.session.selection.getCursor();
        console.log("changeCursor x:" + cursor.column + ", y:" + cursor.row);
    });    

    editor.session.selection.on('changeSelection', function(e) {
        //console.log("changeSelection");
    });    

    editor.on('change', function(e) {
        var src = editor.getValue();
        ide_onupdate(src);
    });    

    ide_init_buttons();
    ide_init_views();
    ide_update_view_type('dec'); 

    editor.commands.addCommand({
        name: 'saveFile',
        bindKey: {
            win: 'Ctrl-S',
            mac: 'Command-S',
            sender: 'editor|cli'
        },
        exec: function(env, args, request) {
            ide_save();
        }
    });      

    editor.commands.addCommand({
        name: 'openFile',
        bindKey: {
            win: 'Ctrl-O',
            mac: 'Command-O',
            sender: 'editor|cli'
        },
        exec: function(env, args, request) {
            ide_open();
        }
    });      
}

function ide_supports_ls() {
    return typeof(Storage)!== 'undefined';
  }

function ide_save_to_localstorage(text) {
    if (!ide_supports_ls()) {
        return;
    }

    console.log("save");
    localStorage.setItem(get_ls_storage_name(), text);
}

function ide_onupdate(text) {
    console.log("change");
    ide_save_to_localstorage(text)

    //save everything to local storage
}


function ide_get_button_state(name) {
    var btn = document.getElementById(name);
  //  log_always(btn.disabled);
    return !btn.disabled;
}

function ide_set_button_state(name, state) {
    var btn = document.getElementById(name);

    if (state == false) {
        btn.disabled = true;
    } else {
        btn.disabled = false;
    }
    
    img = btn.getElementsByTagName('img')[0];

    if (state == false) {
        img.classList.add("disabled");
    } else {
        img.classList.remove("disabled");
    }
}

function ide_init_buttons() {
    ide_set_button_state("run", true);
    ide_set_button_state("stop", false);
    ide_set_button_state("pause", false);
    ide_set_button_state("step", true);
    ide_set_button_state("step2", true);
}

function append_cpu_row(text_name, text_value) {
    var cpu_view = document.getElementById("cpu_state_view");

    var reg_row = cpu_view.insertRow(cpu_view.rows.length);

    var padding = reg_row.insertCell(0);
    padding.style.width = '20px';
    var name = reg_row.insertCell(1);
    name.style.width = '80px';
    var value = reg_row.insertCell(2);
    value.style.textAlign = "right";

    padding = reg_row.insertCell(3);
    padding.style.width = '350px';

    name.innerHTML = text_name;
    name.classList.add("reg");
    value.innerHTML = text_value;
    value.classList.add("value");
}

function ide_init_views() {

//    window.view_type = "dec";

    for(var i = 0; i < 5; i++) {
        append_cpu_row("r" + i, 0);
    }

    append_cpu_row("ip", 0);
    append_cpu_row("sp", 0);
    append_cpu_row("cr", 0); // compare result
    append_cpu_row("cycles", 0);
    append_cpu_row("state", 0);
   

    var memory_view = document.getElementById("memory_view");

    var header_row = memory_view.insertRow(memory_view.rows.length);

    for(var i = 0; i < 8; i++) {
        val = header_row.insertCell(0);
        val.innerHTML = (7 - i).toString();
        val.style.textAlign = "center";
        val.classList.add("addr");
        val.style.width = '32px';
    }

    var val = header_row.insertCell(0);
    val.innerHTML = "addr"
    val.style.width = '40px';
    val.classList.add("addr");
    
    for(var y = 0; y < 32; y++) {

        var row = memory_view.insertRow(memory_view.rows.length);

        for(var x = 0; x < 8; x++) {
            val = row.insertCell(0);
            val.innerHTML = '0';
            val.style.textAlign = "center";
            val.classList.add("value");
        }

        val = row.insertCell(0);
        val.innerHTML =  (y*8).toString();
        val.classList.add("addr");
    }


    var port_view = document.getElementById("port_view");
    var header_row = port_view.insertRow(port_view.rows.length);

    for(var i = 0; i < 8; i++) {
        val = header_row.insertCell(0);
        val.innerHTML = (7 - i).toString();
        val.style.textAlign = "center";
        val.classList.add("addr");
        val.style.width = '32px';
    }

    var val = header_row.insertCell(0);
    val.innerHTML = "port"
    val.style.width = '40px';
    val.classList.add("addr");
    
    for(var y = 0; y < 4; y++) {

        var row = port_view.insertRow(port_view.rows.length);

        for(var x = 0; x < 8; x++) {
            val = row.insertCell(0);
            val.innerHTML = '0';
            val.style.textAlign = "center";
            val.classList.add("value");
        }

        val = row.insertCell(0);
        val.innerHTML =  (y*8).toString();
        val.classList.add("addr");
    }

    

}

function ide_update_cell_value(table, row, column, new_val, is_number) {

    if (is_number) {
        //log_always(typeof new_val)
        if (window.view_type == "hex") {
            new_val = new_val.toString(16);
            if (new_val.length < 2) {
                new_val = '0x0' + new_val;
            } else {
                new_val = '0x' + new_val;
            }
        
        } else if (window.view_type == "bin") {
            new_val = new_val.toString(2);

            if (new_val.length < 8) {
                //new_val = "0".repeat(8 - new_val.length) + new_val;
            }

            new_val = new_val + "b";
        } else if (window.view_type == "ascii") {
            if (new_val >= 32 && new_val < 128) {
                new_val = "'" + String.fromCharCode(new_val) + "'";
            } else {
                new_val = "?";
                /*
                new_val = new_val.toString(16);
                if (new_val.length < 2) {
                    //new_val = '0' + new_val;
                }
                new_val = '0x' + new_val;
                */
            }
        } else if (window.view_type == "sgn") {
            new_val = byte_to_signed(new_val);
        }

    }

    if (table.rows[row].cells[column].classList.contains("changed1")) {
        table.rows[row].cells[column].classList.remove("changed1");
        table.rows[row].cells[column].classList.add("changed2");
    } else {
        table.rows[row].cells[column].classList.remove("changed2");
        table.rows[row].cells[column].classList.add("changed1");
    }

    table.rows[row].cells[column].innerHTML = new_val;
}

function ide_update_port_views(state, force) {
    var port_view = document.getElementById("port_view");

    for(var y = 0; y < 4; y++) {
        for(var x = 0; x < 8; x++) {
            if (_d(state.ports[y*8+x]) || force == true) {
               // log_always("port" + (y*8+x).toString() + " = " + _g(state.ports[y*8+x]));
                ide_update_cell_value(port_view, (y+1), (x+1), _g(state.ports[y*8+x]), true);
            }
        }
    }
}



function should_refresh_memory_value(state, addr) {
    return _d(state.memory[addr]);
}

function read_memory_value(state, addr) {
    return _g(state.memory[addr]);
}


function ide_update_memory_views(state, force) {
    var memory_view = document.getElementById("memory_view");

    for(var y = 0; y < 32; y++) {
        for(var x = 0; x < 8; x++) {
            var addr = y*8+x;
            if (should_refresh_memory_value(state, addr) || force == true) {
                ide_update_cell_value(memory_view, (y+1), (x+1), read_memory_value(state, addr), true);
            }
        }
    }
}


function ide_update_views(state, force) {

    var cpu_view = document.getElementById("cpu_state_view");

    for(var i = 0; i < 5; i++) {
        var reg = _g(state.registers[i]);
        if (_d(state.registers[i]) || force == true) {
            ide_update_cell_value(cpu_view, i, 2, reg, true);
        }
    }


    if (_d(state.ip) || force == true) {
        ide_update_cell_value(cpu_view, 5, 2, (_g(state.ip) + 1), true);
    }

    if (_d(state.sp) || force == true) {
        ide_update_cell_value(cpu_view, 6, 2, _g(state.sp), true);
    }

    if (_d(state.cr) || force == true) {
        ide_update_cell_value(cpu_view, 7, 2, _g(state.cr));
    }

    ide_update_cell_value(cpu_view, 8, 2, state.cycle, true);
    ide_update_cell_value(cpu_view, 9, 2, state.last_step_result);

    ide_update_memory_views(state, force);
    ide_update_port_views(state, force);
   
}


function ide_update_view_type(view_type) {
    if (window.view_type == view_type) {
        return;
    }

    log_always("REFRESH");

    window.view_type = view_type;
    ide_update_views(cpu.state, true);
}

function ide_handleFiles(files) {

    if (files.length < 1) {
        return;
    }

    var fr = new FileReader();
    fr.onload = function(e) {
        var src = e.target.result;
        log_always(src);

        var editor = ace.edit("editor");
        editor.session.setValue(src, -1)
    };
    fr.readAsText(files[0]);    
}

function ide_open() {

    var codeUrl = getParam("code");
    if (codeUrl) {
        copy_program_to_ls_if_need(true);
        return;
    }

    var input = document.getElementById('file_dialog');
    input.click();

//    log_always(document.getElementById('file_dialog').files[0]);
}


function ide_save() {

    var editor = ace.edit("editor");
    var src = editor.getValue();   
   
    download(src, "program.z8", "text/plain");
}