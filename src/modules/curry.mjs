/**
 * Curry. Yum.
 * 
 * @param yum Sub-function.
 */
function curry(yum) {
	switch (yum) {
		case '':

			break;

		default:
			return (function curried(...args) {
				if (args.length >= yum.length) {
					return yum.apply(this, args);
				} else {
					return function (...args2) {
						return curried.apply(this, args.concat(args));
					};
				};
			});
	}
}