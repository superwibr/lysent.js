const types = {};

types.thread = {};

types.thread.Linear = class Linear {
	worker = new Worker(lysent.SRCPATH() + '/ROSE/modules/thread_sw.mjs'); // service worker

	run(f) {
		if (typeof f !== 'function') throw "[ROSE]: wrong type for parameter at 'run'"; // type check

		this.worker.postMessage(f.toString())
	}

	// forwarding event handlers
	set onmessage(v) { this.worker.onmessage = v };
	get onmessage() { return this.worker.onmessage };
};

types.thread.Sequential = class Sequential {
	worker = new Worker(lysent.SRCPATH() + '/ROSE/modules/thread_sw.mjs')

	run(f) {
		if (typeof f !== 'function') throw "[ROSE]: wrong type for parameter at 'run'"; // type check

		return new Promise((res, rej) => { // promise for waiting
			this.worker.onmessage = res;
			this.worker.onerror = rej;

			this.worker.postMessage(f.toString());
		})
	}
}

types.thread.Independant = class Independant {
	worker = new Worker(lysent.SRCPATH() + '/ROSE/modules/thread_sw.mjs')

	run(f) {
		if (typeof f !== 'function') throw "[ROSE]: wrong type for parameter at 'run'"; // type check

		return new Promise((res, rej) => { // promise for waiting
			this.worker.onmessage = msg => {
				res(msg);
				this.worker.terminate();
			};
			this.worker.onerror = err => {
				rej(err);
				this.worker.terminate();
			};

			this.worker.postMessage(f.toString());
		})
	}
}

export { types };