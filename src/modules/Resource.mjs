import quark from "./quark.mjs";

class Resource {
	constructor(url, name) {
		this.url = url
		this.name = name
	}

	fetch = async (silent) => { // fetches the resource
		return new Promise((res, rej) => {
			let bar = silent || new quark.TinkerProgress('body', this.name); // create progress bar

			let xhr = new XMLHttpRequest(); // request
			xhr.open("GET", this.url);
			xhr.responseType = 'blob'

			xhr.onprogress = event => { // when progress is made
				if(!silent) bar.setProgress(Math.floor(event.loaded / event.total) * 100) // make percentage and set progress
			};

			let blob
			xhr.onload = () => {
				if (xhr.status != 200) {
					if(!silent) bar.finish(false)
					rej({})
					console.log(`Error ${xhr.status}: ${xhr.statusText}`);
				} else {
					if(!silent) bar.finish(true)
					blob = xhr.response
					res({
						data: blob,
						type: blob.type,
						name: this.name
					})
				}
			};

			xhr.send();
		})
	}
}
Resource.assemble = async function (map) {// creates a single document from a map of resources. an example can be found in the /tests folder
	let backup = window.document.documentElement, // back up the document
		srcpath = document.querySelector('script[lysent]').src.match(/.*\//)[0], // script path for dynamics
		loader = await new Resource(`${srcpath}resources/loader.html`, '').fetch(true) // building loader page overlay
			.then(res=>res.data.text());
	loader = loader.replace('{{cdtitle}}', document.title);
	loader = loader.replace('{{indexpath}}', `${srcpath}lysent.js`);
	loader = loader.replace('{{stylepath}}', `${srcpath}resources/resource.css`);
	loader = new DOMParser().parseFromString(loader, "text/html").documentElement;

	// display loader
	document.open();
	document.append(loader);

	// load things
	let things = new Array
	await map.forEach(async thing => {
		thing = await thing.fetch()
		things.push(thing);
	});

	await new Promise(res=>setTimeout(res, 1000)) // wait 1 second

	// restore the document
	document.open();
	document.append(backup);

	return things
}

export default Resource