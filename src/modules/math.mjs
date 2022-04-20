const math = (function () {

	const methods = new Object();

	methods.primes = new Object();

	/**
	 * implementation of the [Sieve of Eratostenes](https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes)
	 * @param max The upper limit for the Sieve. if `min` is defined, gets bumbped to `min + max`.
	 * @param min The lower limit for the Sieve. If left undefined, starts at 2.
	 * @returns An array of prime numbers
	 */
	methods.primes.GenerateSieve = function (max, min = 0) {
		const is_prime = new Object(); // object to hold values

		max = min + max;

		let p = (!min)
			? 2
			: min; // start at end of previous array if continuing

		for (let i = p; i <= max; i++) { // fill in that array
			is_prime[i] = true;
		}

		for (let i = 2; i <= max; i++) { // cross out multiplies
			if (is_prime[i] || is_prime[i] == undefined) { // elliminate multiples of primes
				for (let j = i * 2; j <= max; j += i) {
					delete is_prime[j];
				}
			}
		}

		return Object.keys(is_prime).map(str => parseInt(str, 10));
	}

	/**
	 * Find the prime factors of a number
	 * @param number The number to find prime factors of.
	 * @param result Private param used for recursion.
	 * @returns an array of prime foactors.
	 * 
	 * @source From [this gist](https://gist.github.com/jonathanmarvens/7206278) and modified to support BigInts
	 */
	methods.primes.primeFactors = function primeFactors(number, result) {
		number = BigInt(number); // conversion

		result = (result || []); // if not continuing the factors, reset.

		let root = methods.sqrt(number),
			x = 2n;

		if (number % x) {
			x = 3n;

			while ((number % x) && ((x = (x + 2n)) < root)) { }
		}

		x = (x <= root) ? x : number;

		result.push(x);

		return (x === number)
			? result
			: primeFactors((number / x), result);
	};

	/**
	 * Generates `n` amount of prime numbers and returns them in an array.
	 * @returns Array of prime numbers
	 * 
	 * @param verbose Optional, shows progress in console if set to a truthy value
	 * @param jumps Optional, changes the chunk/jump size.
	 */
	methods.primes.getPrimes = function (n, verbose, jumps) {
		let genned = [],
			min = 0,
			max = jumps || 2 ** 17;

		while (genned.length < n) {
			genned.push(...math.primes.GenerateSieve(max, min)); // generate primes

			if (genned.length >= n) break; // catch if enough primes

			min += jumps || 2 ** 17; // otherwise, search the next 1000 numbers for primes

			verbose ? console.log(`Completed: ${Math.round((genned.length / n) * 100)}% (${genned.length} of ${n} primes)`) : 0;
		}

		return genned.slice(0, n);
	}

	/* doesn't work :/
	
	methods.primes.factorEncode = function (number) {
		let digits = Array.from(String(number), Number),
			primes = math.primes.getPrimes(digits.length),
			out = '';

		for (let i = 0; i < digits.length; i++) {
			out += String(primes[i] ** digits[i])
		}

		return out
	}

	methods.primes.factorDecode =*/

	/**
	 * Gets the square root. Designed so we can handle `BigInt`s
	 * @param value the value to get the root of
	 * @returns the square root of `value`
	 */
	methods.sqrt = function (value) {

		value = BigInt(value) // convert to Big Int

		if (value < 0n) { // errorination because yes
			throw 'square root of negative numbers is not supported'
		}

		if (value < 2n) {
			return value;
		}

		function newtonIteration(n, x0) { // even I don't understand this
			const x1 = ((n / x0) + x0) >> 1n;
			if (x0 === x1 || x0 === (x1 - 1n)) {
				return x0;
			}
			return newtonIteration(n, x1);
		}

		return newtonIteration(value, 1n);
	}

	/**
	 * Converts an array of multiplied values (like the result of `math.primeFactors`) into their exponential form
	 * @param arr array of multiplied values
	 * @returns object of construnction `{<number>:{base:<number>,exponent:<occurence in arr>}}`
	 */
	methods.toExp = function (arr) {
		let uniques = [... new Set(arr)], // get unique values in array
			getOccurrence = function (array, value) { // gets amount of times a value is present in an array
				return array.filter((v) => (v === value)).length;
			},
			out = new Object(); // output object

		for (const value of uniques) { // for every unique value, find exponent
			out[value] = {
				base: value,
				exponent: getOccurrence(arr, value)
			}
		}

		return out
	}

	methods.createNDimArray = function(dimensions) {
		if (dimensions.length > 0) {
			var dim = dimensions[0];
			var rest = dimensions.slice(1);
			var newArray = new Array();
			for (var i = 0; i < dim; i++) {
				newArray[i] = createNDimArray(rest);
			}
			return newArray;
		 } else {
			return undefined;
		 }
	 }

	methods.grid = new Object();

	/**
	 * Create a rectangular 2d grid.
	 * @param width width of grid
	 * @param height height of grid
	 * 
	 * @coords grid(x, y) or grid._array[x][y]
	 */
	methods.grid.new = function (width, height) {
		const mobj = function(x, y){
			return this._array[x][y]
		};

		mobj._array = methods.createNDimArray([x, y])
	};

	methods.grid.dist = function(grid, pointA, pointB){
		
	}


	return methods
})();

export default math