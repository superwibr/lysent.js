export default {
	feval(c) {// Produces output like a normal javascript eval, but works by turning the input string into an IIFE, making it faster than the standard js eval.
		return new Function(`
			  "use strict";
			  return (${c})
		  `)();
	},
	interval(callback, ms, times) {// Makes a loop like setInterval. Stop using .stop() method. Waits for callback to have been executed before running again.
		let r = function () {
			var interv = function (w, t) {
				return function () {
					if (r.s == true) return;

					if (typeof t === "undefined" || t-- > 0) {
						setTimeout(interv, w);

						try {
							callback.call(null);
						} catch (e) {
							t = 0;
							throw e.toString();
						}
					}
				};
			}(ms, times);

			setTimeout(interv, ms);
		};

		r.s = false;

		r.stop = function () { r.s = true };

		r();
		return r;
	},
	TinkerProgress: class {// a remade salvage from the old lysent integration
		constructor(location, label) {
			let loc = document.querySelector(location),
				progress = (() => {
					let p = document.createElement('p'),
						bar = document.createElement('span'),
						status = document.createElement('span'),
						percent = document.createElement('span');

					bar.setAttribute('class', 'loadbar')
					bar.innerText = this._templates.loadbar[0];
					status.setAttribute('class', 'spin');
					status.innerText = ' '
					percent.setAttribute('class', 'percent');
					percent.innerText = ' 0';

					p.append(bar, status, percent, ` ${label}`);

					return p
				})()

			this.progress = progress
			loc.append(progress)
		}
		setProgress(percent) {
			this.progress.children[2].innerText = ` ${percent}`;
			this.percent = percent;

			this.progress.children[0].innerText = this._templates.loadbar[Math.floor(percent/10)];
		}
		finish(success) {
			if(success){
				this.setProgress(100)
				this.progress.children[1].setAttribute('class', 'done')
			}else{
				this.setProgress(0)
				this.progress.children[1].setAttribute('class', 'fail')
			}
		}
		_templates = {
			spinner: [
				"⠋",
				"⠙",
				"⠹",
				"⠸",
				"⠼",
				"⠴",
				"⠦",
				"⠧",
				"⠇",
				"⠏"
			],
			done: `✓`,
			failed: `✗`,
			loadbar: [
				`|          |`,
				`|█         |`,
				`|██        |`,
				`|███       |`,
				`|████      |`,
				`|█████     |`,
				`|██████    |`,
				`|███████   |`,
				`|████████  |`,
				`|█████████ |`,
				`|██████████|`
			]
		}
	}
}