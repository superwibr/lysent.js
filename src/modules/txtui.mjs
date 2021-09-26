const math = {
	/**
	 * Does math and fixes
	 * @param wic Width In Characters
	 * @param hic Height In Characters
	 * @param wip Width In Pixels
	 * @param hip Height In Pixels
	 */
	pixelFix(wic, hic, wip, hip) {

		if (wip < 100 || hip < 100) {// stop if the pixel measures are too small
			console.error(`[LysentJS] txtui error: minimum window size is 100*100px!`);
			return null;
		}
		if ((wip / wic < 12) || (hip / hic < 12)) {// stop if character size is less than 12px
			console.error(`[LysentJS] txtui error: minimum character size is 12*12px, ended up with ${wip / wic}*${hip / hic}px!`);
			return null;
		}

		// make char sizes even & square
		let cps = ((wic, hic, wip, hip) => {
			let cpw = (wip / wic),
				cph = (hip / hic),
				out;

			out = Math.floor((cpw + cph) / 2) // average for square

			if (out % 2 != 0) out -= 1 // make even

			return out;
		})(wic, hic, wip, hip);

		// correct pixel sizes from Character Pixel Size
		wip = cps * wic;
		hip = cps * hic;

		return { cps, wip, hip };
	},
	async windowFix(win, wip, hip) {
		let y = btoa(`<style>html{ width:${wip}px; height:${hip}px;}</style>`),
			w = window.open(y, '_blank', `width=${wip},height=${hip}`);

		await new Promise(res => { // waiting.
			w.onload = res;
		});

		// offset
		let ox = (document.body.scrollWidth - document.body.clientWidth),
			oy = (document.body.scrollHeight - document.body.clientHeight);

		// even out
		if (ox % 2 != 0) ox += 1;
		if (oy % 2 != 0) oy += 1;

		w.close(); // close measuring window

		win.resizeBy(ox, oy); // resize main window

		// even out out
		if (win.innerWidth % 2 != 0) win.resizeBy(1, 0);
		if (win.innerHeight % 2 != 0) win.resizeBy(0, 1);

	}

};

class Txtui {
	constructor(wic, hic, wip, hip) {
		this._init(wic, hic, wip, hip);
	}
	async _init(wic, hic, wip, hip) {
		this.measures = math.pixelFix(wic, hic, wip, hip);
		this.window = window.open('', '', `width=${this.measures.wip},height=${this.measures.hip}`);

		await new Promise(res => { // wait for window to load
			window.onload = res;
		});

		math.windowFix(this.window, this.measures.wip, this.measures.hip);
	}
}

export default Txtui