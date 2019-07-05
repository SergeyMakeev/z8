
const error_jmptarget_01 = "Bad operand #{0}, Label name starts from invalid character ({1}). Label name should start from alphabetic character.";
const error_jmptarget_02 = "Label name starts from invalid character ({0}). Label name should start from alphabetic character.";
const error_jmptarget_03 = "Invalid label name ({0}). Label name should contain alphanumeric character only.";
const error_jmptarget_04 = "Label name can't be empty.";
const error_jmptarget_05 = "Label name must be unique. Label '{0}' was already declared at line {1}.";
const error_jmptarget_06 = "Label '{0}' is not declared.";

const error_unknown_cmd_01 = "Unknown command '{0}'";

const error_prep_01 = "Invalid preprocessor definition. No value found.";



const error_string_01 = "Bad operand #{0}, Invalid quotes in a string literal.";

const error_operand_01 = "Unknown operand #{0}, '{1}'. Expected register or numeric constant.";
const error_operand_02 = "Error operand #{0}, invalid character ('{1}') inside a binary constant.";
const error_operand_03 = "Error operand #{0}, invalid character ('{1}') inside a decimal constant.";
const error_operand_04 = "Error operand #{0}, invalid character ('{1}') inside a hexadecimal constant.";
const error_operand_05 = "Error operand #{0}, value ({1}) is outside a valid range 0..255";
const error_operand_06 = "Operand #{0} should be a register.";
const error_operand_07 = "Error operand #{0}, invalid character constant ('{1}').";
const error_operand_08 = "Error operand #{0}, value ({1}) is outside a valid signed range -128..127";


const error_operands_num = "{0} instruction requires {1} operands. {2} operands found.";
const error_operands_num_print = "PRINT instruction requires 1 or 2 operands. 0 operands found.";

const error_runtime_header = "Execution error.\n\n{8}\n\n  R0 = {0}\n  R1 = {1}\n  R2 = {2}\n  R3 = {3}\n  R4 = {4}\n\n  SP = {6}\n  ZF = {7}\n\n  IP = {5} (Line: {9})\n";

const error_runtime_01 = "Unsupported opcode '{0}'";
const error_runtime_02 = "Divizion by zero.";
const error_runtime_03 = "Control transfer to existing address.";
const error_runtime_04 = "Bad operand.";
const error_runtime_05 = "Stack overflow";
const error_runtime_06 = "Control transfer to invalid address {0}";
const error_runtime_07 = "Stack underflow";

const error_terminated = "Execution terminated.\n\n  R0 = {0}\n  R1 = {1}\n  R2 = {2}\n  R3 = {3}\n  R4 = {4}\n\n  SP = {6}\n  CR = {7}\n\n  IP = {5} (Line: {8})\n\nCycles: {9}\n";


const dbg_print_01 = "> =========== Build started ===========";
const dbg_print_02 = "> ========== Build succeeded ==========";
const dbg_print_03 = "> ============ Build failed ===========";
const dbg_print_04 = "> Error line {0}: {1}\n";
const dbg_print_05 = "> Exception on line {0}: {1}";
const dbg_print_06 = "> Finished on line {0} after {1} cycles has been passed.";
const dbg_print_07 = "line: {0}: \"{1}{2}\"";



const cpu_cycles_per_frame = 2048;
const cpu_frames_per_second = 25;


function debug_log_clear() {
    var debug_log = ace.edit("debug_log");
    debug_log.session.setValue("", -1)
}

function debug_log_print_impl(msg) {
    var debug_log = ace.edit("debug_log");
    debug_log.session.insert({
        row: debug_log.session.getLength(),
        column: 0
     }, msg);
}

function debug_log_print(msg) {
    debug_log_print_impl(msg + "\n");
}

function log_message(msg) {
    //console.log(msg);
}

function log_error(msg) {
    console.log(msg);
}

function log_always(msg) {
   // console.log(msg);
}

function wrap_to_byte(v) {
    ret = v % 256;
    if (ret < 0)
        ret = 256 + ret;
    return ret;
}

function is_valid_char(v) {
    var charCode = v.charCodeAt(0);
    if (charCode >= 32 && charCode < 128) {
        return true;
    }
    return false;
}

function clamp_to_byte(v) {
    var ret = v;
    if (ret < 0)
        ret = 0;
    if (ret > 255)
        ret = 255;

    return ret;
}


function signed_to_byte(v) {
    if (v < -128)
        v = -128;
    if (v > 127)
        v = 127;

    if (v < 0) {
        v = (256 + v);
    }

    return v;
}

function byte_to_signed(v) {
    // -128..127
    v = clamp_to_byte(v);
    if (v > 127) {
        v = -(256 - v);
    }
    return v;
}

String.prototype.format = String.prototype.format = function() {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};


// create
function _c(v) {
    var state_var = {};
    state_var.v = v;
    state_var.dirty = true;
    return state_var;
}

// set
function _s(state_var, v) {
    state_var.v = v;
    state_var.dirty = true;
}

// is dirty ? (will reset dirty flag after query)
function _d(state_var) {
    var d = state_var.dirty;
    state_var.dirty = false; 
    return d;
}


// get
function _g(state_var) {
    return state_var.v;
}

// touch (will be updated in UI)
function _t(state_var) {
    state_var.dirty = true; 
}

class Z8STATE {

    constructor() {

        this.memory = [];
        for(var i = 0; i < 256; i++) {
            this.memory.push(_c(0));
        }        

        this.registers = [];
        for(var i = 0; i < 5; i++) {
            this.registers.push(_c(0));
        }        

        this.ports = [];
        for(var i = 0; i < 32; i++) {
            this.ports.push(_c(0));
        }        

        // border color
        _s(this.ports[11], (7 << 4) | 15);

        
        // screen colors
        for(var i = 13; i < 19; i++) {
            _s(this.ports[i], (9 << 4) | 9);   // green + green
        }        

        // sprites (none)
        _s(this.ports[21], 255);
        _s(this.ports[24], 255);
        _s(this.ports[27], 255);
        _s(this.ports[30], 255);



        this.ip = _c(0);
        this.sp = _c(255);
        this.cr = _c('eq');

        this.last_step_result = 'reset';

        this.instruction_cycles_passed = 0;
        this.cycle = 0;

        this.paused = false;
        this.stopped = true;
    }

    soft_stop()
    {
        log_always("SOFT STOP");
        this.instruction_cycles_passed = 0;
        this.paused = false;
        this.stopped = true;
    }
}

class Z8CPU {
    constructor() {
        this.commands = [];
        this.compile_errors = [];
        this.compile_errors_text = "";
        this.labels = {};
        this.state = new Z8STATE();
        this.source = "";
        this.definitions = []; 
    }

    emit_error(line_num, msg) {

        log_always("ERROR: line#" + line_num + ", " + msg);

        var err = {
            row: line_num,
            column: 0,
            text: msg,
            type: "error" // error/warning/information
        };   

        this.compile_errors.push(err)

        this.compile_errors_text += dbg_print_04.format((line_num+1), msg);
    }

    get_register_operand(param) {
        if (param == "r0" || param == "r1" || param == "r2" || param == "r3" || param == "r4")
        {
            log_message("This is register!");
            log_message(param);
            return { type: "reg", reg_num: parseInt(param.charAt(1)) };
        }
        return null;
    }

    get_jmp_target(line_num, param_index, param) {
        param = param.toLowerCase();

        var first = param.charAt(0);
        if (!first.match(/[a-z]/i))
        {
            this.emit_error(line_num, error_jmptarget_01.format(param_index, first));
            return {};
        }

        return { type: "label", jmp_target: param };
    }

    get_string_operand(line_num, param_index, param) {
        if (param.startsWith('"') && param.endsWith('"'))
        {
            var value = param.slice(1, -1);
            if (value.indexOf('"') != -1)
            {
                this.emit_error(line_num, error_string_01.format(param_index));
                return {};
            }

            return { type: "string", str_val: value };
        }

        return null;
    }

    get_operand(line_num, param_index, param) {
        var reg = this.get_register_operand(param);
        if (reg) {
            return reg;
        }

        if (param.startsWith("'") && param.endsWith("'") && param.length == 3)
        {
            var chr = param.charAt(1);
            //log_always(chr);
            if (is_valid_char(chr) == false)
            {
                this.emit_error(line_num, error_operand_07.format(param_index, chr));
                return {};
            }

            var charCode = param.charCodeAt(1);
            return { type: "const", const_val: charCode };
        }

        var is_negative = false;
        var radix = 10;

        if (param.startsWith('-'))
        {
            param = param.slice(1);
            is_negative = true;
        }

        if (param.startsWith('0x'))
        {
            param = param.slice(2);
            radix = 16;
        }

        if (param.endsWith('h'))
        {
            param = param.slice(0, -1);
            radix = 16;
        }

        if (param.endsWith('b'))
        {
            param = param.slice(0, -1);
            radix = 2;
        }

        var tmp_param = param.toLowerCase();
        for (var i = 0; i < tmp_param.length; i++) {
            var chr = tmp_param.charAt(i);
            if (chr != '0' && chr != '1' && chr != '2' && chr != '3' && chr != '4' && chr != '5' && chr != '6' && chr != '7' && chr != '8' && chr != '9' &&
                chr != 'a' && chr != 'b' && chr != 'c' && chr != 'd' && chr != 'e' && chr != 'f') {
                    this.emit_error(line_num, error_operand_01.format(param_index, param));
                return {};
            }
        }            

        if (radix == 2) {
            for (var i = 0; i < param.length; i++) {
                var chr = param.charAt(i);
                if (chr != '0' && chr != '1') {
                    this.emit_error(line_num, error_operand_02.format(param_index, chr));
                    return {};
                }
              }            
        }

        if (radix == 10) {

            for (var i = 0; i < param.length; i++) {
                var chr = param.charAt(i);
                if (chr != '0' && chr != '1' && chr != '2' && chr != '3' && chr != '4' && chr != '5' && chr != '6' && chr != '7' && chr != '8' && chr != '9') {
                    this.emit_error(line_num, error_operand_03.format(param_index, chr));
                    return {};
                }
              }            
        }

        if (radix == 16) {
            param = param.toLowerCase();
            for (var i = 0; i < param.length; i++) {
                var chr = param.charAt(i);
                if (chr != '0' && chr != '1' && chr != '2' && chr != '3' && chr != '4' && chr != '5' && chr != '6' && chr != '7' && chr != '8' && chr != '9' &&
                    chr != 'a' && chr != 'b' && chr != 'c' && chr != 'd' && chr != 'e' && chr != 'f') {
                    this.emit_error(line_num, error_operand_04.format(param_index, chr));
                    return {};
                }
              }            
        }
        
        var value = parseInt(param, radix);
        if (is_negative) {
            value = -value;
            if (value < -128 || value > 127) {
                this.emit_error(line_num, error_operand_08.format(param_index, value));
                return {};
            }
            value = signed_to_byte(value);
        }

        if (value < 0 || value > 255) {
            this.emit_error(line_num, error_operand_05.format(param_index, value));
            return {};
        }

        return { type: "const", const_val: value };
    }

    emit_runtime_error(line_num, msg) {
        var editor = ace.edit("editor");

        var s = this.state;
        var r = s.registers;

        var text = error_runtime_header.format(_g(r[0]), _g(r[1]), _g(r[2]), _g(r[3]), _g(r[4]), _g(s.ip), _g(s.sp), _g(s.cr), msg, (_g(s.ip)+1));

        log_always(text);

        editor.session.setAnnotations([{
            row: line_num,
            column: 0,
            text: text,
            type: "error"
            } ]);  

        debug_log_print(dbg_print_05.format((line_num+1), msg));

    }

    emit_terminate(line_num) {

        // force update terminal (to display current results)
        z8_update_terminal();

        var editor = ace.edit("editor");

        var s = this.state;
        var r = s.registers;

        var text = error_terminated.format(_g(r[0]), _g(r[1]), _g(r[2]), _g(r[3]), _g(r[4]), _g(s.ip), _g(s.sp), _g(s.cr), (_g(s.ip)+1), s.cycle);

        editor.session.setAnnotations([{
            row: line_num,
            column: 0,
            text:  text,
            type: "warning"
            } ]);  

        debug_log_print(dbg_print_06.format((line_num+1), s.cycle));
    }


    emit_opcode(line_num, opcode, p0, p1) {
        /*
        log_message("line: " + line_num);
        log_message("opcode: " + opcode);
        if (p0)
            log_message(p0);
        if (p1)
            log_message(p1);

        */

        var cmd = {
            line: line_num,
            op: opcode,
            param0: p0,
            param1: p1
        };

        this.commands.push(cmd);
    }

    do_preprocessor(line) {

        for(var i = 0; i < this.definitions.length; i++)
        {
            //log_always(this.definitions[i].definition);
            //log_always(this.definitions[i].value);

            line = line.replace(this.definitions[i].def, this.definitions[i].val);
        }
        return line;
    }

    prepare_preprocessor(line_num, line) {

        if (!line) {
            return;
        }

        // trim spaces from begin/end
        line = line.trim(); 

        if (!line.startsWith('#def')) {
            return;
        }

        // remove all double spaces
        while(line.indexOf('  ')!=-1) line.replace('  ',' '); 

        line = line.slice(5);
        var n = line.indexOf(' ');
        if (n < 0) {
            this.emit_error(line_num, error_prep_01);
            return "//#def";
        }

        var definition = line.slice(0, n);
        var value = line.slice(n+1);

        log_message("#def - found");
        log_message("'" + definition  + "'");
        log_message("'" + value  + "'");

        this.definitions.push({
            def: definition,
            val: value
        });

        return "//#def";
    }

    compile_line(line_num, line) {

        log_message("COMPILE LINE");
        log_message(line);

        // trim spaces from begin/end
        line = line.trim(); 

        if (!line) {
            // empty line
            this.emit_opcode(line_num, "-", null, null);
            log_message("EMPTY LINE");
            return;
        }

        if (line.startsWith('//')) {
            // comment
            this.emit_opcode(line_num, "-", null, null);
            log_message("COMMENT LINE");
            return;
        }
        
        // remove all double spaces
        while(line.indexOf('  ') != -1) {
            line = line.replace('  ',' '); 
        }

        if (line.endsWith(':')) {
            log_message("LABEL LINE");
            var label_name = line.slice(0, -1);
            label_name = label_name.toLowerCase();

            if (label_name) {
                if (label_name.match(/^[a-z0-9_]+$/i) !== null) {

                    var first = label_name.charAt(0);
                    if (!first.match(/[a-z_]/i))
                    {
                        this.emit_error(line_num, error_jmptarget_02.format(first));
                        return;
                    }
                            
                    this.emit_opcode(line_num, "&", { type: "label", jmp_target: label_name }, null);
                    return;
                }
    
                this.emit_error(line_num, error_jmptarget_03.format(label_name));
                return;
            } else {
                this.emit_error(line_num, error_jmptarget_04);
                return;
            }
        }
        
        var cmd = line.split(/[ ,]+/);

        cmd[0] = cmd[0].toLowerCase();
        log_message("CMD: " + cmd[0]);
        switch(cmd[0]) {

            // move, load, store
            case "mov":
                if (cmd.length != 3) {
                    this.emit_error(line_num, error_operands_num.format("MOV", 2, (cmd.length - 1)));
                    return;
                }
                log_message("+mov");
                log_message(cmd[1]);
                log_message(cmd[2]);
                var param0 = this.get_register_operand(cmd[1]);
                if (param0 == null) {
                    log_message("ERR!");
                    this.emit_error(line_num, error_operand_06.format(1));
                    return;
                }
                var param1 = this.get_operand(line_num, 2, cmd[2]);
                log_message("param0");
                log_message(param0);
                log_message("param1");
                log_message(param1);

                this.emit_opcode(line_num, cmd[0], param0, param1);
                break;
            case "ld":
                if (cmd.length != 3) {
                    this.emit_error(line_num, error_operands_num.format("LD", 2, (cmd.length - 1)));
                    return;
                }
                var param0 = this.get_register_operand(cmd[1]);
                if (param0 == null) {
                    this.emit_error(line_num, error_operand_06.format(1));
                    return;
                }
                var param1 = this.get_operand(line_num, 2, cmd[2]);
                this.emit_opcode(line_num, cmd[0], param0, param1);
                break;
            case "st":
                if (cmd.length != 3) {
                    this.emit_error(line_num, error_operands_num.format("ST", 2, (cmd.length - 1)));
                    return;
                }
                var param0 = this.get_operand(line_num, 2, cmd[1]);
                var param1 = this.get_operand(line_num, 2, cmd[2]);
                this.emit_opcode(line_num, cmd[0], param0, param1);
                break;

            // math
            case "ads":
                if (cmd.length != 3) {
                    this.emit_error(line_num, error_operands_num.format("ADS", 2, (cmd.length - 1)));
                    return;
                }
                var param0 = this.get_register_operand(cmd[1]);
                if (param0 == null) {
                    this.emit_error(line_num, error_operand_06.format(1));
                    return;
                }
                var param1 = this.get_operand(line_num, 2, cmd[2]);
                this.emit_opcode(line_num, cmd[0], param0, param1);
                break;
            case "sbs":
                if (cmd.length != 3) {
                    this.emit_error(line_num, error_operands_num.format("SBS", 2, (cmd.length - 1)));
                    return;
                }
                var param0 = this.get_register_operand(cmd[1]);
                if (param0 == null) {
                    this.emit_error(line_num, error_operand_06.format(1));
                    return;
                }
                var param1 = this.get_operand(line_num, 2, cmd[2]);
                this.emit_opcode(line_num, cmd[0], param0, param1);
                break;
            case "add":
                if (cmd.length != 3) {
                    this.emit_error(line_num, error_operands_num.format("ADD", 2, (cmd.length - 1)));
                    return;
                }
                var param0 = this.get_register_operand(cmd[1]);
                if (param0 == null) {
                    this.emit_error(line_num, error_operand_06.format(1));
                    return;
                }
                var param1 = this.get_operand(line_num, 2, cmd[2]);
                this.emit_opcode(line_num, cmd[0], param0, param1);
                break;
            case "sub":
                if (cmd.length != 3) {
                    this.emit_error(line_num, error_operands_num.format("SUB", 2, (cmd.length - 1)));
                    return;
                }
                var param0 = this.get_register_operand(cmd[1]);
                if (param0 == null) {
                    this.emit_error(line_num, error_operand_06.format(1));
                    return;
                }
                var param1 = this.get_operand(line_num, 2, cmd[2]);
                this.emit_opcode(line_num, cmd[0], param0, param1);
                break;
            case "mul":
                if (cmd.length != 3) {
                    this.emit_error(line_num, error_operands_num.format("MUL", 2, (cmd.length - 1)));
                    return;
                }
                var param0 = this.get_register_operand(cmd[1]);
                if (param0 == null) {
                    this.emit_error(line_num, error_operand_06.format(1));
                    return;
                }
                var param1 = this.get_operand(line_num, 2, cmd[2]);
                this.emit_opcode(line_num, cmd[0], param0, param1);
                break;
            case "div":
                if (cmd.length != 3) {
                    this.emit_error(line_num, error_operands_num.format("DIV", 2, (cmd.length - 1)));
                    return;
                }
                var param0 = this.get_register_operand(cmd[1]);
                if (param0 == null) {
                    this.emit_error(line_num, error_operand_06.format(1));
                    return;
                }
                var param1 = this.get_operand(line_num, 2, cmd[2]);
                this.emit_opcode(line_num, cmd[0], param0, param1);
                break;
            case "mod":
                if (cmd.length != 3) {
                    this.emit_error(line_num, error_operands_num.format("MOD", 2, (cmd.length - 1)));
                    return;
                }
                var param0 = this.get_register_operand(cmd[1]);
                if (param0 == null) {
                    this.emit_error(line_num, error_operand_06.format(1));
                    return;
                }
                var param1 = this.get_operand(line_num, 2, cmd[2]);
                this.emit_opcode(line_num, cmd[0], param0, param1);
                break;

            // bit shifts
            case "sl":
                if (cmd.length != 3) {
                    this.emit_error(line_num, error_operands_num.format("SL", 2, (cmd.length - 1)));
                    return;
                }
                var param0 = this.get_register_operand(cmd[1]);
                if (param0 == null) {
                    this.emit_error(line_num, error_operand_06.format(1));
                    return;
                }
                var param1 = this.get_operand(line_num, 2, cmd[2]);
                this.emit_opcode(line_num, cmd[0], param0, param1);
                break;
            case "sr":
                if (cmd.length != 3) {
                    this.emit_error(line_num, error_operands_num.format("SR", 2, (cmd.length - 1)));
                    return;
                }
                var param0 = this.get_register_operand(cmd[1]);
                if (param0 == null) {
                    this.emit_error(line_num, error_operand_06.format(1));
                    return;
                }
                var param1 = this.get_operand(line_num, 2, cmd[2]);
                this.emit_opcode(line_num, cmd[0], param0, param1);
                break;
                
            // bit math
            case "and":
                if (cmd.length != 3) {
                    this.emit_error(line_num, error_operands_num.format("AND", 2, (cmd.length - 1)));
                    return;
                }
                var param0 = this.get_register_operand(cmd[1]);
                if (param0 == null) {
                    this.emit_error(line_num, error_operand_06.format(1));
                    return;
                }
                var param1 = this.get_operand(line_num, 2, cmd[2]);
                this.emit_opcode(line_num, cmd[0], param0, param1);
                break;
            case "or":
                if (cmd.length != 3) {
                    this.emit_error(line_num, error_operands_num.format("OR", 2, (cmd.length - 1)));
                    return;
                }
                var param0 = this.get_register_operand(cmd[1]);
                if (param0 == null) {
                    this.emit_error(line_num, error_operand_06.format(1));
                    return;
                }
                var param1 = this.get_operand(line_num, 2, cmd[2]);
                this.emit_opcode(line_num, cmd[0], param0, param1);
                break;
            case "xor":
                if (cmd.length != 3) {
                    this.emit_error(line_num, error_operands_num.format("XOR", 2, (cmd.length - 1)));
                    return;
                }
                var param0 = this.get_register_operand(cmd[1]);
                if (param0 == null) {
                    this.emit_error(line_num, error_operand_06.format(1));
                    return;
                }
                var param1 = this.get_operand(line_num, 2, cmd[2]);
                this.emit_opcode(line_num, cmd[0], param0, param1);
                break;

            // flow control
            case "tst":
                if (cmd.length != 3) {
                    this.emit_error(line_num, error_operands_num.format("TST", 2, (cmd.length - 1)));
                    return;
                }
                var param0 = this.get_register_operand(cmd[1]);
                if (param0 == null) {
                    this.emit_error(line_num, error_operand_06.format(1));
                    return;
                }
                var param1 = this.get_operand(line_num, 2, cmd[2]);
                this.emit_opcode(line_num, cmd[0], param0, param1);
                break;
            case "cmp":
                if (cmd.length != 3) {
                    this.emit_error(line_num, error_operands_num.format("CMP", 2, (cmd.length - 1)));
                    return;
                }
                var param0 = this.get_register_operand(cmd[1]);
                if (param0 == null) {
                    this.emit_error(line_num, error_operand_06.format(1));
                    return;
                }
                var param1 = this.get_operand(line_num, 2, cmd[2]);
                this.emit_opcode(line_num, cmd[0], param0, param1);
                break;
            // compare signed
            case "cps":
                if (cmd.length != 3) {
                    this.emit_error(line_num, error_operands_num.format("CPS", 2, (cmd.length - 1)));
                    return;
                }
                var param0 = this.get_register_operand(cmd[1]);
                if (param0 == null) {
                    this.emit_error(line_num, error_operand_06.format(1));
                    return;
                }
                var param1 = this.get_operand(line_num, 2, cmd[2]);
                this.emit_opcode(line_num, cmd[0], param0, param1);
                break;
            case "jmp":
                var param0 = this.get_jmp_target(line_num, 1, cmd[1]);
                this.emit_opcode(line_num, cmd[0], param0, null);
                break;
            case "jg":
                var param0 = this.get_jmp_target(line_num, 1, cmd[1]);
                this.emit_opcode(line_num, cmd[0], param0, null);
                break;
            case "jge":
                var param0 = this.get_jmp_target(line_num, 1, cmd[1]);
                this.emit_opcode(line_num, cmd[0], param0, null);
                break;
            case "jl":
                var param0 = this.get_jmp_target(line_num, 1, cmd[1]);
                this.emit_opcode(line_num, cmd[0], param0, null);
                break;
            case "jle":
                var param0 = this.get_jmp_target(line_num, 1, cmd[1]);
                this.emit_opcode(line_num, cmd[0], param0, null);
                break;
            case "je":
                var param0 = this.get_jmp_target(line_num, 1, cmd[1]);
                this.emit_opcode(line_num, cmd[0], param0, null);
                break;
            case "jne":
                var param0 = this.get_jmp_target(line_num, 1, cmd[1]);
                this.emit_opcode(line_num, cmd[0], param0, null);
                break;

            case "hlt":
                if (cmd.length != 1) {
                    this.emit_error(line_num, error_operands_num.format("HLT", 0, (cmd.length - 1)));
                    return;
                }
                this.emit_opcode(line_num, cmd[0], null, null);
                break;
            case "nop":
                if (cmd.length != 1) {
                    this.emit_error(line_num, error_operands_num.format("NOP", 0, (cmd.length - 1)));
                    return;
                }
                this.emit_opcode(line_num, cmd[0], null, null);
                break;


            // aux
            case "print":
                if (cmd.length < 2) {
                    this.emit_error(line_num, error_operands_num_print);
                    return;
                }
                var param0 = this.get_string_operand(line_num, 1, cmd[1]);
                if (param0 == null) {
                    param0 = this.get_operand(line_num, 1, cmd[1]);
                }
                var param1 = null;
                if (cmd.length > 2) {
                    param1 = this.get_string_operand(line_num, 2, cmd[2]);
                    if (param1 == null) {
                        param1 = this.get_operand(line_num, 2, cmd[2]);
                    }
                }
                this.emit_opcode(line_num, cmd[0], param0, param1);
                break;
               
            // external ports
            case "out":
                if (cmd.length != 3) {
                    this.emit_error(line_num, error_operands_num.format("OUT", 2, (cmd.length - 1)));
                    return;
                }
                var param0 = this.get_operand(line_num, 1, cmd[1]);
                var param1 = this.get_operand(line_num, 2, cmd[2]);
                this.emit_opcode(line_num, cmd[0], param0, param1);
                break;
            case "in":
                if (cmd.length != 3) {
                    this.emit_error(line_num, error_operands_num.format("IN", 2, (cmd.length - 1)));
                    return;
                }
                var param0 = this.get_operand(line_num, 1, cmd[1]);
                var param1 = this.get_operand(line_num, 2, cmd[2]);
                this.emit_opcode(line_num, cmd[0], param0, param1);
                break;

            // stack
            case "push":
                if (cmd.length != 2) {
                    this.emit_error(line_num, error_operands_num.format("PUSH", 1, (cmd.length - 1)));
                    return;
                }
                var param0 = this.get_operand(line_num, 1, cmd[1]);
                this.emit_opcode(line_num, cmd[0], param0, null);
                break;
            case "pop":
                if (cmd.length != 2) {
                    this.emit_error(line_num, error_operands_num.format("POP", 1, (cmd.length - 1)));
                    return;
                }
                var param0 = this.get_register_operand(cmd[1]);
                if (param0 == null) {
                    this.emit_error(line_num, error_operand_06.format(1));
                    return;
                }
                this.emit_opcode(line_num, cmd[0], param0, null);
                break;

            // calls
            case "call":
                var param0 = this.get_jmp_target(line_num, 1, cmd[1]);
                this.emit_opcode(line_num, cmd[0], param0, null);
                break;
            case "ret":
                if (cmd.length != 1) {
                    this.emit_error(line_num, error_operands_num.format("RET", 0, (cmd.length - 1)));
                    return;
                }
                this.emit_opcode(line_num, cmd[0], null, null);
                break;

            default:
                this.emit_error(line_num, error_unknown_cmd_01.format(cmd[0]));
        }

    }

    is_need_to_compile(source) {

        if (this.source.valueOf() == source.valueOf()) {
            return false;
        }

        return true;
    }

    compile(source) {
        var lines = source.split(/\r?\n/);

        this.commands = [];
        this.compile_errors = [];
        this.compile_errors_text = "";
        this.definitions = []; 

        for (var i = 0; i < lines.length; i++) {
            var nline = this.prepare_preprocessor(i, lines[i]);
            if (nline) {
                lines[i] = nline;
            }
        }

        log_message("Preprocessor");

        log_message(this.definitions);

        for(var i = 0; i < this.definitions.length; i++)
        {
            log_message(this.definitions[i].def);
            log_message(this.definitions[i].val);
        }

        log_message("--->");
        for (var i = 0; i < lines.length; i++) {
            log_message("b:" + lines[i]);
            var new_line = this.do_preprocessor(lines[i]);
            log_message("a:" + new_line);
            lines[i] = new_line;
        }
        for (var i = 0; i < lines.length; i++)
        {
            this.compile_line(i, lines[i]);
        }

        if (this.compile_errors.length > 0) {
            this.source = "";
            return false;
        }

        this.labels = {};

        // 2nd pass - resolve labels
        for(var i = 0; i < this.commands.length; i++) {
            var cmd = this.commands[i];
            if (cmd.op == "&") {
                var tgt = cmd.param0.jmp_target;
                if (tgt in this.labels) {
                    this.emit_error(cmd.line, error_jmptarget_05.format(tgt, (this.labels[tgt].line + 1)));
                    this.source = "";
                    return false;
                }
                this.labels[tgt] = { addr: i, line: cmd.line};
            }
        }

        // validate all labels
        for(var i = 0; i < this.commands.length; i++) {
            var cmd = this.commands[i];

            if (cmd.param0 && cmd.param0.type == "label") {
                var tgt = cmd.param0.jmp_target;
                if (!(tgt in this.labels)) {
                    this.emit_error(cmd.line, error_jmptarget_06.format(tgt));
                    this.source = "";
                    return false;
                }
            }
        }

        if (this.compile_errors.length > 0) {
            this.source = "";
            return false;
        }

        this.source = source;
        return true;
    }

    cpu_reset() {
        log_message("RESET");
        this.state = new Z8STATE();        
        log_message(this.commands);
    }

    cpu_memory_write(addr, val) {
        _s(this.state.memory[addr], val);
    }

    cpu_memory_read(addr) {
        var val = _g(this.state.memory[addr]);
        return val;
    }

    cpu_get_value(param) {
        var v = 0;
        if (param.type == "reg")
            v = _g(this.state.registers[param.reg_num]);
        else if (param.type == "const")
            v = param.const_val;
        return v;
    }

    cpu_get_value_or_string(param) {
        var v = 0;
        if (param.type == "reg")
            v = _g(this.state.registers[param.reg_num]);
        else if (param.type == "const")
            v = param.const_val;
        else if (param.type == "string")
            v = param.str_val;
        return v;
   
    }

    

    cpu_get_jmp_target_ip(param) {
        if (param.type == "label") {
            if (!(param.jmp_target in this.labels)) {
                this.emit_runtime_error(_g(state.ip), error_runtime_03);
                this.cpu_reset();
                return null;
            }

            var ip = this.labels[param.jmp_target].addr;
            return ip;
        }

        this.emit_runtime_error(_g(state.ip), error_runtime_04);
        return null;
    }
   
    cpu_skip_comments_and_prints() {
        var commands = this.commands;
        var state = this.state;

        var term_ip = _g(state.ip) - 1;

        for (var i = 0; i < 100; i++) {

            var skip_count = 0;

            //skip labels
            while (commands[_g(state.ip)].op == "&" || commands[_g(state.ip)].op == "-") {

                log_message("SKIP " + _g(state.ip) + " of " + commands.length);
                _s(state.ip, _g(state.ip)+1);
                skip_count++;

                if (_g(state.ip) >= commands.length) {
                    _s(state.ip, term_ip);
                    this.emit_terminate(term_ip);
                    return false;
                }
            }

            //execute debug prints (debug print cost 0 cycles)
            while (commands[_g(state.ip)].op == "print") {
                term_ip = _g(state.ip);
                skip_count++;
                var p0 = this.cpu_get_value_or_string(commands[_g(state.ip)].param0);
                var p1 = "";
                if (commands[_g(state.ip)].param1 != null) {
                    p1 = this.cpu_get_value_or_string(commands[_g(state.ip)].param1);
                }
                log_always("DEBUG: " + p0.toString() + p1.toString());
                debug_log_print(dbg_print_07.format((_g(state.ip)+1), p0.toString(), p1.toString()));
                _s(state.ip, _g(state.ip)+1);

                if (state.ip >= commands.length) {
                    _s(state.ip, term_ip);
                    this.emit_terminate(term_ip);
                    return false;
                }

            } 

            if (skip_count == 0)
                break;

        }

        return true;
    }

    cpu_step_imp() {

        const memory_latency_cycles = 2;
        const mul_latency_cycles = 2;
        const divmod_latency_cycles = 2;
        const io_port_latency_cycles = 3;
        const call_ret_latency_cycles = 3;

        //log_message(this.state.ip);
        //log_message(this.state);

        var commands = this.commands;
        var state = this.state;

        state.cycle++;

        // generate random number (on every CPU step)
        var rndNumber = Math.floor(Math.random() * 256);
        _s(state.ports[31], rndNumber);

        log_message("EXECUTE IP: " + _g(state.ip));
        log_message("STATE BEFORE");
        log_message(state);

        if (!this.cpu_skip_comments_and_prints()) {
            return "stop";
        }


        var cmd = commands[_g(state.ip)];

        switch(cmd.op) {
            case "mov":
                log_message("mov");
                _s(state.registers[cmd.param0.reg_num], this.cpu_get_value(cmd.param1));
                break;
            case "ld":
                log_message("ld");
                if (state.instruction_cycles_passed < memory_latency_cycles) {
                    state.instruction_cycles_passed++;
                    return "stall";
                }
                var memory_addr = this.cpu_get_value(cmd.param1);
                _s(state.registers[cmd.param0.reg_num], this.cpu_memory_read(memory_addr));
                break;
            case "st":
                log_message("st");
                if (state.instruction_cycles_passed < memory_latency_cycles) {
                    state.instruction_cycles_passed++;
                    return "stall";
                }

                var memory_addr = this.cpu_get_value(cmd.param0);
                var val = this.cpu_get_value(cmd.param1);
                this.cpu_memory_write(memory_addr, val);
                break;
            case "ads":
                log_message("ads");
                var v = this.cpu_get_value(cmd.param0) + this.cpu_get_value(cmd.param1);
                _s(state.registers[cmd.param0.reg_num], clamp_to_byte(v));
                break;
            case "sbs":
                log_message("sbs");
                var v = this.cpu_get_value(cmd.param0) - this.cpu_get_value(cmd.param1);
                _s(state.registers[cmd.param0.reg_num], clamp_to_byte(v));
                break;
            case "add":
                log_message("add");
                var a = this.cpu_get_value(cmd.param0);
                var b = this.cpu_get_value(cmd.param1);
                var v = a + b;
                _s(state.registers[cmd.param0.reg_num], wrap_to_byte(v));
                break;
            case "sub":
                log_message("sub");
                var v = this.cpu_get_value(cmd.param0) - this.cpu_get_value(cmd.param1);
                _s(state.registers[cmd.param0.reg_num], wrap_to_byte(v));
                break;
            case "mul":
                log_message("mul");
                if (state.instruction_cycles_passed < mul_latency_cycles) {
                    state.instruction_cycles_passed++;
                    return "stall";
                }
                var v = this.cpu_get_value(cmd.param0) * this.cpu_get_value(cmd.param1);
                _s(state.registers[cmd.param0.reg_num], clamp_to_byte(v));
                break;
            case "div":
                log_message("div");
                if (state.instruction_cycles_passed < divmod_latency_cycles) {
                    state.instruction_cycles_passed++;
                    return "stall";
                }

                var denominator = this.cpu_get_value(cmd.param1)
                if (denominator == 0) {
                    this.emit_runtime_error(_g(state.ip), error_runtime_02);
                    //this.cpu_reset();
                    return "exception";
                } else {
                    var v = Math.floor(this.cpu_get_value(cmd.param0) / denominator);
                    _s(state.registers[cmd.param0.reg_num], clamp_to_byte(v));
                }
                break;
            case "mod":
                log_message("mod");
                if (state.instruction_cycles_passed < divmod_latency_cycles) {
                    state.instruction_cycles_passed++;
                    return "stall";
                }

                var denominator = this.cpu_get_value(cmd.param1)
                if (denominator == 0) {
                    this.emit_runtime_error(_g(state.ip), error_runtime_02);
                    //this.cpu_reset();
                    return "exception";
                } else {
                    var v = Math.floor(this.cpu_get_value(cmd.param0) % denominator);
                    _s(state.registers[cmd.param0.reg_num], clamp_to_byte(v));
                }
                break;
            case "sr":
                log_message("sr");
                var v = this.cpu_get_value(cmd.param0) >> this.cpu_get_value(cmd.param1);
                _s(state.registers[cmd.param0.reg_num], clamp_to_byte(v));
                break;
            case "sl":
                log_message("sl");
                var v = this.cpu_get_value(cmd.param0) << this.cpu_get_value(cmd.param1);
                _s(state.registers[cmd.param0.reg_num], clamp_to_byte(v));
                break;
            case "and":
                log_message("and");
                var v = this.cpu_get_value(cmd.param0) & this.cpu_get_value(cmd.param1);
                _s(state.registers[cmd.param0.reg_num], clamp_to_byte(v));
                break;
            case "or":
                log_message("or");
                var v = this.cpu_get_value(cmd.param0) | this.cpu_get_value(cmd.param1);
                _s(state.registers[cmd.param0.reg_num], clamp_to_byte(v));
                break;
            case "xor":
                log_message("xor");
                var v = this.cpu_get_value(cmd.param0) ^ this.cpu_get_value(cmd.param1);
                _s(state.registers[cmd.param0.reg_num], clamp_to_byte(v));
                break;
            case "cps":
                log_message("cps");
                var a = this.cpu_get_value(cmd.param0);
                var b = this.cpu_get_value(cmd.param1);

                a = byte_to_signed(a);
                b = byte_to_signed(b);

                _s(state.cr, "eq");
                if (a > b)
                    _s(state.cr, "gr");
                if (a < b)
                    _s(state.cr, "le");

                break;
            case "cmp":
                log_message("cmp");
                var a = this.cpu_get_value(cmd.param0);
                var b = this.cpu_get_value(cmd.param1);

                _s(state.cr, "eq");
                if (a > b)
                    _s(state.cr, "gr");
                if (a < b)
                    _s(state.cr, "le");

                break;
            case "tst":
                log_message("tst");
                var a = this.cpu_get_value(cmd.param0);
                var b = this.cpu_get_value(cmd.param1);

                if ((a & b) != 0) {
                    _s(state.cr, "eq");
                } else {
                    _s(state.cr, "le");
                }
                break;
            case "jmp":
                log_message("jmp");
                var new_ip = this.cpu_get_jmp_target_ip(cmd.param0);
                if (new_ip == null)
                    return "exception";
                     
                if (new_ip >= commands.length)
                {
                    this.emit_runtime_error(_g(state.ip), error_runtime_06.format(new_ip));
                    return "exception";
                }
                        
                _s(state.ip, new_ip);
                break;
            case "jg":
                log_message("jg");
                if (_g(state.cr) == "gr") {
                    var new_ip = this.cpu_get_jmp_target_ip(cmd.param0);
                    if (new_ip == null)
                        return "exception";

                    if (new_ip >= commands.length)
                    {
                        this.emit_runtime_error(_g(state.ip), error_runtime_06.format(new_ip));
                        return "exception";
                    }
                    
                    _s(state.ip, new_ip);
                }
                break;
            case "jge":
                log_message("jge");
                if (_g(state.cr) == "gr" || _g(state.cr) == "eq") {
                    var new_ip = this.cpu_get_jmp_target_ip(cmd.param0);
                    if (new_ip == null)
                        return "exception";

                    if (new_ip >= commands.length)
                    {
                        this.emit_runtime_error(_g(state.ip), error_runtime_06.format(new_ip));
                        return "exception";
                    }
                    
                    _s(state.ip, new_ip);
                }
                break;
            case "jl":
                log_message("jl");
                if (_g(state.cr) == "le") {
                    var new_ip = this.cpu_get_jmp_target_ip(cmd.param0);
                    if (new_ip == null)
                        return "exception";

                    if (new_ip >= commands.length)
                    {
                        this.emit_runtime_error(_g(state.ip), error_runtime_06.format(new_ip));
                        return "exception";
                    }
                    
                    _s(state.ip, new_ip);
                }
                break;
            case "jle":
                log_message("jle");
                if (_g(state.cr) == "le" || _g(state.cr) == "eq") {
                    var new_ip = this.cpu_get_jmp_target_ip(cmd.param0);
                    if (new_ip == null)
                        return "exception";

                    if (new_ip >= commands.length)
                    {
                        this.emit_runtime_error(_g(state.ip), error_runtime_06.format(new_ip));
                        return "exception";
                    }                       
                    
                    _s(state.ip, new_ip);
                }
                break;
            case "je":
                log_message("je");
                if (_g(state.cr) == "eq") {
                    var new_ip = this.cpu_get_jmp_target_ip(cmd.param0);
                    if (new_ip == null)
                        return "exception";
                        
                    if (new_ip >= commands.length)
                    {
                        this.emit_runtime_error(_g(state.ip), error_runtime_06.format(new_ip));
                        return "exception";
                    }                       
                    
                    _s(state.ip, new_ip);
                }
                break;

            case "jne":
                log_message("jne");
                if (_g(state.cr) == "gr" || _g(state.cr) == "le") {
                    var new_ip = this.cpu_get_jmp_target_ip(cmd.param0);
                    if (new_ip == null)
                        return "exception";

                    if (new_ip >= commands.length)
                    {
                        this.emit_runtime_error(_g(state.ip), error_runtime_06.format(new_ip));
                        return "exception";
                    }                       
                    
                    _s(state.ip, new_ip);
                }
                break;


            case "out":
                log_message("out");
                if (state.instruction_cycles_passed < io_port_latency_cycles) {
                    state.instruction_cycles_passed++;
                    return "stall";
                }

                var port_number = this.cpu_get_value(cmd.param0);
                var val = this.cpu_get_value(cmd.param1);
                _s(state.ports[port_number], val);
                break;
            case "in":
                log_message("in");
                if (state.instruction_cycles_passed < io_port_latency_cycles) {
                    state.instruction_cycles_passed++;
                    return "stall";
                }
                var port_number = this.cpu_get_value(cmd.param1);
                _s(state.registers[cmd.param0.reg_num], _g(state.ports[port_number]));
                break;
            case "call":

                log_message("call");
                if (state.instruction_cycles_passed < call_ret_latency_cycles) {
                    state.instruction_cycles_passed++;
                    return "stall";
                }

                var new_ip = this.cpu_get_jmp_target_ip(cmd.param0);
                if (new_ip == null)
                    return "exception";

                if (_g(state.sp) <= 0) {
                    this.emit_runtime_error(_g(state.ip), error_runtime_05);
                    return "exception";
                }

                if (new_ip >= commands.length)
                {
                    this.emit_runtime_error(_g(state.ip), error_runtime_06.format(new_ip));
                    return "exception";
                }                       

                _s(state.memory[_g(state.sp)], _g(state.ip));
                _s(state.sp, _g(state.sp)-1);
                
                _s(state.ip, new_ip);
                break;
            case "ret":
                log_message("ret");
                if (state.instruction_cycles_passed < call_ret_latency_cycles) {
                    state.instruction_cycles_passed++;
                    return "stall";
                }

                _s(state.sp, _g(state.sp)+1);
                if (_g(state.sp) > 255) {
                    this.emit_terminate(_g(state.ip));
                    return "exception";
                }

                var new_ip = _g(state.memory[_g(state.sp)]);
                if (new_ip >= commands.length)
                {
                    this.emit_runtime_error(_g(state.ip), error_runtime_06.format(new_ip));
                    return "exception";
                }                       

                _s(state.ip, new_ip);
                log_message("RET:" + _g(state.ip));
                break;
            case "push":
                log_message("push");

                if (state.instruction_cycles_passed < memory_latency_cycles) {
                    state.instruction_cycles_passed++;
                    return "stall";
                }

                if (_g(state.sp) <= 0) {
                    this.emit_runtime_error(_g(state.ip), error_runtime_05);
                    return "exception";
                }

                var val = this.cpu_get_value(cmd.param0);
                var addr = _g(state.sp);
                this.cpu_memory_write(addr, val);
                _s(state.sp, _g(state.sp)-1);
                break;
            case "pop":
                log_message("pop");

                if (state.instruction_cycles_passed < memory_latency_cycles) {
                    state.instruction_cycles_passed++;
                    return "stall";
                }

                _s(state.sp, _g(state.sp)+1);
                if (_g(state.sp) > 255) {
                    this.emit_runtime_error(_g(state.ip), error_runtime_07);
                    return "exception";
                }

                var addr = _g(state.sp);
                _s(state.registers[cmd.param0.reg_num], this.cpu_memory_read(addr));
                break;

            case "nop":
                log_message("nop");
                break;

            case "hlt":
                log_message("hlt");

                // interrupt will occur each cpu_cycles_per_frame cycle
                if ((state.cycle % (cpu_cycles_per_frame + 1)) != 0) {
                    return "hlt";
                }

                break;


            default:
                this.emit_runtime_error(_g(state.ip), error_runtime_01.format(cmd.op));
                this.cpu_reset();
                //log_always("RESET-3");
                return "reset";
        }

        _s(state.ip, _g(state.ip)+1);
        state.instruction_cycles_passed = 0;

        if (_g(state.ip) >= commands.length)
        {
            _s(state.ip, (_g(state.ip)-1));
            this.emit_terminate(_g(state.ip));
            return "stop";
        }


        if (!this.cpu_skip_comments_and_prints()) {
            return "stop";
        }

        log_message("NEW IP: " + _g(state.ip));
        log_message("STATE AFTER");
        log_message(state);

        return "exec";
    }

    cpu_step() {

        //
        if ((this.state.cycle % cpu_cycles_per_frame) == 0) {

            /*
            // force update all ports (perepherial update)
            for(var i = 0; i < 32; i++) {
                _s(this.state.ports[i], _g(this.state.ports[i]));
            }
            */

            z8_update_gamepad();
            z8_update_keyboard();
            z8_update_terminal();
        }

        var s = this.cpu_step_imp();
        this.state.last_step_result = s;

        return s;
    }

    get_compilation_errors() {
        return this.compile_errors;
    }

    get_compile_errors_text() {
        return this.compile_errors_text;
    }

}

var cpu = new Z8CPU();
var interval_id_cpu = -1;
var interval_id_200 = -1;
var interval_id_1000 = -1;

function z8_stop_all_timers() {
    if (interval_id_cpu != -1) {
        window.clearInterval(interval_id_cpu);
        interval_id_cpu = -1;
    }
    if (interval_id_200 != -1) {
        window.clearInterval(interval_id_200);
        interval_id_200 = -1
    }
    if (interval_id_1000 != -1) {
        window.clearInterval(interval_id_1000);
        interval_id_1000 = -1
    }
}


function z8_set_readonly(val) {
    var editor = ace.edit("editor");

    if (val) {
        editor.setOptions({
            readOnly: true,
            highlightActiveLine: true,
            highlightGutterLine: false
        });

        editor.renderer.$cursorLayer.element.style.opacity=0;
    } else {
        editor.setOptions({
            readOnly: false,
            highlightActiveLine: true,
            highlightGutterLine: true
        });
    
        editor.renderer.$cursorLayer.element.style.opacity=1;    
    }
}

function z8_set_active_line(line_num) {
    var editor = ace.edit("editor");
    editor.gotoLine(line_num, 0);

    editor.session.setAnnotations([{
        row: (line_num-1),
        column: 0,
        text: "instruction pointer (ip)",
        type: "info"
        }]);  
}

function z8_is_need_to_compile() {
    var editor = ace.edit("editor");
    var src = editor.getValue();
    return cpu.is_need_to_compile(src);
}

function z8_do_compile() {

    var editor = ace.edit("editor");
    var src = editor.getValue();

    var res = cpu.compile(src);
    if (!res) {

        debug_log_print_impl(cpu.get_compile_errors_text());
        debug_log_print(dbg_print_03);
        editor.session.setAnnotations(cpu.get_compilation_errors());
        return false;
    }

    z8_clear_annotitions();
    debug_log_print(dbg_print_02);
    return true;
}


function z8_compile() {

    if (cpu.state.last_step_result == "stop" || cpu.state.last_step_result == "exception")
    {
        cpu = new Z8CPU();
    }

    if (z8_is_need_to_compile() == false) {
        //debug_log_print("> ========== Build up-to-date ==========");
        return 0; // do not need to compile
    }

    debug_log_clear();
    debug_log_print(dbg_print_01);

    log_always("COMPILATION!");
    if (z8_do_compile() == false) {
        return 2; //compile error
    }
    cpu.cpu_reset();
    z8_set_readonly(true);
    z8_set_active_line(1);
    return 1; // compile success
}


function z8_cpu_step_instruction() {

    for (var steps = 0; steps < cpu_cycles_per_frame*2; steps++) {
        var ip = cpu.state.ip;
        z8_cpu_step(1, true);
        if (cpu.state.last_step_result == "exec" || cpu.state.last_step_result == "reset" || cpu.state.last_step_result == "stop" || cpu.state.last_step_result == "exception") {
            return;
        }
        if (cpu.state.ip != ip) {
            return;
        }
    }

}

function z8_cpu_step(num_of_cycles, change_editor_line) {

    var compile_res = z8_compile();
    if (compile_res == 2) {
        z8_stop_all_timers();
        ide_set_button_state("run", true);
        ide_set_button_state("stop", false);
        ide_set_button_state("pause", false);
        return false;
    }

    if (compile_res == 1 && change_editor_line) {
        ide_update_views(cpu.state, false);
        return true;
    }

    cpu.state.stopped = false;
    ide_set_button_state("stop", true);

    var t0 = performance.now();
    for(var i = 0; i < num_of_cycles; i++) {
        state = cpu.cpu_step();

        if (state == "reset") {
            z8_stop_and_reset();
            return false;
        }

        if (state == "stop" || state == "exception") {
            z8_stop();
            return false;
        }
    }
    var t1 = performance.now();
    var ms_per_step = (t1 - t0);
    if (ms_per_step > 40) {
        log_always("Your host cpu is too slow (frame skip). Step should be finisihed in 40ms. Duration: " + (t1 - t0) + "ms.");
    }
    log_message("cycle: " + cpu.state.cycle + ", state: " + state);

    if (change_editor_line) {
        var line_num = (_g(cpu.state.ip)+1);
        z8_set_active_line(line_num);
        ide_update_views(cpu.state, false);
    }

    return true;
}

function z8_run() {

    if (cpu.state.stopped == false) {
        //already in runned state
        return;
    }


    // reset focus (need for keyboard input)
    document.activeElement.blur();

    ide_set_button_state("run", false);
    ide_set_button_state("stop", true);
    ide_set_button_state("pause", true);

    if (cpu.state.paused == false) {
        if (z8_compile() == 2) {
            ide_set_button_state("run", true);
            ide_set_button_state("stop", false);
            ide_set_button_state("pause", false);
            return false;
        }
    
        cpu.cpu_reset();
    }

    z8_clear_annotitions();

    cpu.state.stopped = false;

    var cpu_timer_ms = 1000 / cpu_frames_per_second;
    log_always("Frame time: " + cpu_timer_ms + "ms");

    // cpu step
    interval_id_cpu = window.setInterval(function() { z8_cpu_step(cpu_cycles_per_frame, false); }, cpu_timer_ms);

    // ports io update 5 times per second)
    interval_id_200 = window.setInterval(function() { ide_update_port_views(cpu.state, false); }, 200);

    // memory io update 1 time per second)
    interval_id_1000 = window.setInterval(function() { ide_update_memory_views(cpu.state, false); }, 1000);

}

function z8_pause() {
    ide_set_button_state("run", true);
    ide_set_button_state("pause", false);

    z8_stop_all_timers();

    var line_num = (_g(cpu.state.ip)+1);
    z8_set_active_line(line_num);
    ide_update_views(cpu.state, false);
    cpu.state.paused = true;
}


function z8_stop_and_reset() {
    ide_set_button_state("run", true);
    ide_set_button_state("stop", false);
    ide_set_button_state("pause", false);

    z8_stop_all_timers();

    z8_set_active_line(1);
    z8_set_readonly(false);
    cpu = new Z8CPU();
    z8_clear_annotitions();
    ide_update_views(cpu.state, false);
}


function z8_stop() {

    ide_set_button_state("run", true);
    ide_set_button_state("stop", false);
    ide_set_button_state("pause", false);

    z8_stop_all_timers();

    //z8_set_active_line(1);
    z8_set_readonly(false);
    cpu.state.soft_stop();

    //cpu = new Z8CPU();
    //z8_clear_annotitions();
    ide_update_views(cpu.state, false);
}

function z8_clear_annotitions()
{
    log_always("CLEAR ANN");
    var editor = ace.edit("editor");
    editor.session.clearAnnotations();
}


function z8_init() {
    z8_gamepad_init();
    z8_keyboard_init();
    z8_terminal_init();
}

