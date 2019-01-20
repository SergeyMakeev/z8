define("ace/mode/z8dbg_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

//
// https://github.com/ajaxorg/ace/wiki/Creating-or-Extending-an-Edit-Mode
//
var AssemblyZ8DbgHighlightRules = function() {
    this.$rules = { start: 
       [ 
        
            { token: 'invalid', regex: '\\b(?:error|build failed)\\b', caseInsensitive: true },

            { token: 'constant.character', regex: '\\b[0-9]+\\b' },

            { token: 'constant.character', regex: '\\b0x[A-F0-9]+\\b', caseInsensitive: true },

            { token: 'constant.character', regex: '\\b[A-F0-9]+h\\b', caseInsensitive: true },

            { token: 'constant.character', regex: '\\b[A-F0-9]+b\\b', caseInsensitive: true },

            { token: 'string', regex: /'([^\\>]|\\.)*'/ },

            { token: 'string', regex: /"([^\\"]|\\.)*"/ },

        ] 
    };
    
    this.normalizeRules();
};

AssemblyZ8DbgHighlightRules.metaData = {
    fileTypes: [ 'asm' ],
    name: 'Assembly Z8 Debug',
    scopeName: 'source.assembly'
};


oop.inherits(AssemblyZ8DbgHighlightRules, TextHighlightRules);

exports.AssemblyZ8DbgHighlightRules = AssemblyZ8DbgHighlightRules;
});


define("ace/mode/z8_debug",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/z8dbg_highlight_rules"], function(require, exports, module) {
    "use strict";
    
    var oop = require("../lib/oop");
    var TextMode = require("./text").Mode;
    var AssemblyZ8DbgHighlightRules = require("./z8dbg_highlight_rules").AssemblyZ8DbgHighlightRules;
    
    var Mode = function() {
        this.HighlightRules = AssemblyZ8DbgHighlightRules;
        this.$behaviour = this.$defaultBehaviour;
    };
    oop.inherits(Mode, TextMode);
    
    (function() {
        this.lineCommentStart = "#";
        this.$id = "ace/mode/gitignore";
    }).call(Mode.prototype);
    
    exports.Mode = Mode;
    });
                    (function() {
                        window.require(["ace/mode/gitignore"], function(m) {
                            if (typeof module == "object" && typeof exports == "object" && module) {
                                module.exports = m;
                            }
                        });
                    })();
    



