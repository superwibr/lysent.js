//==============================================//
//  lysent.js                                   //
//  Official Lysent Ent. Integration Library    //
//  We hope the comments are clear enough.      //
//==============================================//

// imports
import Resource from './modules/Resource.mjs'
import Txtui from './modules/txtui.mjs';

/*
 * Notes:
 * => yes, the indentation is in spaces. dynamic tabs won't work for our commenting style.
 */

window.lysent = (function () {// a nice IIFE to contain everything in context and not cause values to spill :)

    // placeholder
    let lysent = new Object()

    // main
    let main = function (input) {
        // all public lysent.js methods are tagged templates, decorated with lysent._renderDeco
        // (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)
        let args = String(input).match(lysent.__regex.args);
        return args;
    };

    //
    // RegEx
    //
    lysent.__regex = {
        args: /[^\s"']+|"([^"]*)"|'([^']*)'/g  // split by whitespace, except in quotes.
    }

    //
    // methods
    // v v v v
    //

    lysent.__renderDeco = function (wrapped) {// decorates functions with tagged template input management
        // decorated function
        return function (literals, ...vars) {
            let raw = literals.raw,
                rendered = '',
                len = arguments.length,
                str, variable, result;

            for (let i = 1; i < len; i++) {
                str = raw[i - 1];
                variable = vars[i - 1];
                rendered += str + variable;
            }
            rendered += raw[raw.length - 1];

            result = wrapped.apply(this, [rendered]);
            return result;
        }
    }; 
    let wrap = lysent.__renderDeco; // reference to overall make it smaller
    lysent._render = wrap(function (input) {// 'renders' template strings
        return input;
    });

    lysent.Resource = Resource;
    lysent.Txtui = Txtui;

    // wrap main
    main = wrap(main);

    // transfer properties to main
    for (let k in lysent) {
        main[k] = lysent[k]
    }

    // return methods
    return main;
})();

export default window.lysent