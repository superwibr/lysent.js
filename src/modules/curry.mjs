/**
 * Curry. Yum.
 * @param yum Sub-function OR function to be curried
 */
function curry(yum) {
	switch (yum) {
		case '':

			break;

		default: // smart-currying.
			return (function curried(...args) {
				if (args.length >= yum.length) { // if it isn't partial
					return yum.apply(this, args);
				} else {
					return function (...args2) { // if it is partial
						return curried.apply(this, args.concat(args2));
					};
				};
			});
	}
}

export default curry