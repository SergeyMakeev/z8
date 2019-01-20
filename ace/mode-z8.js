define("ace/mode/z8_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

//
// https://github.com/ajaxorg/ace/wiki/Creating-or-Extending-an-Edit-Mode
//
var AssemblyZ8HighlightRules = function() {
    this.$rules = { start: 
       [ 
            { token: 'keyword',
            regex: '\\b(?:mov|ld|st|add|ads|sub|sbs|mul|muls|div|mod|sl|sr|and|or|xor|cmp|cps|tst|jmp|jg|jge|jl|jle|je|jne|nop|out|in|push|pop|call|ret|hlt)\\b',
            caseInsensitive: true },

            { token: 'support.function',
            regex: '\\b(?:print)\\b',
            caseInsensitive: true },


            { token: 'variable.parameter',
            regex: '\\b(?:r0|r1|r2|r3|r4|ip|sp|zf)\\b',
            caseInsensitive: true },

            { token: 'constant.character',
            regex: '\\b[0-9]+\\b' },

            { token: 'constant.character',
            regex: '\\b0x[A-F0-9]+\\b',
            caseInsensitive: true },

            { token: 'constant.character',
            regex: '\\b[A-F0-9]+h\\b',
            caseInsensitive: true },

            { token: 'constant.character',
            regex: '\\b[A-F0-9]+b\\b',
            caseInsensitive: true },

            { token: 'string', regex: /'([^\\']|\\.)*'/ },

            { token: 'string', regex: /"([^\\"]|\\.)*"/ },

            { token: 'variable.other', regex: '.*\:$' }, // label declaration
            { token: 'comment.double-slash', regex: '//.*$' },   // line comment
            
            { token: 'variable.language', regex: '#def ' }   // preprocessor definition
        ] 
    };
    
    this.normalizeRules();
};

AssemblyZ8HighlightRules.metaData = {
    fileTypes: [ 'asm' ],
    name: 'Assembly Z8',
    scopeName: 'source.assembly'
};


oop.inherits(AssemblyZ8HighlightRules, TextHighlightRules);

exports.AssemblyZ8HighlightRules = AssemblyZ8HighlightRules;
});


define("ace/mode/z8",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/z8_highlight_rules"], function(require, exports, module) {
    "use strict";
    
    var oop = require("../lib/oop");
    var TextMode = require("./text").Mode;
    var AssemblyZ8HighlightRules = require("./z8_highlight_rules").AssemblyZ8HighlightRules;
    
    var Mode = function() {
        this.HighlightRules = AssemblyZ8HighlightRules;
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
    



