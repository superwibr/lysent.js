

const srcpath = document.querySelector('script[lysent]').src.match(/.*\//)[0];

const math = {
	/**
	 * Does math and fixes
	 * @deprecated
	 * @param wic Width In Characters
	 * @param hic Height In Characters
	 * @param wip Width In Pixels
	 * @param hip Height In Pixels
	 */
	pixelFix(wic, hic, wip, hip) {

		// if (wip < 100 || hip < 100) {// stop if the pixel measures are too small
		// 	console.error(`[LysentJS] txtui error: minimum window size is 100*100px!`);
		// 	return null;
		// }
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
	/**
	 * @deprecated
	 * @param win 
	 * @param wip 
	 * @param hip 
	 */
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

		await win.resizeBy(ox, oy); // resize main window

		// even out out
		if (win.innerWidth % 2 != 0) win.resizeBy(1, 0);
		if (win.innerHeight % 2 != 0) win.resizeBy(0, 1);

	},

	frameFitFix(container, wic, hic) {
		let c = {
			w: container.clientWidth,
			h: container.clientHeight
		};
	}

};

class Txtui {
	constructor(query, wic, hic) {
		this.container = document.querySelector(query);
		this.measures = math.frameFitFix(this.container, wic, hic);

		// add things to the document
		document.head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="${srcpath}resources/txtui.css" />`); // styles
		this.container.insertAdjacentHTML('beforeend', `<pre class="lys-txtui"></pre>`); // renderer zone
	};

	__append(text) { this.container.innerHTML = this.container.innerHTML + text }

	draw(mode, text) {
		switch (mode) {
			case 'art':
				text = text.replaceAll(' ', '&nbsp;');
				break;

			default: break;
		}

		text = text.replaceAll('\n', '<br/>')

		this.__append(text)
	};
}

export default Txtui