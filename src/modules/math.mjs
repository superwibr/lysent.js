const math = (function () {

	const methods = new Object();

	methods.primes = new Object();

	/**
	 * implementation of the [Sieve of Eratostenes](https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes)
	 * @param max The upper limit for the Sieve
	 * @returns the generated Sieve
	 */
	methods.primes.GenerateSieve = function (max) {
		const is_prime = new Array(max + 1); // make an array of `max+1` length

		for (let i = 2; i <= max; i++) { // fill in that array
			is_prime[i] = true;
		}


		for (let i = 2; i <= max; i++) {// cross out multiplies
			if (is_prime[i]) { // elliminate multiples of primes
				for (let j = i * 2; j <= max; j += i) {
					is_prime[j] = false;
				}
			}
		}
		return is_prime;
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

		result = (result || []);

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

		for(const value of uniques){ // for every unique value, find exponent
			out[value] = {
				base: value,
				exponent: getOccurrence(arr, value)
			}
		}

		return out
	}


	// return methods
	return methods
})();

export default math