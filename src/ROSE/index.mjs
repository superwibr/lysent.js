import petals from "./modules/petals.mjs";
import { types } from "./modules/types.mjs";

const rose = (function () {

	const m = {}; // Methods object

	// 
	// Properties & Methods
	//

	m._helper = {
		strFn(str) {//converts a string back into a function
			if (typeof str !== 'string') throw 'ERROR: Expected string, got ' + typeof str;

			return new Function('return ' + str)();
		},
	}

	m.privateKey = function (obj, value) { // creates a private key for a value on an object
		const key = Symbol(); // symbols are always unique, therfor providing a private key

		obj[key] = value;

		return key;
	}

	m.petals = petals

	m.planter = function (func) {
		if (typeof func !== 'function')
			throw 'RoseError: parameter `func` must be of type function, got ' + typeof func; // type check

		// context for planter function
		const context = {
			R: this,
			...m.petals
		}

		// planter function itself
		return func.apply(this, [context])
	}

	m[petals.THREAD] = {

		get [petals.LIN]() { return new types.thread.Linear(); },

		get [petals.SEQ]() { return new types.thread.Sequential(); },

		get [petals.IND]() { return new types.thread.Independant(); }
	}

	return m;
})()

export default rose;