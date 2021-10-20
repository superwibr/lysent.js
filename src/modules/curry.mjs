/**
 * Curry. Yum.
 * @param yum Sub-function OR function to be curried
 */
function curry(yum) {
	const m = {
		smartCurry: function curried(...args) { // smart-currying
			if (args.length >= yum.length) { // if it isn't partial
				return yum.apply(this, args);
			} else {
				return function (...args2) { // if it is partial
					return curried.apply(this, args.concat(args2));
				};
			};
		}
	}

	if (yum == '') {

	} else { 
		return m.smartCurry;
	}
}

export default curry