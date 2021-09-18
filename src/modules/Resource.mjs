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
				if (!silent) bar.setProgress(Math.floor(event.loaded / event.total) * 100) // make percentage and set progress
			};

			let blob
			xhr.onload = () => {
				if (xhr.status != 200) {
					if (!silent) bar.finish(false)
					rej({})
					console.log(`Error ${xhr.status}: ${xhr.statusText}`);
				} else {
					if (!silent) bar.finish(true)
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
Resource.assemble = async function (map, autoUse) {// creates a single document from a map of resources. an example can be found in the /tests folder
	let backup = window.document.documentElement, // back up the document
		srcpath = document.querySelector('script[lysent]').src.match(/.*\//)[0], // script path for dynamics
		loader = await new Resource(`${srcpath}resources/loader.html`, '').fetch(1) // building loader page overlay
			.then(res => res.data.text());
	loader = loader.replace('{{cdtitle}}', document.title);
	loader = loader.replace('{{indexpath}}', `${srcpath}lysent.js`);
	loader = loader.replace('{{stylepath}}', `${srcpath}resources/resource.css`);
	loader = new DOMParser().parseFromString(loader, "text/html").documentElement;

	// display loader
	document.open();
	document.append(loader);

	// building thing
	let thing = await this.assemble._requires(map)

	// built-in features
	thing = thing.replace(
		'{{lys-fse}}',
		await new lysent.Resource(`${srcpath}resources/forcescripts.html`, '').fetch(1).then(res => res.data.text())
	);// forces inline scripts to run, since appending them doesn't do anythong

	//await new Promise(res => setTimeout(res, 1000)) // wait 1 second

	document.open();
	if (autoUse) {
		// load constructed document
		document.append(new DOMParser().parseFromString(thing, "text/html").documentElement)
	} else {
		// restore the document
		document.append(backup);
	}

	return new DOMParser().parseFromString(thing, "text/html").documentElement
}


Resource.assemble._requires = async function (map) { // requires down the tree
	let main = await map.resource.fetch() // get the main

	if (main.data.type.startsWith("text/") || main.data.type == 'application/javascript') { // interpret as text or binary data.
		main = await main.data.text()
	} else {
		main = await (new Promise((res, rej) => {
			let a = new FileReader();
			a.onload = function (e) { res(e.target.result); }
			a.readAsDataURL(main.data);
		}));
	}

	if (!map.require) return main

	for (const [key, val] of Object.entries(map.require)) {
		console.log(`filling '${key}'`)
		main = main.replaceAll(
			`{{${key}}}`,
			await Resource.assemble._requires(val)
		);
	}

	return main
}

export default Resource