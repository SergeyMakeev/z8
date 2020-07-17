/*
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
*/

class Z8_TERMINAL {

    constructor(view) {


        var img = document.createElement("img");
        img.src = "img/terminal.png";
        img.classList.add("terminal_skin");
        view.appendChild(img);

        this.canvas = document.createElement("canvas");
        this.canvas.id="terminal_canvas";
        this.canvas.width="700";
        this.canvas.height="520";
        this.canvas.classList.add("terminal_screen");
        view.appendChild(this.canvas);

        this.ctx = this.canvas.getContext("2d");    

        this.colors = [];
        this.colors.push('#800000'); // 0 red
        this.colors.push('#008000'); // 1 green
        this.colors.push('#000080'); // 2 blue
        this.colors.push('#800080'); // 3 magenta
        this.colors.push('#808000'); // 4 yellow
        this.colors.push('#008080'); // 5 cyan
        this.colors.push('#808080'); // 6 white
        this.colors.push('#000000'); // 7 black

        this.colors.push('#ff0000'); // 8 red
        this.colors.push('#00ff00'); // 9 green
        this.colors.push('#0000ff'); // 10 blue
        this.colors.push('#ff00ff'); // 11 magenta
        this.colors.push('#ffff00'); // 12 yellow
        this.colors.push('#00ffff'); // 13 cyan
        this.colors.push('#ffffff'); // 14 white
        this.colors.push('#202020'); // 15 black


        this.fonts = [];

        for(var i = 0; i <= 15; i++) {
            var simg = new Image();
            simg.src = "img/font_" + i + ".png";
            this.fonts.push(simg);
        }

        this.sprites = new Image();
        this.sprites.src = "img/sprites.png";

        this.ox = 90;
        this.oy = 54;

    }

    draw_chr(px, py, spr_number, font_color) {

        var size = 32;

        var x = this.ox + (px * size);
        var y = this.oy + (py * size);

        
        var src_x = (spr_number % 16) * size;
        var src_y = Math.floor(spr_number / 16) * size;
        var src_width = size;
        var src_height = size;
        var dst_width = src_width;
        var dst_height = src_height;

        if (font_color < this.fonts.length) {
            this.ctx.drawImage(this.fonts[font_color], src_x, src_y, src_width, src_height, x, y, dst_width, dst_height);
        }
    }

    draw_sprite(px, py, spr_number) {

        if (spr_number == 255)
        {
            return;
        }

        var size = 32;

        var x = this.ox + (px * 2);
        var y = this.oy + (py * 2);

        
        var src_x = (spr_number % 32) * size;
        var src_y = Math.floor(spr_number / 32) * size;
        var src_width = size;
        var src_height = size;
        var dst_width = src_width;
        var dst_height = src_height;


        if ((x + dst_width - this.ox) > 512)
        {
            var clip = (x + dst_width-this.ox) - 512;

            if (clip >= size) {
                return;
            }

            src_width = src_width - clip;
            dst_width = dst_width - clip;
        }


        if ((y + dst_height - this.oy) > 384)
        {
            var clip = (y + dst_height - this.oy) - 384;

            if (clip >= size) {
                return;
            }

            src_height = src_height - clip;
            dst_height = dst_height - clip;
        }

        this.ctx.drawImage(this.sprites, src_x, src_y, src_width, src_height, x, y, dst_width, dst_height);
    }


    draw_sprite_from_port(port_num) {

        var x = _g(cpu.state.ports[port_num + 0]);
        var y = _g(cpu.state.ports[port_num + 1]);
        var num = _g(cpu.state.ports[port_num + 2]);

        //log_always("sprite begin");
        //log_always("x:" + x);
        //log_always("y:" + y);
        //log_always("n:" + num);
        //log_always("sprite end");

        this.draw_sprite(x, y, num);
    }

    update() {
        //log_always("update terminal");

        var global_color_reg = _g(cpu.state.ports[11]);
        //log_always(border_color_index)
        var border_color = this.colors[global_color_reg & 15];

        var clear_color_index = (global_color_reg >> 4) & 15;
        var clear_color = this.colors[clear_color_index];

        //log_always(border_color)

        this.ctx.fillStyle = border_color;
        this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);

        this.ctx.clearRect(this.ox,this.oy,512,384);    

        this.ctx.fillStyle = clear_color;
        this.ctx.fillRect(this.ox,this.oy,512,384); 
        //this.ctx.clip();

        

        for(var py = 0; py < 12; py++) {

            var reg_num = 13 + Math.floor(py / 2);

            var reg_val = _g(cpu.state.ports[reg_num]);
            if ((py & 1) > 0) {
                reg_val = reg_val >> 4;
            }

            var font_color_orig = (reg_val & 15);

            //var bkg_color_index = ((line_color >> 4) & 15);
            //this.ctx.fillStyle = this.colors[bkg_color_index];
            //this.ctx.fillRect(this.ox,this.oy + (32 * py),512,32);
    
            for(var px = 0; px < 16; px++) {
                var addr = py * 16 + px;
                var ascii = _g(cpu.state.memory[addr]);

                var hb_set = (ascii >= 128);
                ascii = (ascii & 127);

                var font_color = font_color_orig;
                if (hb_set) {
                    // high bit is set (special case) use palette from port #12
                    // high or low depend from the ascii code low bit
                    reg_val = _g(cpu.state.ports[12]);
                    if ((ascii & 1) > 0) {
                        reg_val = reg_val >> 4;
                    }
                    font_color = (reg_val & 15);
                }

                if (clear_color_index == font_color || ascii < 32) {
                    this.draw_chr(px, py, 0, font_color);
                } else
                {
                    this.draw_chr(px, py, ascii-32, font_color);
                }
            }
        }

        this.draw_sprite_from_port(19);
        this.draw_sprite_from_port(22);
        this.draw_sprite_from_port(25);
        this.draw_sprite_from_port(28);
    }
}



var terminal = undefined;



function z8_update_terminal() {

    terminal.update();
}

function z8_terminal_init() {

    var view = document.getElementById("peripheral");

    terminal = new Z8_TERMINAL(view);

}